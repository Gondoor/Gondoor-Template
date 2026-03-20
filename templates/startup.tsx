"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: startup
// sections: saas-hero, saas-features, tech-stats, how-it-works, testimonial-cards, glow-cta, footer-minimal
// ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  { name: "Real-time Dashboards", desc: "Watch your key metrics update live. No more stale reports from last Tuesday.", icon: "📊" },
  { name: "AI-Powered Insights", desc: "Surface anomalies, trends, and opportunities automatically — before you even know to look.", icon: "🤖" },
  { name: "One-Click Integrations", desc: "Connect Salesforce, Hubspot, Stripe, Postgres, and 50+ more in seconds.", icon: "🔌" },
  { name: "Team Sharing", desc: "Share dashboards, set permissions, and collaborate without forwarding screenshots.", icon: "👥" },
  { name: "Custom Alerts", desc: "Get notified by Slack, email, or webhook the moment a metric crosses your threshold.", icon: "🔔" },
  { name: "Export to Anywhere", desc: "PDF, CSV, PNG, or push directly to Notion, Confluence, or Google Slides.", icon: "📤" },
];

const STATS = [
  { value: "800+", label: "Teams in early access" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "SOC2", label: "Type II Compliant" },
  { value: "<100ms", label: "Query response time" },
];

const STEPS = [
  { n: "01", title: "Connect your data", desc: "Point Pulse at any database, SaaS tool, or CSV. We handle the plumbing." },
  { n: "02", title: "Build your dashboard", desc: "Drag, drop, and configure charts with no SQL required. Or use AI to generate one." },
  { n: "03", title: "Share and automate", desc: "Set up alerts, schedule reports, and share a live link with your team." },
];

const TESTIMONIALS = [
  {
    name: "Jordan Lee",
    role: "Head of Growth · Beacon Labs",
    text: "We replaced three separate BI tools with Pulse. The AI-generated insights alone saved us 10 hours a week.",
  },
  {
    name: "Priya Sharma",
    role: "CTO · Stackify",
    text: "The one-click integrations are genuinely one click. I had our Stripe and Salesforce data in the same dashboard in under 5 minutes.",
  },
  {
    name: "Marcus Chen",
    role: "Founder · Orbital",
    text: "As an early-access user, I&apos;ve watched Pulse ship features faster than any tool I&apos;ve used. The team is exceptional.",
  },
];

export default function StartupTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* NAV */}
      <header className="px-6 py-5 flex justify-between items-center border-b border-border max-w-7xl mx-auto">
        <p className="text-xl font-black tracking-tight text-foreground">
          <span className="text-primary">Pulse</span> Analytics
        </p>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Features</a>
          <a href="#" className="hover:text-foreground transition-colors">Pricing</a>
          <a href="#" className="hover:text-foreground transition-colors">Docs</a>
        </nav>
        <Button size="sm" className="bg-primary text-primary-foreground font-semibold">
          Join Waitlist
        </Button>
      </header>

      {/* HERO: saas-hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
          alt="Startup team hero"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-24 text-center">
          <Badge className="mb-4 text-sm font-semibold bg-primary text-primary-foreground animate-fade-in">
            Early Access · 800+ Teams
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-background animate-fade-up [animation-delay:100ms]">
            Pulse Analytics —{" "}
            <span className="text-accent">Turn data into decisions.</span>
          </h1>
          <p className="text-xl text-background/80 max-w-2xl mx-auto mb-8 animate-fade-up [animation-delay:200ms]">
            Real-time dashboards, AI-powered insights, and automated alerts — without the enterprise price tag or 6-month onboarding.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up [animation-delay:300ms]">
            <Button size="lg" className="bg-primary text-primary-foreground font-semibold px-8 hover:opacity-90 transition-all duration-300">
              Join the Waitlist
            </Button>
            <Button size="lg" variant="outline" className="font-semibold px-8 border-border text-background hover:opacity-90 transition-all duration-300">
              See a Demo
            </Button>
          </div>
          <p className="mt-4 text-sm text-background/60 animate-fade-up [animation-delay:300ms]">Free during early access · No credit card required</p>
        </div>
      </section>

      <Separator />

      {/* SAAS FEATURES: saas-features */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-3">
            Everything you need. Nothing you don&apos;t.
          </h2>
          <p className="text-center text-muted-foreground mb-12">Six capabilities that replace a full BI stack.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <Card key={f.name} className="border border-border bg-card hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                <CardHeader>
                  <span className="text-3xl mb-2">{f.icon}</span>
                  <CardTitle className="text-base text-card-foreground">{f.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STATS: tech-stats */}
      <section className="py-16 px-6 border-y border-border bg-muted">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-black mb-1 text-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS: how-it-works */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-3">Up and running in 10 minutes.</h2>
          <p className="text-center text-muted-foreground mb-14">Three steps. No engineers needed.</p>
          <div className="flex flex-col md:flex-row gap-8">
            {STEPS.map((step, i) => (
              <div key={step.n} className="flex-1 relative">
                <div className="text-5xl font-black mb-4 text-primary">{step.n}</div>
                <h3 className="text-lg font-bold mb-2 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-4 text-muted-foreground text-2xl">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL CARDS: testimonial-cards */}
      <section className="py-20 px-6 border-t border-border bg-muted">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12">Early access teams love it.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name} className="border border-border bg-card hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4 text-sm text-primary">★★★★★</div>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                  <div>
                    <p className="text-sm font-bold text-card-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* GLOW CTA: glow-cta */}
      <section className="py-24 px-6 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-20 blur-3xl bg-accent" />
        <div className="relative max-w-2xl mx-auto text-center text-primary-foreground">
          <h2 className="text-5xl font-black mb-4">Ready to join the waitlist?</h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            We&apos;re onboarding new teams every week. Get early access and lock in our founding member pricing forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="work@yourcompany.com"
              className="flex-1 bg-background border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none"
            />
            <Button className="bg-background text-foreground font-semibold px-6 hover:opacity-90 transition-all duration-300">
              Join Waitlist
            </Button>
          </div>
          <p className="mt-4 text-xs text-primary-foreground/50">Joining is free. No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* FOOTER: footer-minimal */}
      <footer className="py-10 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="font-black tracking-tight text-foreground">
            <span className="text-primary">Pulse</span> Analytics
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Features</a>
            <a href="#" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#" className="hover:text-foreground transition-colors">Blog</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          </div>
          <p>© 2026 Pulse Analytics. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
