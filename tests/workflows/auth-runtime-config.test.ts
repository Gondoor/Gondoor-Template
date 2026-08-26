import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const projectRoot = path.resolve(__dirname, "../..");
const workflows = [
  {
    name: "reusable WfP deployment",
    path: path.join(projectRoot, ".github/workflows/deploy-wfp.yml"),
    installCommand: "pnpm install --frozen-lockfile",
    buildCommand: "pnpm exec opennextjs-cloudflare build",
  },
  {
    name: "legacy deployment",
    path: path.join(projectRoot, ".github/workflows/deploy.yml"),
    installCommand: "pnpm install",
    buildCommand: "npx @opennextjs/cloudflare build",
  },
];

const buildPlaceholders = {
  BETTER_AUTH_SECRET: "placeholder-build-only",
  BETTER_AUTH_URL: "https://placeholder.workers.dev",
  BETTER_AUTH_TRUSTED_ORIGINS: "https://placeholder.workers.dev",
  AUTH_SECRET: "placeholder-build-only",
  AUTH_URL: "https://placeholder.workers.dev",
  NEXTAUTH_SECRET: "placeholder-build-only",
  NEXTAUTH_URL: "https://placeholder.workers.dev",
} as const;

const compatibilityAliases = {
  AUTH_SECRET: "BETTER_AUTH_SECRET",
  NEXTAUTH_SECRET: "BETTER_AUTH_SECRET",
  AUTH_URL: "BETTER_AUTH_URL",
  NEXTAUTH_URL: "BETTER_AUTH_URL",
} as const;

const runtimeValues = {
  DATABASE_URL: "postgres://user:password@db.example.test/gondoor",
  COMPANY_ID: "company-123",
  NODE_ENV: "production",
  BETTER_AUTH_SECRET: 'secret-with-"quotes"-and-$dollar',
  BETTER_AUTH_URL: "https://tenant.example.test/auth?source=deploy",
  BETTER_AUTH_TRUSTED_ORIGINS:
    "https://tenant.example.test https://tenant.workers.dev",
  NEXT_PUBLIC_APP_URL: "https://tenant.example.test",
  GONDOOR_API_BASE: "https://api.gondoor.test",
  GONDOOR_API_KEY: "api-key",
  GONDOOR_TENANT_ID: "tenant-123",
  GONDOOR_WEBHOOK_SECRET: "webhook-secret",
  GONDOOR_SAAS_APP_API_KEY: "saas-api-key",
  GONDOOR_SAAS_VERIFICATION_SECRET: "verification-secret",
} as const;

function workflowContents(workflowPath: string) {
  return fs.readFileSync(workflowPath, "utf8");
}

function extractRunScript(workflow: string, stepName: string) {
  const marker = `      - name: ${stepName}\n`;
  const start = workflow.indexOf(marker);
  expect(start).not.toBe(-1);

  const step = workflow.slice(start);
  const nextStep = step.indexOf("\n      - ", marker.length);
  const run = step.slice(0, nextStep === -1 ? undefined : nextStep);
  const runMarker = "        run: |\n";
  const runStart = run.indexOf(runMarker);
  expect(runStart).not.toBe(-1);

  const script = run.slice(runStart + runMarker.length);
  const envStart = script.indexOf("\n        env:\n");
  return script
    .slice(0, envStart === -1 ? undefined : envStart)
    .replace(/^ {10}/gm, "");
}

function extractBuildStep(workflow: string, buildCommand: string) {
  const build = workflow.indexOf(buildCommand);
  expect(build).not.toBe(-1);
  const start = workflow.lastIndexOf("\n      - ", build);
  const end = workflow.indexOf("\n      - ", build);
  return workflow.slice(start === -1 ? 0 : start, end === -1 ? undefined : end);
}

function workflowStepBlocks(workflow: string) {
  const starts = Array.from(workflow.matchAll(/^      - /gm), (match) => match.index);
  return starts.map((start, index) => workflow.slice(start, starts[index + 1]));
}

function stepWithRunCommand(steps: string[], command: string) {
  return steps.findIndex((step) =>
    step
      .split("\n")
      .some((line) => line.trim().replace(/^-\s+/u, "") === `run: ${command}`)
  );
}

function assertImmutableAuthGuardSequence(
  workflow: string,
  installCommand: string,
  buildCommand: string
) {
  const steps = workflowStepBlocks(workflow);
  const guards = steps
    .map((step, index) => ({ step, index }))
    .filter(({ step }) => step.includes("- name: Reject incompatible auth source"));
  const install = stepWithRunCommand(steps, installCommand);
  const build = stepWithRunCommand(steps, buildCommand);

  expect(guards).toHaveLength(1);
  expect(install).toBeGreaterThan(-1);
  expect(build).toBeGreaterThan(-1);
  expect(guards[0]?.index).toBe(install + 1);
  expect(build).toBe(install + 2);
  expect(guards[0]?.step).not.toMatch(/^\s+(?:if|continue-on-error):/m);
}

function rewriteWorkflowSteps(workflow: string, rewrite: (steps: string[]) => string[]) {
  const starts = Array.from(workflow.matchAll(/^      - /gm), (match) => match.index);
  expect(starts.length).toBeGreaterThan(0);
  const first = starts[0] ?? 0;
  return workflow.slice(0, first) + rewrite(workflowStepBlocks(workflow)).join("");
}

function extractAuthGuard(workflow: string) {
  const script = extractRunScript(workflow, "Reject incompatible auth source");
  const heredoc = script.match(/node <<'NODE'\n([\s\S]*?)\nNODE\s*$/);
  expect(heredoc).not.toBeNull();
  return heredoc?.[1] ?? "";
}

function runGuard(guard: string, fixture: (directory: string) => void) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "gondoor-auth-guard-"));
  try {
    fixture(directory);
    return spawnSync(process.execPath, ["-"], {
      cwd: directory,
      encoding: "utf8",
      env: { ...process.env, NODE_PATH: path.join(projectRoot, "node_modules") },
      input: guard,
    });
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

function writeFixture(directory: string, relativePath: string, contents: string) {
  const fixturePath = path.join(directory, relativePath);
  fs.mkdirSync(path.dirname(fixturePath), { recursive: true });
  fs.writeFileSync(fixturePath, contents);
}

// The guard is WARN-ONLY: a detected violation must annotate the run and still
// exit 0 so the finished artifact deploys. See the "Reject incompatible auth
// source" steps in both workflows.
function expectWarningWithoutFailure(result: ReturnType<typeof spawnSync>) {
  expect(result.status).toBe(0);
  expect(result.stderr).toBe("");
  expect(result.stdout).toMatch(
    /^::warning::incompatible auth source detected: .+$/m
  );
}

function expectQuietSuccess(result: ReturnType<typeof spawnSync>) {
  expect(result.status).toBe(0);
  expect(result.stdout).toBe("");
  expect(result.stderr).toBe("");
}

function assertCompatibilityAliases(payload: Record<string, string>) {
  expect(payload.BETTER_AUTH_TRUSTED_ORIGINS).toBe(
    runtimeValues.BETTER_AUTH_TRUSTED_ORIGINS
  );
  for (const [alias, canonical] of Object.entries(compatibilityAliases)) {
    expect(payload[alias]).toBe(runtimeValues[canonical]);
  }
}

describe("deployment auth runtime configuration", () => {
  it.each(workflows)(
    "$name sets literal non-production canonical and compatibility placeholders on its build step",
    ({ path: workflowPath, buildCommand }) => {
      const buildStep = extractBuildStep(workflowContents(workflowPath), buildCommand);

      for (const [variable, placeholder] of Object.entries(buildPlaceholders)) {
        expect(buildStep).toContain(`${variable}: ${placeholder}`);
      }
    }
  );

  it.each(workflows)(
    "$name installs dependencies then runs its mandatory guard immediately before build",
    ({ path: workflowPath, installCommand, buildCommand }) => {
      const workflow = workflowContents(workflowPath);
      assertImmutableAuthGuardSequence(workflow, installCommand, buildCommand);
    }
  );

  it.each(workflows)(
    "$name rejects a guard positioned before dependency installation",
    ({ path: workflowPath, installCommand, buildCommand }) => {
      const workflow = workflowContents(workflowPath);
      const reordered = rewriteWorkflowSteps(workflow, (steps) => {
        const install = stepWithRunCommand(steps, installCommand);
        const guard = steps.findIndex((step) =>
          step.includes("- name: Reject incompatible auth source")
        );
        [steps[install], steps[guard]] = [steps[guard] ?? "", steps[install] ?? ""];
        return steps;
      });

      expect(() =>
        assertImmutableAuthGuardSequence(reordered, installCommand, buildCommand)
      ).toThrow();
    }
  );

  it.each(workflows)(
    "$name rejects an intervening source rewrite between guard and build",
    ({ path: workflowPath, installCommand, buildCommand }) => {
      const workflow = workflowContents(workflowPath);
      const rewritten = rewriteWorkflowSteps(workflow, (steps) => {
        const build = stepWithRunCommand(steps, buildCommand);
        steps.splice(
          build,
          0,
          "      - name: Rewrite generated auth source\n        run: node scripts/rewrite-auth.mjs\n\n"
        );
        return steps;
      });

      expect(() =>
        assertImmutableAuthGuardSequence(rewritten, installCommand, buildCommand)
      ).toThrow();
    }
  );

  it.each([
    ["disabled", "        if: false\n"],
    ["allowed to continue on error", "        continue-on-error: true\n"],
  ])("rejects a %s incompatible-auth guard", (_name, executionControl) => {
    for (const workflowConfig of workflows) {
      const workflow = workflowContents(workflowConfig.path);
      const weakened = workflow.replace(
        "      - name: Reject incompatible auth source\n",
        `      - name: Reject incompatible auth source\n${executionControl}`
      );

      expect(() =>
        assertImmutableAuthGuardSequence(
          weakened,
          workflowConfig.installCommand,
          workflowConfig.buildCommand
        )
      ).toThrow();
    }
  });

  it.each(workflows)(
    "$name keeps its incompatible-auth guard warn-only with no failing exit path",
    ({ path: workflowPath }) => {
      const guard = extractAuthGuard(workflowContents(workflowPath));

      expect(guard).toContain("::warning::incompatible auth source detected:");
      expect(guard).toContain("process.exit(0)");
      expect(guard).not.toMatch(/process\.exit\(\s*[1-9]/);
      expect(guard).not.toMatch(/exitCode\s*=\s*[1-9]/);
      expect(guard).not.toMatch(/throw\s/);
    }
  );

  it.each(workflows)(
    "$name warns about incompatible package dependencies without failing the deploy",
    ({ path: workflowPath }) => {
      const guard = extractAuthGuard(workflowContents(workflowPath));

      for (const dependency of ["next-auth", "@auth/core"]) {
        const result = runGuard(guard, (directory) => {
          writeFixture(
            directory,
            "package.json",
            JSON.stringify({ dependencies: { [dependency]: "1.0.0" } })
          );
        });
        expectWarningWithoutFailure(result);
      }
    }
  );

  it.each(workflows)(
    "$name warns about JSON-escaped incompatible dependency names without failing the deploy",
    ({ path: workflowPath }) => {
      const guard = extractAuthGuard(workflowContents(workflowPath));
      for (const manifest of [
        '{"dependencies":{"next\\u002dauth":"5.0.0"}}',
        '{"dependencies":{"auth-wrapper":"npm:@auth\\u002fcore@1.0.0"}}',
      ]) {
        const result = runGuard(guard, (directory) => {
          writeFixture(directory, "package.json", manifest);
        });
        expectWarningWithoutFailure(result);
      }
    }
  );

  it.each(workflows)(
    "$name warns about incompatible JavaScript and TypeScript imports without failing the deploy",
    ({ path: workflowPath }) => {
      const guard = extractAuthGuard(workflowContents(workflowPath));

      for (const [fixturePath, source] of [
        ["app/auth.js", 'import NextAuth from "next-auth";'],
        ["app/auth.ts", 'import { Auth } from "@auth/core";'],
      ]) {
        const result = runGuard(guard, (directory) =>
          writeFixture(directory, fixturePath, source)
        );
        expectWarningWithoutFailure(result);
      }
    }
  );

  it.each(workflows)(
    "$name warns about escaped incompatible module specifiers without failing the deploy",
    ({ path: workflowPath }) => {
      const guard = extractAuthGuard(workflowContents(workflowPath));

      for (const [fixturePath, source] of [
        ["app/static-import.ts", 'import NextAuth from "next\\u002dauth";'],
        ["app/re-export.ts", 'export { Auth } from "@auth\\u002fcore";'],
        ["app/dynamic-import.ts", 'void import("next\\x2dauth");'],
        ["app/require.cjs", 'require("@auth\\u002fcore");'],
      ]) {
        const result = runGuard(guard, (directory) =>
          writeFixture(directory, fixturePath, source)
        );
        expectWarningWithoutFailure(result);
      }
    }
  );

  it.each(workflows)(
    "$name permits provider names in comments and ordinary content strings",
    ({ path: workflowPath }) => {
      const guard = extractAuthGuard(workflowContents(workflowPath));
      const result = runGuard(guard, (directory) => {
        writeFixture(directory, "package.json", JSON.stringify({ dependencies: {} }));
        writeFixture(
          directory,
          "app/content.ts",
          '// import NextAuth from "next-auth";\nexport const migrationNote = "next-auth and @auth/core are unsupported";'
        );
      });

      expectQuietSuccess(result);
    }
  );

  it.each(workflows)(
    "$name accepts Better Auth dependencies and module specifiers",
    ({ path: workflowPath }) => {
      const guard = extractAuthGuard(workflowContents(workflowPath));
      const result = runGuard(guard, (directory) => {
        writeFixture(
          directory,
          "package.json",
          JSON.stringify({ dependencies: { "better-auth": "1.5.5" } })
        );
        writeFixture(
          directory,
          "app/auth.ts",
          'import { betterAuth } from "better-auth";\nexport const auth = betterAuth({});'
        );
      });

      expectQuietSuccess(result);
    }
  );

  it.each(workflows)(
    "$name ignores incompatible markers in tests, build output, dependencies, and lockfiles",
    ({ path: workflowPath }) => {
      const guard = extractAuthGuard(workflowContents(workflowPath));
      const result = runGuard(guard, (directory) => {
        writeFixture(directory, "tests/auth.test.ts", 'import Auth from "@auth/core";');
        writeFixture(directory, "build/auth.js", 'import Auth from "next-auth";');
        writeFixture(directory, "node_modules/auth/index.js", 'import Auth from "next-auth";');
        writeFixture(directory, "pnpm-lock.yaml", "next-auth: 5.0.0\n@auth/core: 1.0.0");
      });

      expectQuietSuccess(result);
    }
  );

  it("derives WfP runtime aliases exactly from canonical Better Auth values", () => {
    const workflow = workflowContents(workflows[0].path);
    const runtimeSecrets = path.join(
      fs.mkdtempSync(path.join(os.tmpdir(), "gondoor-wfp-secrets-")),
      "runtime-secrets.json"
    );

    try {
      const result = spawnSync(
        "/bin/bash",
        ["-c", extractRunScript(workflow, "Prepare runtime secrets")],
        {
          encoding: "utf8",
          env: { ...process.env, ...runtimeValues, RUNTIME_SECRETS: runtimeSecrets },
        }
      );
      expectQuietSuccess(result);
      assertCompatibilityAliases(JSON.parse(fs.readFileSync(runtimeSecrets, "utf8")));
    } finally {
      fs.rmSync(path.dirname(runtimeSecrets), { recursive: true, force: true });
    }

    expect(workflow).not.toMatch(/^\s*(?:AUTH|NEXTAUTH)_(?:SECRET|URL): \$\{\{ secrets\./m);
  });

  it("streams legacy runtime aliases derived exactly from canonical Better Auth values", () => {
    const workflow = workflowContents(workflows[1].path);
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "gondoor-legacy-secrets-"));
    const fakePnpm = path.join(directory, "pnpm");
    fs.writeFileSync(fakePnpm, "#!/bin/sh\ncat\n", { mode: 0o755 });

    try {
      const result = spawnSync(
        "/bin/bash",
        ["-c", extractRunScript(workflow, "Set worker secrets")],
        {
          encoding: "utf8",
          env: {
            ...process.env,
            ...runtimeValues,
            WORKER_NAME: "tenant-worker",
            PATH: `${directory}:${process.env.PATH}`,
          },
        }
      );
      expect(result.status).toBe(0);
      expect(result.stderr).toBe("");
      assertCompatibilityAliases(JSON.parse(result.stdout));
    } finally {
      fs.rmSync(directory, { recursive: true, force: true });
    }

    expect(workflow).toMatch(/jq -n[\s\S]*\| pnpm dlx wrangler@4\.83\.0 secret bulk/);
    expect(workflow).not.toMatch(/^\s*(?:AUTH|NEXTAUTH)_(?:SECRET|URL): \$\{\{ secrets\./m);
  });
});
