"use client";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent } from "@/components/ui/card";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: finance
// sections: agency-hero, agency-services, trust-badges, tech-stats, testimonial-cards, booking-cta, faq-accordion, footer-minimal
// theme: globals.css CSS variables
// hero-image: https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1920&q=80
// ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  { name: "Wealth Management", desc: "Comprehensive strategies to grow and protect your wealth across every life stage." },
  { name: "Tax Planning", desc: "Proactive tax strategies that legally minimise your liability year-round." },
  { name: "Retirement Planning", desc: "Tailored retirement roadmaps — 401(k), IRA, pension, and beyond." },
  { name: "Investment Strategy", desc: "Diversified portfolios built to your risk profile and time horizon." },
  { name: "Insurance", desc: "Life, disability, and long-term care coverage aligned to your financial plan." },
  { name: "Estate Planning", desc: "Preserve and transfer your wealth with intention through trust and estate strategies." },
];

const BADGES = ["SEC Registered", "Fiduciary Duty", "FINRA Member", "SIPC Protected"];

const STATS = [
  { value: "$2.4B", label: "Assets Under Management" },
  { value: "18", label: "Years of Experience" },
  { value: "500+", label: "Clients Served" },
  { value: "98%", label: "Client Retention Rate" },
];

const TESTIMONIALS = [
  { name: "Sandra H.", role: "Retired Executive", text: "Meridian built a retirement plan I actually understand. I&apos;ve never felt more confident about my financial future." },
  { name: "James P.", role: "Business Owner", text: "The tax planning alone has saved us six figures annually. These are real strategists, not salespeople." },
  { name: "Lydia & Mark T.", role: "High-net-worth clients", text: "We consolidated all our accounts with Meridian 5 years ago. Best financial decision we&apos;ve ever made." },
];

const FAQS = [
  { q: "What is a fiduciary financial advisor?", a: "A fiduciary is legally obligated to act in your best interest at all times — unlike brokers, who only need to meet a &apos;suitability&apos; standard. All Meridian advisors are fiduciaries." },
  { q: "What is the minimum investment to work with Meridian?", a: "Our wealth management services begin at $500,000 in investable assets. We also offer financial planning engagements on a flat-fee basis for clients building toward this threshold." },
  { q: "How do you charge for your services?", a: "We charge a transparent annual advisory fee based on assets under management, typically 0.75–1.25% depending on account size. No commissions, no hidden fees." },
  { q: "How often will we meet to review my portfolio?", a: "All clients receive a formal quarterly review and ad-hoc access to their advisor whenever life changes occur. You&apos;re never left wondering." },
];

export default function FinanceTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* NAV */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-border bg-background">
        <div>
          <p className="font-bold text-lg text-primary">Meridian Wealth</p>
          <p className="text-xs text-muted-foreground -mt-0.5">Financial Advisory Group</p>
        </div>
        <div className="hidden md:flex gap-8 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Services</a>
          <a href="#" className="hover:text-foreground transition-colors">About</a>
          <a href="#" className="hover:text-foreground transition-colors">Insights</a>
        </div>
        <Button size="sm" className="bg-primary text-primary-foreground text-xs font-semibold hover:scale-105 transition-all duration-300">Get Started</Button>
      </nav>

      {/* HERO: agency-hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1920&q=80"
          alt="Hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-28">
          <Badge className="mb-6 text-xs font-semibold bg-secondary text-secondary-foreground animate-fade-in">
            Fee-Only · Fiduciary · Independent
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 max-w-3xl text-background animate-fade-up">
            Your financial future,{" "}
            <span className="text-primary">expertly guided.</span>
          </h1>
          <p className="text-xl text-background/80 max-w-2xl mb-10 animate-fade-up [animation-delay:150ms]">
            Meridian Wealth is an independent, fee-only financial advisory firm dedicated to helping high-achieving individuals and families build, protect, and transfer lasting wealth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up [animation-delay:300ms]">
            <Button size="lg" className="bg-primary text-primary-foreground font-semibold px-10 hover:scale-105 transition-all duration-300">
              Schedule a Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-background text-background hover:bg-background/10 px-10 transition-all duration-300">
              Learn Our Approach
            </Button>
          </div>
        </div>
      </section>

      {/* TECH STATS: tech-stats */}
      <section className="py-16 px-6 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {STATS.map((s, i) => (
            <div key={s.label} className="animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="text-4xl font-black mb-1 text-primary">{s.value}</div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AGENCY SERVICES: agency-services */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-3 animate-fade-up">Our Services</h2>
          <p className="text-center text-muted-foreground mb-14 text-sm animate-fade-up [animation-delay:100ms]">A full suite of financial planning and investment services under one roof.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div
                key={s.name}
                className="bg-card rounded-xl p-7 border border-border hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-6 h-0.5 mb-4 bg-primary" />
                <h3 className="font-semibold text-lg mb-2 text-card-foreground">{s.name}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BADGES: trust-badges */}
      <section className="py-14 px-6 bg-muted border-y border-border">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3">
          {BADGES.map((b, i) => (
            <div
              key={b}
              className="flex items-center gap-2 bg-card border border-border rounded-full px-5 py-2 text-sm font-medium shadow-sm hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="text-primary">✓</span> {b}
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL CARDS: testimonial-cards */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-14 animate-fade-up">Client Experiences</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <Card
                key={t.name}
                className="border border-border bg-card text-card-foreground hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardContent className="pt-8">
                  <div className="text-sm mb-4 text-primary">&ldquo;</div>
                  <p className="text-muted-foreground text-sm leading-relaxed italic mb-6">{t.text}</p>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING CTA: booking-cta */}
      <section className="py-20 px-6 text-center bg-primary">
        <div className="max-w-xl mx-auto text-primary-foreground">
          <h2 className="text-4xl font-bold mb-4 animate-fade-up">Start With a Complimentary Review</h2>
          <p className="mb-8 text-primary-foreground/80 text-sm animate-fade-up [animation-delay:100ms]">A no-obligation 45-minute meeting to assess your current situation and explore how Meridian can help.</p>
          <div className="bg-background rounded-2xl p-6 text-left shadow-xl animate-fade-up [animation-delay:200ms]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Full Name</label>
                <input type="text" placeholder="Sandra Harris" className="w-full border border-border rounded-lg px-3 py-2 text-foreground text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Email Address</label>
                <input type="email" placeholder="sandra@email.com" className="w-full border border-border rounded-lg px-3 py-2 text-foreground text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Phone Number</label>
                <input type="tel" placeholder="(503) 555-0000" className="w-full border border-border rounded-lg px-3 py-2 text-foreground text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Primary Interest</label>
                <select className="w-full border border-border rounded-lg px-3 py-2 text-foreground text-sm bg-background focus:outline-none">
                  <option>Wealth Management</option>
                  <option>Tax Planning</option>
                  <option>Retirement Planning</option>
                  <option>Investment Strategy</option>
                  <option>Insurance</option>
                  <option>Estate Planning</option>
                </select>
              </div>
            </div>
            <Button className="w-full bg-primary text-primary-foreground font-bold text-sm hover:scale-105 transition-all duration-300">
              Book a Free Review
            </Button>
          </div>
          <p className="text-xs text-primary-foreground/60 mt-4">No products sold. No pressure. Just guidance.</p>
        </div>
      </section>

      {/* FAQ ACCORDION: faq-accordion */}
      <section className="py-24 px-6 bg-muted">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-14 animate-fade-up">Common Questions</h2>
          <div className="space-y-4">
            {FAQS.map((f, i) => (
              <details
                key={f.q}
                className="bg-card border border-border rounded-xl p-6 cursor-pointer group hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${i * 75}ms` }}
              >
                <summary className="font-semibold text-sm flex justify-between items-center list-none text-card-foreground">
                  {f.q}
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="mt-4 text-muted-foreground text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER: footer-minimal */}
      <footer className="py-10 px-8 border-t border-border bg-background">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="font-bold text-foreground">Meridian Wealth</p>
          <p className="text-xs text-center text-muted-foreground max-w-md">Investment advisory services offered through Meridian Wealth Advisors LLC, a registered investment advisor. Past performance is not indicative of future results.</p>
          <p>© 2026 Meridian Wealth. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
