import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(__dirname, "../..");
const appDir = path.join(projectRoot, "app");

function collectPageFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectPageFiles(entryPath));
      continue;
    }

    if (entry.name === "page.tsx") {
      files.push(entryPath);
    }
  }

  return files;
}

describe("Next.js template boundaries and page naming", () => {
  it("uses Page-suffixed default page component names and avoids Home conflicts", () => {
    const pageFiles = collectPageFiles(appDir);
    expect(pageFiles.length).toBeGreaterThan(0);

    for (const filePath of pageFiles) {
      const source = fs.readFileSync(filePath, "utf8");
      expect(source).not.toMatch(/export\s+default\s+function\s+Home\s*\(/);

      const match = source.match(
        /export\s+default\s+function\s+([A-Za-z0-9_]+)\s*\(/
      );
      expect(match).toBeTruthy();
      expect(match?.[1]).toMatch(/Page$/);
    }
  });

  it("keeps buttonVariants in a server-safe module and usable from a Server Component", () => {
    const buttonVariantsModulePath = path.join(
      projectRoot,
      "components/ui/button-variants.ts"
    );
    const buttonVariantsModule = fs.readFileSync(
      buttonVariantsModulePath,
      "utf8"
    );
    expect(buttonVariantsModule).not.toContain('"use client"');
    expect(buttonVariantsModule).not.toContain("'use client'");

    const localePageSource = fs.readFileSync(
      path.join(projectRoot, "app/[locale]/page.tsx"),
      "utf8"
    );
    expect(localePageSource).toMatch(
      /import\s+\{\s*buttonVariants\s*\}\s+from\s+["']@\/components\/ui\/button-variants["']/
    );
    expect(localePageSource).toMatch(/buttonVariants\s*\(/);
  });
});
