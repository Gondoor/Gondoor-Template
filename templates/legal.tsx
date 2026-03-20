"use client";


import { Button } from "@/components/ui/button";
import { Card,CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: legal
// sections: agency-hero, agency-services, team-grid, trust-badges, testimonial-cards, booking-cta, faq-accordion, footer-minimal
// theme: globals.css CSS variables
// hero-image: https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=1920&q=80
// ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  { name: "Business Law", desc: "Formation, contracts, governance, and compliance for companies of every stage." },
  { name: "Real Estate", desc: "Residential and commercial transactions, title reviews, and dispute resolution." },
  { name: "Estate Planning", desc: "Wills, trusts, powers of attorney, and comprehensive succession strategies." },
  { name: "Employment Law", desc: "Advising employers and employees on rights, agreements, and disputes." },
  { name: "Litigation", desc: "Tenacious courtroom representation when negotiation isn&apos;t enough." },
  { name: "Contract Review", desc: "Thorough review and drafting of commercial agreements that protect your interests." },
];

const TEAM = [
  { name: "William Hargrove", role: "Managing Partner", specialty: "Business & Litigation", initials: "WH" },
  { name: "Catherine Miles", role: "Partner", specialty: "Estate Planning & Real Estate", initials: "CM" },
  { name: "David Okafor", role: "Senior Associate", specialty: "Employment Law", initials: "DO" },
  { name: "Priya Nair", role: "Associate", specialty: "Contract & Business Law", initials: "PN" },
];

const BADGES = ["State Bar Certified", "20+ Years Experience", "Confidential Consultations", "AV Rated Martindale-Hubbell"];

const TESTIMONIALS = [
  { name: "Robert S.", company: "CEO, Ashford Group", text: "Hargrove & Associates handled our acquisition flawlessly. Decisive, thorough, and always available." },
  { name: "Helen W.", company: "Private Client", text: "William guided me through estate planning with clarity and genuine care. I sleep better knowing it&apos;s handled." },
  { name: "Thomas C.", company: "Founder, CreekSide LLC", text: "Our employment dispute was resolved in 60 days. David was calm, strategic, and effective." },
];

const FAQS = [
  { q: "What should I bring to my first consultation?", a: "Any relevant documents — contracts, correspondence, filings, or notices. Don&apos;t worry if you don&apos;t have everything; we&apos;ll guide you through what&apos;s needed." },
  { q: "Do you charge for initial consultations?", a: "We offer a complimentary 30-minute consultation to assess your situation and determine how we can help." },
  { q: "How does billing work?", a: "We offer hourly billing, fixed-fee arrangements, and in select litigation matters, contingency structures. Fees are discussed and agreed in writing before we begin." },
  { q: "How long does a typical case take?", a: "This depends entirely on matter type and complexity. Contract reviews may take days; complex litigation can span months or years. We provide realistic timelines from the outset." },
  { q: "Is my information kept confidential?", a: "Absolutely. Attorney-client privilege applies to all communications. Your privacy is a legal and ethical obligation we take very seriously." },
];

export default function LegalTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* NAV */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-border bg-background">
        <div>
          <p className="font-semibold text-lg text-primary">Hargrove &amp; Associates</p>
          <p className="text-xs text-muted-foreground -mt-0.5">Attorneys at Law</p>
        </div>
        <div className="hidden md:flex gap-8 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Practice Areas</a>
          <a href="#" className="hover:text-foreground transition-colors">Our Team</a>
          <a href="#" className="hover:text-foreground transition-colors">About</a>
        </div>
        <Button size="sm" className="bg-primary text-primary-foreground text-xs font-semibold hover:scale-105 transition-all duration-300">Schedule Consultation</Button>
      </nav>

      {/* HERO: agency-hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=1920&q=80"
          alt="Hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-28">
          <p className="text-sm uppercase tracking-widest mb-6 font-medium text-background/70 animate-fade-in">
            Established 2004 · Portland, Oregon
          </p>
          <h1 className="text-6xl md:text-7xl font-semibold italic leading-tight mb-6 max-w-3xl text-background animate-fade-up">
            Trusted counsel.{" "}
            <span className="text-primary">Decisive results.</span>
          </h1>
          <p className="text-xl text-background/80 max-w-2xl mb-10 animate-fade-up [animation-delay:150ms]">
            Hargrove &amp; Associates provides sophisticated legal counsel to individuals and businesses navigating complex matters. We combine deep expertise with straightforward, honest guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up [animation-delay:300ms]">
            <Button size="lg" className="bg-primary text-primary-foreground font-medium px-10 hover:scale-105 transition-all duration-300">
              Free Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-background text-background hover:bg-background/10 px-10 font-medium transition-all duration-300">
              Our Practice Areas
            </Button>
          </div>
        </div>
      </section>

      <Separator className="border-border" />

      {/* AGENCY SERVICES: agency-services */}
      <section className="py-24 px-6 bg-muted">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-semibold italic text-center mb-3 animate-fade-up">Practice Areas</h2>
          <p className="text-center text-muted-foreground mb-14 text-sm animate-fade-up [animation-delay:100ms]">Experienced across the matters that matter most to you.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div
                key={s.name}
                className="bg-card rounded-xl p-7 border border-border hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-6 h-0.5 mb-4 bg-accent" />
                <h3 className="font-semibold text-lg mb-2 text-primary">{s.name}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM GRID: team-grid */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-semibold italic text-center mb-14 animate-fade-up">Our Attorneys</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((m, i) => (
              <div key={m.name} className="text-center animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center bg-primary text-primary-foreground text-lg font-semibold hover:scale-105 transition-all duration-300">
                  {m.initials}
                </div>
                <h3 className="font-semibold text-sm">{m.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{m.role}</p>
                <p className="text-xs mt-1 font-medium text-accent-foreground">{m.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BADGES: trust-badges */}
      <section className="py-14 px-6 border-y border-border bg-muted">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
          {BADGES.map((b, i) => (
            <div
              key={b}
              className="flex items-center gap-2 bg-card border border-border rounded-full px-5 py-2.5 text-sm font-medium shadow-sm hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="text-accent-foreground">✦</span> {b}
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL CARDS: testimonial-cards */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-semibold italic text-center mb-14 animate-fade-up">Client Testimonials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <Card
                key={t.name}
                className="border border-border bg-card text-card-foreground hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardContent className="pt-8">
                  <p className="text-muted-foreground text-sm italic leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.company}</p>
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
          <h2 className="text-4xl font-semibold italic mb-4 animate-fade-up">Begin With a Conversation</h2>
          <p className="mb-8 text-primary-foreground/80 animate-fade-up [animation-delay:100ms]">Schedule a complimentary 30-minute consultation. No obligation — just honest counsel.</p>
          <div className="bg-background rounded-2xl p-6 text-left shadow-xl animate-fade-up [animation-delay:200ms]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Full Name</label>
                <input type="text" placeholder="John Smith" className="w-full border border-border rounded-lg px-3 py-2 text-foreground text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Email Address</label>
                <input type="email" placeholder="john@email.com" className="w-full border border-border rounded-lg px-3 py-2 text-foreground text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Phone Number</label>
                <input type="tel" placeholder="(503) 555-0000" className="w-full border border-border rounded-lg px-3 py-2 text-foreground text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Practice Area</label>
                <select className="w-full border border-border rounded-lg px-3 py-2 text-foreground text-sm bg-background focus:outline-none">
                  <option>Business Law</option>
                  <option>Real Estate</option>
                  <option>Estate Planning</option>
                  <option>Employment Law</option>
                  <option>Litigation</option>
                  <option>Contract Review</option>
                </select>
              </div>
            </div>
            <Button className="w-full bg-primary text-primary-foreground font-semibold hover:scale-105 transition-all duration-300">
              Schedule Your Consultation
            </Button>
          </div>
          <p className="text-xs text-primary-foreground/60 mt-4">Or call (503) 555-0104 · Available Mon–Fri, 8am–6pm</p>
        </div>
      </section>

      {/* FAQ ACCORDION: faq-accordion */}
      <section className="py-24 px-6 bg-muted">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-semibold italic text-center mb-14 animate-fade-up">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((f, i) => (
              <details
                key={f.q}
                className="bg-card border border-border rounded-xl p-6 group cursor-pointer hover:shadow-lg transition-all duration-300"
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
          <p className="font-semibold text-foreground italic">Hargrove &amp; Associates</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Practice Areas</a>
            <a href="#" className="hover:text-foreground transition-colors">Team</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          </div>
          <p>© 2026 Hargrove &amp; Associates. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
