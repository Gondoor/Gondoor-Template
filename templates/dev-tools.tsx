"use client";


import { Accordion,AccordionContent,AccordionItem,AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: dev-tools
// sections: saas-hero, saas-features, tech-stats, testimonial-cards, pricing-tiers, faq-accordion, footer-minimal
// theme: globals.css CSS variables
// hero-image: https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1920&q=80
// ─────────────────────────────────────────────────────────────────────

const features = [
  { title: "Lightning Fast Builds", desc: "Incremental compilation and smart caching cut build times by up to 10x — from minutes to seconds." },
  { title: "Hot Reload", desc: "Changes reflect in the browser in under 50ms. No full reloads, no lost state, no wasted time." },
  { title: "Type Safety", desc: "End-to-end TypeScript inference from database to UI. Catch mistakes before they hit prod." },
  { title: "CI Integration", desc: "One-line setup for GitHub Actions, GitLab CI, and Bitbucket Pipelines. Parallel test runs included." },
  { title: "Local Secrets", desc: "Encrypted `.env` vault with team sharing. Rotate and audit keys without touching config files." },
  { title: "SSH Tunnels", desc: "Expose localhost to the internet instantly. Share previews, test webhooks, debug on mobile." },
];

const testimonials = [
  { name: "Ben Torres", role: "Senior Engineer, Zeal", quote: "Forge cut our CI time from 18 minutes to under 3. It's the single biggest productivity win we've had this year." },
  { name: "Yuki Hashimoto", role: "Staff Engineer, Codeflow", quote: "The local secrets vault finally solved our credentials chaos. Every engineer has the right env, every time." },
  { name: "Mia Larsson", role: "CTO, Stackbit", quote: "Hot reload at 50ms sounds trivial until you live with it. The flow state is completely different now." },
];

const tiers = [
  { name: "Hacker", price: "$0", per: "/mo", features: ["1 project", "Community support", "Public repos only", "5 SSH tunnels/mo"], highlighted: false },
  { name: "Pro", price: "$19", per: "/mo", features: ["Unlimited projects", "Priority support", "Private repos", "Unlimited tunnels", "Team secrets vault"], highlighted: true },
  { name: "Team", price: "$49", per: "/mo", features: ["Everything in Pro", "Up to 15 seats", "SSO / SAML", "Audit logs", "Dedicated Slack channel"], highlighted: false },
];

const faqs = [
  { q: "Does Forge work with any language or framework?", a: "Yes — Forge is language-agnostic. It works with Node, Python, Go, Rust, Ruby, and any framework on top of them." },
  { q: "How does the secrets vault work?", a: "Secrets are encrypted with AES-256 and stored per-project. Team members pull the latest vault with one CLI command." },
  { q: "Can I self-host Forge?", a: "Self-hosting is available on the Enterprise plan with full support and SLA guarantee." },
  { q: "Is there a CLI?", a: "Yes — `forge` CLI is the primary interface. `forge dev`, `forge build`, `forge tunnel`, `forge secrets pull` cover your daily workflow." },
  { q: "How does billing work for teams?", a: "Team plans are billed per seat per month. You can add or remove seats at any time and we'll prorate automatically." },
];

const stats = [
  ["10x", "Faster builds avg"],
  ["50ms", "Hot reload speed"],
  ["99.9%", "CLI uptime"],
  ["25K+", "Developers"],
];

export default function DevToolsTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO: saas-hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1920&q=80"
          alt="Hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-24">
          <Badge className="mb-4 animate-fade-in bg-primary text-primary-foreground">Developer CLI &amp; toolchain</Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-background mb-6 animate-fade-up [animation-delay:100ms]">
            Code. Ship.<br />Repeat.
          </h1>
          <p className="text-xl text-background/80 mb-8 max-w-2xl animate-fade-up [animation-delay:200ms]">
            Forge is the developer toolchain that eliminates the friction between writing code and shipping it. Faster builds, instant reload, and zero config.
          </p>
          <div className="flex gap-4 animate-fade-up [animation-delay:300ms]">
            <Button size="lg" className="bg-primary text-primary-foreground hover:scale-105 transition-all duration-300">
              Install Forge CLI
            </Button>
            <Button size="lg" variant="outline" className="border-background text-background hover:bg-background hover:text-foreground transition-all duration-300">
              Read the docs
            </Button>
          </div>
          <p className="text-background/60 text-sm mt-6 animate-fade-up [animation-delay:400ms] font-mono">
            curl -fsSL https://forge.dev/install | sh
          </p>
        </div>
      </section>

      {/* FEATURES: saas-features */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 animate-fade-up">Every tool your workflow needs</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            One CLI to build, test, deploy, and share — without the setup tax.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
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
          {stats.map(([val, label]) => (
            <div key={label} className="animate-fade-up">
              <p className="text-4xl font-bold mb-1 text-primary">{val}</p>
              <p className="text-muted-foreground text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS: testimonial-cards */}
      <section className="container mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-16 animate-fade-up">Loved by engineers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
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
            <h2 className="text-4xl font-bold mb-4 animate-fade-up">Free to start. Powerful when you grow.</h2>
            <p className="text-muted-foreground">No credit card required on Hacker plan.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tiers.map((tier, i) => (
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
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-sm">
                        <span>✓</span> {feat}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full rounded-xl hover:scale-105 transition-all duration-300 ${tier.highlighted ? "bg-background text-foreground hover:bg-background/90" : "bg-primary text-primary-foreground"}`}
                  >
                    {tier.price === "$0" ? "Start free" : "Get started"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ: faq-accordion */}
      <section className="container mx-auto px-6 py-16 max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up">Frequently asked questions</h2>
        <Accordion multiple={false} className="space-y-2">
          {faqs.map((faq, i) => (
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
          <span className="font-bold text-lg text-primary">Forge</span>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-all duration-300">Docs</a>
            <a href="#" className="hover:text-foreground transition-all duration-300">GitHub</a>
            <a href="#" className="hover:text-foreground transition-all duration-300">Changelog</a>
            <a href="#" className="hover:text-foreground transition-all duration-300">Status</a>
          </div>
          <p className="text-muted-foreground text-xs">© 2026 Forge Dev, Inc. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
