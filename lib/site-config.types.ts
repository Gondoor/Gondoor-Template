export interface SiteConfig {
  templateSlug: string;
  business: {
    name: string;
    tagline: string;
    type: string;
    description: string;
  };
  founder: { name: string };
  services: Array<{ name: string; description: string; price: string }>;
  valueProps: Array<{ title: string; description: string }>;
  competitors: Array<{ name: string; price: string; gap: string }>;
  market: { size: string; growthRate: string; opportunityGap: string };
  cta: { text: string };
  theme: {
    colorPrimary: string;
    colorAccent: string;
    colorBg: string;
    colorText: string;
    fontDisplay: string;
    fontBody: string;
  };
}
