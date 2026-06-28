import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LandingStyles } from "@/components/layout/landing-styles";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { getLandingSchema } from "@/lib/landing/schema-source";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gondoor Template",
  description:
    "A modern Next.js starter with shadcn/ui, Drizzle, Better Auth, and more.",
};

// Hand-rolled FOUC script; next-themes 0.4.x ships an inline IIFE that SWC re-emits
// with `__name(...)` keepNames calls whose helper isn't in scope at runtime.
const themeFoucScript = `try{var s=localStorage.getItem('theme');if(s==='dark'||((!s||s==='system')&&window.matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const landingSchema = getLandingSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeFoucScript }}
          suppressHydrationWarning
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <LandingStyles tokens={landingSchema.tokens}>
          <TooltipProvider>
            <SiteHeader header={landingSchema.header} />
            <main>{children}</main>
            <SiteFooter footer={landingSchema.footer} />
          </TooltipProvider>
          <Toaster />
        </LandingStyles>
      </body>
    </html>
  );
}
