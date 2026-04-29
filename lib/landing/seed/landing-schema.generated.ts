/**
 * Provisioning write target.
 *
 * Backend may overwrite this entire module with generated schema + tokens.
 * Keep the export name stable for deterministic imports.
 */
export const LANDING_SCHEMA_SOURCE: unknown = {
  version: "v1",
  header: {
    brand: {
      label: "Gondoor",
      href: "/",
    },
    navigation: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Contact", href: "#contact" },
    ],
    cta: {
      label: "Get Started",
      href: "/auth/sign-up",
    },
  },
  footer: {
    blurb: "Schema-first baseline for fast deterministic provisioning.",
    columns: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "#about" },
          { label: "Contact", href: "#contact" },
        ],
      },
    ],
    legal: "© 2026 Gondoor. All rights reserved.",
  },
  tokens: {
    background: "oklch(1 0 0)",
    foreground: "oklch(0.145 0 0)",
    mutedBackground: "oklch(0.97 0 0)",
    mutedForeground: "oklch(0.45 0 0)",
    accent: "oklch(0.874 0.212 95.5)",
    accentForeground: "oklch(0.145 0 0)",
    border: "oklch(0.922 0 0)",
    heroGradientFrom: "oklch(0.95 0.05 90)",
    heroGradientTo: "oklch(0.985 0 0)",
    maxWidth: "1120px",
    radius: "1rem",
    sectionGap: "4rem",
  },
  sections: [
    {
      type: "hero",
      id: "hero",
      eyebrow: "Foundation Build",
      title: "Schema-first landing pages under hard runtime limits",
      description:
        "Render deterministic React sections from typed schema so provisioning writes data, not HTML blobs.",
      primaryCta: {
        label: "Launch Template",
        href: "/auth/sign-up",
      },
      secondaryCta: {
        label: "See Docs",
        href: "#features",
      },
    },
    {
      type: "feature-grid",
      id: "features",
      title: "Deterministic by default",
      description:
        "Provisioning seeds a stable schema and tokens module consumed by typed components.",
      features: [
        {
          title: "Typed Contract",
          description: "Zod-backed parser guards malformed payloads before rendering.",
        },
        {
          title: "Section Registry",
          description: "Each section type maps to a typed component with predictable output.",
        },
        {
          title: "Token Strategy",
          description: "Design tokens flow through CSS variables without raw HTML injection.",
        },
      ],
    },
    {
      type: "cta-band",
      id: "pricing",
      title: "Ready to provision in one write?",
      description: "Update the generated schema module and ship the landing instantly.",
      primaryCta: {
        label: "Start now",
        href: "/auth/sign-up",
      },
      secondaryCta: {
        label: "Contact sales",
        href: "#contact",
      },
    },
  ],
}
