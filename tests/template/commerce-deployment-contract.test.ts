import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(__dirname, "../..");
const commerceEnvironmentVariables = [
  "GONDOOR_API_BASE",
  "GONDOOR_API_KEY",
  "GONDOOR_TENANT_ID",
  "GONDOOR_WEBHOOK_SECRET",
];

describe("commerce deployment contract", () => {
  const environment = fs.readFileSync(path.join(projectRoot, ".env.example"), "utf8");
  const agents = fs.readFileSync(path.join(projectRoot, "AGENTS.md"), "utf8");
  const deployment = fs.readFileSync(
    path.join(projectRoot, ".github/workflows/deploy.yml"),
    "utf8"
  );

  it("documents exactly the four commerce environment variables", () => {
    const commerceSection = environment
      .split("# Gondoor commerce (provisioned by gondoor backend)")[1]
      .split("\n\n")[0];
    const names = [...commerceSection.matchAll(/^(GONDOOR_[A-Z_]+)=/gm)].map(
      ([, name]) => name
    );

    expect(names).toEqual(commerceEnvironmentVariables);
    expect(environment).not.toMatch(/^WHOP_/m);
    expect(agents).toContain("Commerce uses only `GONDOOR_API_BASE`, `GONDOOR_API_KEY`, `GONDOOR_TENANT_ID`, and `GONDOOR_WEBHOOK_SECRET`.");
    expect(agents).toContain("`GONDOOR_WEBHOOK_SECRET` is only for signed order delivery.");
  });

  it("forbids test-mode secrets while retaining the commerce deployment variables", () => {
    for (const variable of commerceEnvironmentVariables) {
      expect(deployment).toContain(variable);
    }

    expect(`${environment}\n${agents}\n${deployment}`).not.toMatch(
      /(?:GONDOOR_)?TEST_MODE_SECRET|WHOP_(?:API_KEY|API_BASE|WEBHOOK_SECRET)/
    );
    expect(agents).toContain("Never add a test-mode secret, token, signature, header, or body override.");
    expect(agents).toContain("Do not add test-mode secrets to deployment workflows.");
  });
});
