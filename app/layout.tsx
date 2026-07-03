import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
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
  title: "Vectorine",
  description: "Premium site for Vectorine.",
  applicationName: "Vectorine",
};

// Hand-rolled FOUC script; next-themes 0.4.x ships an inline IIFE that SWC re-emits
// with `__name(...)` keepNames calls whose helper isn't in scope at runtime.
const themeFoucScript = `try{var s=localStorage.getItem('theme');if(s==='dark'||((!s||s==='system')&&window.matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        data-mvp-quality="polished-foundation-v1"
      >
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
