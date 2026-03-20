"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: portfolio-personal
// sections: agency-hero, portfolio-masonry, agency-services, testimonial-cards, glow-cta, footer-minimal
// ─────────────────────────────────────────────────────────────────────

const CASE_STUDIES = [
  {
    title: "Orbit — Mobile Banking App",
    tags: ["iOS", "UX Research", "Prototyping"],
    desc: "Redesigned core transaction flow, reducing task completion time by 38%.",
  },
  {
    title: "Lattice — SaaS Dashboard",
    tags: ["B2B SaaS", "Design System"],
    desc: "Built a scalable component library used across 6 product teams.",
  },
  {
    title: "Bloom — E-commerce Redesign",
    tags: ["E-commerce", "Conversion CRO"],
    desc: "Checkout redesign increased conversion rate from 1.9% to 3.4%.",
  },
  {
    title: "Apex Design System",
    tags: ["Design Systems", "Figma", "Storybook"],
    desc: "End-to-end design system for a Series B fintech serving 400K users.",
  },
  {
    title: "Pulse — Health Tracking App",
    tags: ["Mobile", "Interaction Design"],
    desc: "Zero-to-one product design for an AI-powered wellness companion.",
  },
  {
    title: "Clearpath — AI Onboarding",
    tags: ["SaaS", "Onboarding", "AI/UX"],
    desc: "Redesigned user onboarding, cutting time-to-value from 14 days to 3.",
  },
];

const SERVICES = [
  { name: "Product Design", desc: "End-to-end product thinking — from discovery and research through to polished, production-ready designs.", icon: "🎨" },
  { name: "UI/UX Design", desc: "Interfaces that are visually compelling, intuitively usable, and deeply aligned with user needs.", icon: "✦" },
  { name: "Prototyping", desc: "High-fidelity Figma prototypes and micro-interaction design that bring your product to life before a line of code is written.", icon: "⚡" },
  { name: "Design Systems", desc: "Scalable, documented component libraries in Figma and Storybook that keep your team moving fast without breaking things.", icon: "🧩" },
];

const TESTIMONIALS = [
  {
    name: "Aisha Patel",
    role: "CPO · Orbit Financial",
    text: "Sam's work on our mobile app was transformative. They brought a rare combination of deep user empathy and executional craft.",
  },
  {
    name: "Chris Moody",
    role: "Founder · Bloom Commerce",
    text: "We hired Sam to fix checkout and they delivered a complete rethink that nearly doubled our conversion rate. Exceptional ROI.",
  },
  {
    name: "Jenna Wu",
    role: "Design Lead · Lattice",
    text: "The design system Sam built is still the backbone of our product two years later. Thoughtful, scalable, and well-documented.",
  },
];

export default function PortfolioPersonalTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* NAV */}
      <header className="px-6 py-5 flex justify-between items-center border-b border-border max-w-7xl mx-auto sticky top-0 bg-background/90 backdrop-blur-sm z-10">
        <p className="font-black text-lg tracking-tight text-foreground">
          Sam Chen<span className="text-primary">.</span>
        </p>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Work</a>
          <a href="#" className="hover:text-foreground transition-colors">Services</a>
          <a href="#" className="hover:text-foreground transition-colors">About</a>
        </nav>
        <Button size="sm" className="bg-primary text-primary-foreground font-semibold">
          Book a Chat
        </Button>
      </header>

      {/* HERO: agency-hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1920&q=80"
          alt="Designer hero"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-24">
          <Badge className="mb-4 text-sm font-semibold bg-primary text-primary-foreground animate-fade-in">
            Product Designer · Open to Projects
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-background animate-fade-up [animation-delay:100ms]">
            Sam Chen — Product Designer.{" "}
            <span className="text-accent">I design products people love.</span>
          </h1>
          <p className="text-xl text-background/80 max-w-2xl mb-8 animate-fade-up [animation-delay:200ms]">
            7+ years shipping delightful, impactful interfaces for startups and scale-ups across fintech, SaaS, and e-commerce.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up [animation-delay:300ms]">
            <Button size="lg" className="bg-primary text-primary-foreground font-semibold px-8 hover:opacity-90 transition-all duration-300">
              View My Work
            </Button>
            <Button size="lg" variant="outline" className="font-semibold px-8 border-border text-background hover:opacity-90 transition-all duration-300">
              Download Resume
            </Button>
          </div>
        </div>
      </section>

      <Separator />

      {/* PORTFOLIO MASONRY: portfolio-masonry */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-3">Selected Work</h2>
          <p className="text-center text-muted-foreground mb-12">Six case studies across mobile, SaaS, and e-commerce.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {CASE_STUDIES.map((cs, i) => (
              <div
                key={cs.title}
                className={`group rounded-2xl border border-border bg-card p-6 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ${i === 0 || i === 3 ? "sm:col-span-2" : "sm:col-span-1"}`}
              >
                <div className="aspect-video rounded-xl bg-muted mb-4 flex items-center justify-center text-4xl overflow-hidden">
                  {["📱", "🖥️", "🛍️", "🧩", "💊", "🤖"][i]}
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {cs.tags.map((t) => (
                    <span key={t} className="text-xs font-medium rounded-full px-3 py-1 border border-border text-muted-foreground">{t}</span>
                  ))}
                </div>
                <h3 className="font-black text-base mb-1 text-card-foreground">{cs.title}</h3>
                <p className="text-sm text-muted-foreground">{cs.desc}</p>
                <p className="mt-3 text-sm font-semibold text-primary transition-colors">
                  View case study →
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGENCY SERVICES: agency-services */}
      <section className="py-20 px-6 bg-muted">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-3">What I Do</h2>
          <p className="text-center text-muted-foreground mb-12">Specialisms built across 7 years of shipping real products.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map((s) => (
              <Card key={s.name} className="border border-border bg-card hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                <CardHeader>
                  <span className="text-3xl mb-2">{s.icon}</span>
                  <CardTitle className="text-lg font-black text-card-foreground">{s.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL CARDS: testimonial-cards */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12">What Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name} className="border border-border bg-card hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4 text-sm text-primary">★★★★★</div>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
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
        <div className="absolute inset-0 opacity-30 blur-3xl pointer-events-none bg-accent" />
        <div className="relative max-w-2xl mx-auto text-center text-primary-foreground">
          <h2 className="text-5xl font-black mb-4">
            Let&apos;s build something great.
          </h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            I take on a small number of projects each quarter. Book a free 30-minute chat to talk about your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-background text-foreground font-semibold px-8 hover:opacity-90 transition-all duration-300">
              Book a 30-min Chat
            </Button>
            <Button size="lg" variant="outline" className="font-semibold px-8 border-primary-foreground/40 text-primary-foreground hover:opacity-90 transition-all duration-300">
              Send an Email
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER: footer-minimal */}
      <footer className="py-10 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="font-black text-foreground">
            Sam Chen<span className="text-primary">.</span>
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-foreground transition-colors">Dribbble</a>
            <a href="#" className="hover:text-foreground transition-colors">Read.cv</a>
            <a href="#" className="hover:text-foreground transition-colors">Twitter/X</a>
          </div>
          <p>© 2026 Sam Chen. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
