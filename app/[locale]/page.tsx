import { getSiteConfig } from "@/lib/site-config";
import type { SiteConfig } from "@/lib/site-config.types";
import { getTranslations } from "next-intl/server";
import SaasTemplate from "@/templates/saas";

const TEMPLATES: Record<string, React.ComponentType<{ config?: SiteConfig }>> = {
  saas: SaasTemplate,
};

export default async function HomePage() {
  const config = await getSiteConfig();

  if (config) {
    const Template = TEMPLATES[config.templateSlug];
    if (Template) {
      return <Template config={config} />;
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
