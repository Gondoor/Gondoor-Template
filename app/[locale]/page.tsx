import { getTranslations } from "next-intl/server";

const stack = [
  "Next.js 16",
  "shadcn/ui",
  "Tailwind CSS v4",
  "Drizzle ORM",
  "Better Auth",
  "next-intl",
  "Zustand",
  "Zod",
  "Motion",
  "Sonner",
];

export default async function HomePage() {
  const t = await getTranslations("app");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-12 px-6 py-24">
      {/* Hero */}
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

      {/* Stack badges */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {t("stack")}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {stack.map((item) => (
            <span
              key={item}
              className="rounded-md border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
