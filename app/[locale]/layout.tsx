import { CommerceTestModeBanner } from "@/components/ecommerce/commerce-test-mode-banner";
import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  const [messages, cookieStore] = await Promise.all([getMessages(), cookies()]);
  const isTestMode = cookieStore.get("gondoor_test")?.value === "true";

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {isTestMode ? <CommerceTestModeBanner /> : null}
      {children}
    </NextIntlClientProvider>
  );
}
