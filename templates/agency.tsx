"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: agency
// sections: agency-hero, logo-marquee, agency-services, portfolio-masonry, steps-timeline, team-grid, testimonial-cards, footer-minimal
// theme: globals.css CSS variables
// hero-image: https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1920&q=80
// ─────────────────────────────────────────────────────────────────────

const CLIENTS = ["Vercel", "Linear", "Notion", "Stripe", "Loom", "Figma", "Arc", "Raycast"]

const SERVICES = [
  { name: "Brand Identity", desc: "Logos, visual systems, and brand guidelines that make you unmistakable." },
  { name: "Web Design", desc: "Conversion-focused, beautiful websites that load fast and look stunning." },
  { name: "Digital Marketing", desc: "SEO, paid media, and growth strategies that compound over time." },
  { name: "Content Strategy", desc: "Words, story, and positioning that resonates with your audience." },
  { name: "Product Design", desc: "End-to-end UX/UI from wireframes to polished, production-ready interfaces." },
  { name: "Motion", desc: "Animation and micro-interactions that bring interfaces to life." },
]

const PORTFOLIO = [
  { title: "Celeris – SaaS Rebrand", tags: ["Brand", "Web"] },
  { title: "Orion – Product Launch", tags: ["Product Design", "Motion"] },
  { title: "Dune Analytics – Web Redesign", tags: ["Web Design"] },
  { title: "Vault – Identity System", tags: ["Brand", "Content"] },
  { title: "Halcyon – Marketing Site", tags: ["Web", "Marketing"] },
  { title: "Atlas – Mobile App UI", tags: ["Product Design", "Motion"] },
]

const STEPS = [
  { n: "01", title: "Discovery", desc: "We audit your brand, understand your goals, and identify real opportunities." },
  {
    n: "02",
    title: "Strategy",
    desc: "A clear roadmap — channels, messaging, and deliverables — before any design begins.",
  },
  { n: "03", title: "Creation", desc: "Our team executes with precision, iterating closely with you throughout." },
  { n: "04", title: "Launch & Grow", desc: "We ship and measure outcomes, optimising until results are undeniable." },
]

const TEAM = [
  { name: "Eliot Maren", role: "Founder & Creative Director", initials: "EM" },
  { name: "Yuki Sato", role: "Head of Product Design", initials: "YS" },
  { name: "Claire Dubois", role: "Brand Strategist", initials: "CD" },
  { name: "Nate Osei", role: "Lead Developer", initials: "NO" },
  { name: "Priya Mehta", role: "Motion Designer", initials: "PM" },
]

const TESTIMONIALS = [
  {
    name: "James T.",
    company: "CEO, Celeris",
    text: "Forma didn't just redesign our brand — they repositioned us in the market. Revenue up 40% in 90 days.",
  },
  {
    name: "Sarah L.",
    company: "Head of Design, Orion",
    text: "The most collaborative agency I've worked with. They challenged our assumptions in the best way.",
  },
  {
    name: "Marcus D.",
    company: "Founder, Vault",
    text: "Our new identity has been universally praised. Worth every penny and then some.",
  },
]

export default function AgencyTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-border bg-background">
        <p className="text-lg font-bold tracking-tight text-foreground">Forma Studio</p>
        <div className="hidden md:flex gap-8 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">
            Work
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Services
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Team
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            About
          </a>
        </div>
        <Button
          size="sm"
          className="bg-primary text-primary-foreground text-xs font-semibold hover:scale-105 transition-all duration-300"
        >
          Let&apos;s Talk
        </Button>
      </nav>

      {/* HERO: agency-hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1920&q=80"
          alt="Hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-28">
          <Badge className="mb-6 text-xs font-semibold bg-secondary text-secondary-foreground animate-fade-in">
            Creative Digital Agency · Est. 2018
          </Badge>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-tight mb-6 max-w-4xl text-background animate-fade-up">
            We build brands that <span className="text-primary">move.</span>
          </h1>
          <p className="text-xl text-background/80 max-w-2xl mb-10 animate-fade-up [animation-delay:150ms]">
            Forma Studio is a full-service creative agency helping ambitious companies define, design, and deliver
            experiences that leave a mark.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up [animation-delay:300ms]">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground font-semibold px-10 hover:scale-105 transition-all duration-300"
            >
              See Our Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-background text-background hover:bg-background/10 font-semibold px-10 transition-all duration-300"
            >
              Start a Project
            </Button>
          </div>
        </div>
      </section>

      {/* LOGO MARQUEE: logo-marquee */}
      <section className="py-12 bg-muted border-y border-border overflow-hidden">
        <p className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-6">Trusted by teams at</p>
        <div className="flex gap-12 items-center justify-center flex-wrap px-8">
          {CLIENTS.map((c, i) => (
            <span
              key={c}
              className="text-muted-foreground font-semibold text-sm hover:text-foreground transition-colors cursor-default animate-fade-in"
              style={{ animationDelay: `${i * 75}ms` }}
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* AGENCY SERVICES: agency-services */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <h2 className="text-4xl font-bold tracking-tight animate-fade-up">What We Do</h2>
            <p className="text-muted-foreground max-w-xs text-sm animate-fade-up [animation-delay:100ms]">
              We bring together strategy, design, and engineering — whatever your brand needs most.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {SERVICES.map((s, i) => (
              <div
                key={s.name}
                className="bg-background p-8 hover:bg-muted transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-8 h-0.5 mb-4 bg-primary" />
                <h3 className="font-semibold text-lg mb-2">{s.name}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="border-border" />

      {/* PORTFOLIO MASONRY: portfolio-masonry */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold tracking-tight mb-14 animate-fade-up">Selected Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO.map((p, i) => (
              <div
                key={p.title}
                className="rounded-2xl overflow-hidden cursor-pointer group hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border border-border"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="h-52 flex items-end p-6 bg-muted group-hover:bg-secondary transition-all duration-300">
                  <div>
                    <div className="flex gap-2 mb-2">
                      {p.tags.map((t) => (
                        <Badge key={t} className="text-xs bg-background/80 text-foreground" variant="secondary">
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <p className="font-semibold text-foreground">{p.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS TIMELINE: steps-timeline */}
      <section className="py-24 px-6 bg-muted">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold tracking-tight text-center mb-14 animate-fade-up">Our Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((s, i) => (
              <div key={s.n} className="animate-fade-up" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="text-4xl font-black mb-3 text-primary">{s.n}</div>
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM GRID: team-grid */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold tracking-tight text-center mb-14 animate-fade-up">The Team</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {TEAM.map((m, i) => (
              <div key={m.name} className="text-center w-36 animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-20 h-20 rounded-2xl mx-auto mb-3 flex items-center justify-center bg-foreground text-background text-lg font-bold hover:scale-105 transition-all duration-300">
                  {m.initials}
                </div>
                <p className="font-semibold text-sm">{m.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL CARDS: testimonial-cards */}
      <section className="py-24 px-6 bg-muted">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold tracking-tight text-center mb-14 animate-fade-up">What Clients Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <Card
                key={t.name}
                className="border border-border bg-card text-card-foreground hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardContent className="pt-8">
                  <p className="text-muted-foreground text-sm leading-relaxed italic mb-6">&ldquo;{t.text}&rdquo;</p>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER: footer-minimal */}
      <footer className="py-10 px-8 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="font-bold text-foreground">Forma Studio</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              Work
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Services
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
          <p>© 2026 Forma Studio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
