import { getSiteConfig } from "@/lib/site-config";
import type { SiteConfig } from "@/lib/site-config.types";
import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";

const templates: Record<string, React.ComponentType<{ config?: SiteConfig }>> = {
  saas: dynamic<{ config?: SiteConfig }>(() => import("@/templates/saas")),
};

/** Mix two hex colors: weight 0 = pure base, weight 1 = pure mix. */
function mixHex(mixColor: string, baseColor: string, weight: number): string {
  const parse = (hex: string) => {
    const h = hex.replace("#", "");
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  };
  const [mr, mg, mb] = parse(mixColor);
  const [br, bg, bb] = parse(baseColor);
  const ch = (m: number, b: number) =>
    Math.round(m * weight + b * (1 - weight))
      .toString(16)
      .padStart(2, "0");
  return `#${ch(mr, br)}${ch(mg, bg)}${ch(mb, bb)}`;
}

function buildGoogleFontsUrl(theme: SiteConfig["theme"]): string {
  const fonts = new Set([theme.fontDisplay, theme.fontBody].filter(Boolean));
  const families = Array.from(fonts)
    .map((f) => `family=${f.replace(/ /g, "+")}:wght@400;500;600;700;900`)
    .join("&");
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}

function buildThemeCSS(theme: SiteConfig["theme"]): string {
  const { colorPrimary, colorAccent, colorBg, colorText, fontDisplay, fontBody } = theme;
  const muted = mixHex(colorText, colorBg, 0.06);
  const mutedFg = mixHex(colorText, colorBg, 0.55);
  const border = mixHex(colorText, colorBg, 0.12);

  return `:root {
    --background: ${colorBg};
    --foreground: ${colorText};
    --card: ${colorBg};
    --card-foreground: ${colorText};
    --popover: ${colorBg};
    --popover-foreground: ${colorText};
    --primary: ${colorPrimary};
    --primary-foreground: ${colorBg};
    --secondary: ${muted};
    --secondary-foreground: ${colorText};
    --muted: ${muted};
    --muted-foreground: ${mutedFg};
    --accent: ${colorAccent};
    --accent-foreground: ${colorBg};
    --border: ${border};
    --input: ${border};
    --ring: ${colorPrimary};
    --font-sans: '${fontBody}', 'Inter', sans-serif;
    --font-heading: '${fontDisplay}', 'Inter', sans-serif;
  }
  body { font-family: '${fontBody}', 'Inter', sans-serif; }
  h1, h2, h3, h4, h5, h6 { font-family: '${fontDisplay}', 'Inter', sans-serif; }`;
}

export default async function HomePage() {
  const config = await getSiteConfig();

  if (config) {
    const Template = templates[config.templateSlug];
    if (Template) {
      return (
        <>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="stylesheet" href={buildGoogleFontsUrl(config.theme)} />
          <style dangerouslySetInnerHTML={{ __html: buildThemeCSS(config.theme) }} />
          <Template config={config} />
        </>
      );
    }
  }

  return <StarterPage />;
}

async function StarterPage() {
  const t = await getTranslations("app");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-12 px-6 py-24">
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          Starter Template
        </span>
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          {t("title")}
        </h1>
        <p className="max-w-md text-lg text-muted-foreground">
          {t("description")}
        </p>
        <a
          href="#"
          className="mt-2 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {t("cta")}
        </a>
      </div>
    </main>
  );
}
