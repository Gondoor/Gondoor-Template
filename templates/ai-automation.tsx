"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: ai-automation
// sections: saas-hero, saas-features, tech-stats, how-it-works, testimonial-cards, pricing-tiers, glow-cta, footer-minimal
// theme: globals.css CSS variables
// hero-image: https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=1920&q=80
// ─────────────────────────────────────────────────────────────────────

const features = [
  {
    title: "Natural Language Triggers",
    desc: "Describe your workflow in plain English. Our AI translates it into automated logic instantly.",
  },
  {
    title: "Multi-Step Pipelines",
    desc: "Chain actions across dozens of apps with conditional logic, loops, and error handling built in.",
  },
  {
    title: "Real-Time Monitoring",
    desc: "Live dashboards show every workflow run, timing, and failure — with instant Slack alerts.",
  },
  {
    title: "AI Data Transform",
    desc: "Automatically extract, enrich, and reformat data between systems using LLM-powered transforms.",
  },
  {
    title: "Version Control",
    desc: "Every workflow change is versioned. Roll back to any previous state with a single click.",
  },
  {
    title: "Enterprise Security",
    desc: "SOC 2 Type II certified. End-to-end encryption. SSO, SAML, and audit logs included.",
  },
]

const steps = [
  {
    step: "01",
    title: "Connect",
    desc: "Link your existing tools in minutes. 200+ native integrations — no code needed.",
  },
  {
    step: "02",
    title: "Configure",
    desc: "Describe your workflow or pick from our template library. AI fills in the logic.",
  },
  {
    step: "03",
    title: "Launch",
    desc: "Go live with one click. Monitor runs, catch errors, and iterate in real time.",
  },
]

const testimonials = [
  {
    name: "Elena Ruiz",
    role: "COO, Vantage Health",
    quote:
      "We automated 14 manual processes in one afternoon. The team is now spending 20 hours a week on actual work instead of data entry.",
  },
  {
    name: "Tom Yardley",
    role: "Engineering Lead, Caspian",
    quote: "The natural language builder is magic. Non-technical teammates are building their own automations now.",
  },
  {
    name: "Nadia Falk",
    role: "Director of Ops, Luno",
    quote: "Our error rate dropped 94% after moving to Synapse. It just works, and when it doesn't, we know instantly.",
  },
]

const tiers = [
  {
    name: "Starter",
    price: "$49",
    per: "/mo",
    features: ["5 active workflows", "10K runs/mo", "50+ integrations", "Email support"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$149",
    per: "/mo",
    features: ["Unlimited workflows", "500K runs/mo", "200+ integrations", "Priority support", "AI data transforms"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    per: "",
    features: ["Unlimited everything", "Dedicated infra", "SLA guarantee", "SSO & audit logs", "Dedicated CSM"],
    highlighted: false,
  },
]

const stats = [
  ["200+", "Integrations"],
  ["99.95%", "Uptime"],
  ["50M+", "Workflow runs/mo"],
  ["94%", "Error reduction avg"],
]

export default function AiAutomationTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO: saas-hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=1920&q=80"
          alt="Hero"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-24">
          <Badge className="mb-4 animate-fade-in bg-primary text-primary-foreground">AI-native workflow platform</Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-background mb-6 animate-fade-up [animation-delay:100ms]">
            Automate the work.
            <br />
            Amplify the results.
          </h1>
          <p className="text-xl text-background/80 mb-8 max-w-2xl animate-fade-up [animation-delay:200ms]">
            Synapse connects your tools, learns your processes, and runs your workflows — so your team focuses on
            decisions, not data entry.
          </p>
          <div className="flex gap-4 animate-fade-up [animation-delay:300ms]">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:scale-105 transition-all duration-300"
            >
              Start automating free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-background text-background hover:bg-background hover:text-foreground transition-all duration-300"
            >
              See a live demo
            </Button>
          </div>
        </div>
      </section>

      {/* FEATURES: saas-features */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 animate-fade-up">Everything you need to automate at scale</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Powerful enough for engineering teams. Simple enough for operations.
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

      {/* HOW IT WORKS: how-it-works */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 animate-fade-up">Up and running in minutes</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Three steps from idea to automated workflow.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <div key={s.step} className="text-center animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">{s.step}</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS: testimonial-cards */}
      <section className="bg-muted py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 animate-fade-up">Results that speak for themselves</h2>
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
        </div>
      </section>

      {/* PRICING: pricing-tiers */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 animate-fade-up">Pricing that scales with you</h2>
          <p className="text-muted-foreground">All plans include a 14-day free trial.</p>
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
                  <span className={`mb-1 ${tier.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {tier.per}
                  </span>
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
                  {tier.price === "Custom" ? "Contact sales" : "Get started"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA: glow-cta */}
      <section className="bg-primary py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 animate-fade-up">
            Ready to reclaim your team&apos;s time?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-md mx-auto">
            Join thousands of teams automating the work that holds them back. Start free today.
          </p>
          <Button
            size="lg"
            className="bg-background text-foreground hover:bg-background/90 hover:scale-105 transition-all duration-300 px-10"
          >
            Start automating free
          </Button>
        </div>
      </section>

      {/* FOOTER: footer-minimal */}
      <footer className="border-t border-border py-10 px-6 bg-muted">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-bold text-lg text-primary">Synapse</span>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-all duration-300">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-all duration-300">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-all duration-300">
              Docs
            </a>
            <a href="#" className="hover:text-foreground transition-all duration-300">
              Status
            </a>
          </div>
          <p className="text-muted-foreground text-xs">© 2026 Synapse AI, Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
