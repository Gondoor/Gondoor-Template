"use client";


import { Accordion,AccordionContent,AccordionItem,AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import type { SiteConfig } from "@/lib/site-config.types";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: saas
// sections: saas-hero, logo-marquee, saas-features, tech-stats, testimonial-cards, pricing-tiers, glow-cta, faq-accordion, footer-minimal
// theme: globals.css CSS variables
// hero-image: https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1920&q=80
// ─────────────────────────────────────────────────────────────────────

const DEFAULT_FEATURES = [
  { title: "AI-Powered", desc: "Intelligent suggestions and automations that adapt to your workflow in real time." },
  { title: "Real-Time Sync", desc: "Every change propagates instantly across your entire team, zero lag guaranteed." },
  { title: "API-First", desc: "Headless by design — connect any tool with our fully documented REST & GraphQL APIs." },
  { title: "Team Collaboration", desc: "Shared workspaces, granular permissions, and live presence indicators built in." },
  { title: "Analytics", desc: "Deep usage insights and custom dashboards to track what matters most to you." },
  { title: "Integrations", desc: "One-click connectors for Slack, GitHub, Notion, Linear, Jira, and 140+ more." },
];

const DEFAULT_LOGOS = ["Stripe", "Vercel", "Linear", "Notion", "Figma", "GitHub", "Slack", "Shopify"];

const DEFAULT_TESTIMONIALS = [
  { name: "Sarah Chen", role: "CTO, Meridian Labs", quote: "We cut our deployment time by 60% in the first week alone." },
  { name: "Marcus Webb", role: "Head of Eng, Driftwave", quote: "The API-first approach means we integrate with anything in minutes, not days." },
  { name: "Priya Nair", role: "Product Lead, Helio", quote: "Finally a platform that grows with us instead of holding us back." },
];

const DEFAULT_TIERS = [
  { name: "Starter", price: "$29", per: "/mo", features: ["5 team seats", "10K API calls/mo", "Basic analytics", "Community support"], highlighted: false },
  { name: "Pro", price: "$79", per: "/mo", features: ["Unlimited seats", "500K API calls/mo", "Advanced analytics", "Priority support", "Custom integrations"], highlighted: true },
  { name: "Enterprise", price: "Custom", per: "", features: ["Unlimited everything", "SLA guarantee", "Dedicated CSM", "On-prem option", "SSO / SAML"], highlighted: false },
];

const DEFAULT_FAQS = [
  { q: "Can I try it for free?", a: "Yes — every plan starts with a 14-day free trial, no credit card required." },
  { q: "How does billing work?", a: "You're billed monthly or annually. Annual plans save 20% compared to monthly." },
  { q: "Do you support SSO?", a: "SSO via SAML 2.0 and OIDC is available on the Enterprise plan." },
  { q: "Can I migrate my existing data?", a: "We provide a guided migration wizard and a dedicated team to help you move without downtime." },
];

const DEFAULT_STATS: [string, string][] = [
  ["10K+", "Teams using FlowOS"],
  ["99.9%", "Uptime SLA"],
  ["140+", "Integrations"],
  ["4.9★", "Average rating"],
];

function resolveData(config?: SiteConfig) {
  if (!config) {
    return {
      businessName: "FlowOS",
      tagline: "Now in public beta",
      heroTitle: "Ship faster.\nScale smarter.",
      heroDesc: "The all-in-one platform for modern teams. Automate your ops, unify your data, and move at startup speed — at any scale.",
      ctaText: "Start free trial",
      features: DEFAULT_FEATURES,
      logos: DEFAULT_LOGOS,
      testimonials: DEFAULT_TESTIMONIALS,
      tiers: DEFAULT_TIERS,
      faqs: DEFAULT_FAQS,
      stats: DEFAULT_STATS,
      founderName: "FlowOS, Inc.",
    };
  }

  const services = config.services ?? [];
  const valueProps = config.valueProps ?? [];
  const featureCards = [
    ...services.map((s) => ({ title: s.name, desc: s.description })),
    ...valueProps.map((v) => ({ title: v.title, desc: v.description })),
  ];

  const competitors = config.competitors ?? [];
  const resolvedTestimonials = competitors.length > 0
    ? competitors.map((c) => ({ name: c.name, role: c.price, quote: c.gap }))
    : DEFAULT_TESTIMONIALS;

  const pricingTiers = services.length >= 3
    ? [
        { name: services[0].name, price: services[0].price, per: "", features: [services[0].description], highlighted: false },
        { name: services[1].name, price: services[1].price, per: "", features: [services[1].description], highlighted: true },
        { name: services[2].name, price: services[2].price, per: "", features: [services[2].description], highlighted: false },
      ]
    : DEFAULT_TIERS;

  const stats: [string, string][] = [
    [config.market.size, `Market size`],
    [config.market.growthRate, "Growth rate"],
    [config.market.opportunityGap, "Opportunity"],
    ["4.9★", "Average rating"],
  ];

  return {
    businessName: config.business.name,
    tagline: config.business.tagline,
    heroTitle: config.business.name,
    heroDesc: config.business.description,
    ctaText: config.cta.text,
    features: featureCards.length > 0 ? featureCards : DEFAULT_FEATURES,
    logos: DEFAULT_LOGOS,
    testimonials: resolvedTestimonials,
    tiers: pricingTiers,
    faqs: DEFAULT_FAQS,
    stats,
    founderName: config.founder.name,
  };
}

export default function SaasTemplate({ config }: { config?: SiteConfig } = {}) {
  const d = resolveData(config);
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO: saas-hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1920&q=80"
          alt="Hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-24">
          <Badge className="mb-4 animate-fade-in bg-primary text-primary-foreground">{d.tagline}</Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-background mb-6 animate-fade-up [animation-delay:100ms]">
            {d.heroTitle}
          </h1>
          <p className="text-xl text-background/80 mb-8 max-w-2xl animate-fade-up [animation-delay:200ms]">
            {d.heroDesc}
          </p>
          <div className="flex gap-4 animate-fade-up [animation-delay:300ms]">
            <Button size="lg" className="bg-primary text-primary-foreground hover:scale-105 transition-all duration-300">
              {d.ctaText}
            </Button>
            <Button size="lg" variant="outline" className="border-background text-background hover:bg-background hover:text-foreground transition-all duration-300">
              Watch demo
            </Button>
          </div>
        </div>
      </section>

      {/* LOGO MARQUEE: logo-marquee */}
      <section className="py-12 border-y border-border bg-muted">
        <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-widest">Trusted by teams at</p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 px-6">
          {d.logos.map((logo: string) => (
            <span key={logo} className="text-muted-foreground font-semibold text-lg hover:text-foreground transition-all duration-300">{logo}</span>
          ))}
        </div>
      </section>

      {/* FEATURES: saas-features */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 animate-fade-up">Everything your team needs</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Built for modern teams who move fast and refuse to compromise on quality.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {d.features.map((f: { title: string; desc: string }, i: number) => (
            <Card
              key={f.title}
              className="bg-card text-card-foreground border-border rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardHeader className="pb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-lg text-primary">✦</span>
                </div>
                <CardTitle className="text-lg font-semibold">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm leading-relaxed">{f.desc}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* STATS: tech-stats */}
      <section className="border-y border-border bg-muted py-16">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {d.stats.map(([val, label]: [string, string]) => (
            <div key={label} className="animate-fade-up">
              <p className="text-4xl font-bold mb-1 text-primary">{val}</p>
              <p className="text-muted-foreground text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS: testimonial-cards */}
      <section className="container mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-16 animate-fade-up">What teams are saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {d.testimonials.map((t: { name: string; role: string; quote: string }, i: number) => (
            <Card
              key={t.name}
              className="bg-card text-card-foreground border-border rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardContent className="pt-6">
                <p className="text-sm leading-relaxed mb-6">&quot;{t.quote}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* PRICING: pricing-tiers */}
      <section className="bg-muted py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-up">Simple, transparent pricing</h2>
            <p className="text-muted-foreground">No hidden fees. Cancel any time.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {d.tiers.map((tier: { name: string; price: string; per: string; features: string[]; highlighted: boolean }, i: number) => (
              <Card
                key={tier.name}
                className={`rounded-2xl border-border hover:shadow-lg hover:scale-[1.02] transition-all duration-300 animate-fade-up ${tier.highlighted ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground"}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold mb-2">{tier.name}</CardTitle>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className={`mb-1 ${tier.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{tier.per}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feat: string) => (
                      <li key={feat} className={`flex items-center gap-2 text-sm ${tier.highlighted ? "text-primary-foreground" : ""}`}>
                        <span>✓</span> {feat}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full rounded-xl hover:scale-105 transition-all duration-300 ${tier.highlighted ? "bg-background text-foreground hover:bg-background/90" : "bg-primary text-primary-foreground"}`}
                  >
                    {tier.price === "Custom" ? "Contact sales" : "Get started"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA: glow-cta */}
      <section className="container mx-auto px-6 py-24">
        <div className="bg-primary rounded-3xl p-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 animate-fade-up">Ready to get started?</h2>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-md mx-auto">
            Join {d.businessName} and start building smarter today.
          </p>
          <Button size="lg" className="bg-background text-foreground hover:bg-background/90 hover:scale-105 transition-all duration-300 px-10">
            {d.ctaText}
          </Button>
        </div>
      </section>

      {/* FAQ: faq-accordion */}
      <section className="container mx-auto px-6 py-16 max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up">Frequently asked questions</h2>
        <Accordion multiple={false} className="space-y-2">
          {d.faqs.map((faq: { q: string; a: string }, i: number) => (
            <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-xl px-4 bg-card">
              <AccordionTrigger className="text-sm font-medium text-left hover:no-underline py-4">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm pb-4">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* FOOTER: footer-minimal */}
      <footer className="border-t border-border py-10 px-6 bg-muted">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-bold text-lg text-primary">{d.businessName}</span>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-all duration-300">Privacy</a>
            <a href="#" className="hover:text-foreground transition-all duration-300">Terms</a>
            <a href="#" className="hover:text-foreground transition-all duration-300">Docs</a>
            <a href="#" className="hover:text-foreground transition-all duration-300">Status</a>
          </div>
          <p className="text-muted-foreground text-xs">© {new Date().getFullYear()} {d.founderName}. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
