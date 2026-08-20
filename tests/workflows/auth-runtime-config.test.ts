import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const projectRoot = path.resolve(__dirname, "../..");
const workflows = [
  {
    name: "reusable WfP deployment",
    path: path.join(projectRoot, ".github/workflows/deploy-wfp.yml"),
    buildCommand: "opennextjs-cloudflare build",
  },
  {
    name: "legacy deployment",
    path: path.join(projectRoot, ".github/workflows/deploy.yml"),
    buildCommand: "@opennextjs/cloudflare build",
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

function expectQuietFailure(result: ReturnType<typeof spawnSync>) {
  expect(result.status).toBe(1);
  expect(result.stdout).toBe("");
  expect(result.stderr).toBe("");
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
    "$name executes its guard before install and build",
    ({ path: workflowPath, buildCommand }) => {
      const workflow = workflowContents(workflowPath);
      const guard = workflow.indexOf("- name: Reject incompatible auth source");
      const install = workflow.indexOf("pnpm install");
      const build = workflow.indexOf(buildCommand);

      expect(guard).toBeGreaterThan(-1);
      expect(guard).toBeLessThan(install);
      expect(guard).toBeLessThan(build);
    }
  );

  it.each(workflows)(
    "$name rejects incompatible package dependencies quietly",
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
        expectQuietFailure(result);
      }
    }
  );

  it.each(workflows)(
    "$name rejects incompatible JavaScript and TypeScript imports quietly",
    ({ path: workflowPath }) => {
      const guard = extractAuthGuard(workflowContents(workflowPath));

      for (const [fixturePath, source] of [
        ["app/auth.js", 'import NextAuth from "next-auth";'],
        ["app/auth.ts", 'import { Auth } from "@auth/core";'],
      ]) {
        const result = runGuard(guard, (directory) =>
          writeFixture(directory, fixturePath, source)
        );
        expectQuietFailure(result);
      }
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
