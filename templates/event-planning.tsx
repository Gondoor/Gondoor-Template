"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: event-planning
// sections: event-hero, agency-services, portfolio-masonry, steps-timeline, testimonial-cards, pricing-packages, booking-cta, footer-minimal
// ─────────────────────────────────────────────────────────────────────

const services = [
  { title: "Weddings", icon: "💍", desc: "Intimate ceremonies to grand celebrations — every detail perfectly curated." },
  { title: "Corporate Events", icon: "🏢", desc: "Conferences, galas, team off-sites, and product launches that impress." },
  { title: "Birthday Parties", icon: "🎂", desc: "Milestone birthdays transformed into unforgettable experiences." },
  { title: "Baby Showers", icon: "🌸", desc: "Whimsical and elegant showers celebrating new arrivals." },
  { title: "Galas", icon: "✨", desc: "Black-tie fundraisers and charity galas with seamless execution." },
  { title: "Holiday Parties", icon: "🎄", desc: "Festive corporate and private holiday events done right." },
];

const portfolio = [
  { title: "The Monroe Wedding", tag: "Wedding · 300 guests" },
  { title: "Apex Tech Summit 2025", tag: "Corporate · 500 attendees" },
  { title: "Bella's Sweet 16", tag: "Birthday · Private" },
  { title: "Rosen Baby Shower", tag: "Baby Shower · Garden Party" },
  { title: "Lighthouse Charity Gala", tag: "Gala · $400K raised" },
  { title: "Nordstrom Holiday Party", tag: "Holiday · 200 guests" },
];

const steps = [
  { num: "01", title: "Consult", desc: "We meet to understand your vision, budget, and priorities." },
  { num: "02", title: "Plan", desc: "We create a detailed roadmap, source vendors, and lock in every detail." },
  { num: "03", title: "Execute", desc: "Our team manages everything day-of so you can be fully present." },
  { num: "04", title: "Celebrate", desc: "Enjoy every moment — we handle the rest from setup to breakdown." },
];

const testimonials = [
  { name: "Amanda & Chris Monroe", role: "Wedding Clients", quote: "Celebrate Co. took our Pinterest board and turned it into a reality that exceeded our wildest dreams." },
  { name: "Patricia Harlow", role: "VP Operations, Apex Tech", quote: "Our summit ran like clockwork. 500 attendees, zero hiccups. We'll use no one else." },
  { name: "Denise Rosen", role: "Baby Shower Client", quote: "Every single detail was perfect. My guests are still talking about it three months later." },
];

const packages = [
  { name: "Day-Of Coordination", price: "$2,500", features: ["Final month management", "Vendor coordination", "Day-of timeline", "Ceremony rehearsal", "10-hour coverage"] },
  { name: "Full Planning", price: "$6,500", features: ["Everything in Coordination", "Budget management", "Venue sourcing", "Vendor selection", "Design concept", "Monthly check-ins"], highlighted: true },
  { name: "Luxury Experience", price: "$15,000", features: ["Everything in Full Planning", "Unlimited revisions", "Custom décor design", "Travel included", "White-glove service", "Post-event recap"] },
];

export default function EventPlanningTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO: event-hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1532117182898-20b59729b9dc?auto=format&fit=crop&w=1920&q=80"
          alt="Event planning hero"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-28">
          <div className="max-w-2xl animate-fade-in">
            <Badge className="mb-5 px-3 py-1 text-xs uppercase tracking-widest rounded-full border border-primary-foreground/60 text-primary-foreground bg-transparent [animation-delay:100ms]">
              Est. 2016 · New York City
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-5 text-primary-foreground animate-fade-up [animation-delay:100ms]">
              Every event,<br />
              <span className="text-primary-foreground/80 italic">unforgettable.</span>
            </h1>
            <p className="text-primary-foreground/75 text-lg mb-8 max-w-md leading-relaxed animate-fade-up [animation-delay:200ms]">
              Celebrate Co. is a full-service event planning studio crafting extraordinary experiences — from intimate gatherings to grand galas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-up [animation-delay:300ms]">
              <Button size="lg" className="px-8 rounded-xl font-semibold bg-primary text-primary-foreground hover:scale-105 transition-all duration-300 hover:shadow-lg">
                Plan My Event
              </Button>
              <Button size="lg" variant="outline" className="px-8 rounded-xl font-semibold border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 hover:scale-105 transition-all duration-300">
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES: agency-services */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-3 text-foreground">What We Plan</h2>
          <p className="text-muted-foreground max-w-md mx-auto">From intimate moments to landmark celebrations, we do it all.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {services.map((s) => (
            <Card key={s.title} className="rounded-2xl border border-border bg-card hover:shadow-lg hover:scale-105 transition-all duration-300 p-5">
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="font-bold text-base mb-1 text-card-foreground">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* PORTFOLIO: portfolio-masonry */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14 text-foreground">Recent Events</h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {portfolio.map((item, i) => (
              <div
                key={i}
                className={`break-inside-avoid rounded-2xl overflow-hidden relative group cursor-pointer hover:scale-105 transition-all duration-300 ${i % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"} bg-secondary`}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <span className="text-6xl">🎉</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/70 to-transparent">
                  <p className="text-background font-semibold text-sm">{item.title}</p>
                  <p className="text-background/70 text-xs">{item.tag}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE: steps-timeline */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-3 text-foreground">How We Work</h2>
          <p className="text-muted-foreground">A simple process that delivers extraordinary results.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <div key={step.num} className="text-center hover:scale-105 transition-all duration-300">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4 ${i % 2 === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                {step.num}
              </div>
              <h3 className="font-bold text-base mb-2 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS: testimonial-cards */}
      <section className="py-20 px-6 bg-primary">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-primary-foreground text-center mb-12">Happy Clients</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="rounded-2xl bg-primary-foreground/10 border-primary-foreground/20 hover:shadow-lg hover:scale-105 transition-all duration-300">
                <CardContent className="p-6">
                  <p className="text-primary-foreground/90 text-sm leading-relaxed mb-5 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold bg-background text-foreground">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-primary-foreground">{t.name}</p>
                      <p className="text-xs text-primary-foreground/50">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING: pricing-packages */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-3 text-foreground">Packages</h2>
          <p className="text-muted-foreground">Transparent pricing — no hidden fees.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {packages.map((pkg) => (
            <Card key={pkg.name} className={`rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 ${pkg.highlighted ? "border-primary border-2 bg-primary/5" : "border-border bg-card"}`}>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold mb-1 text-card-foreground">{pkg.name}</CardTitle>
                <span className={`text-3xl font-extrabold ${pkg.highlighted ? "text-primary" : "text-foreground"}`}>{pkg.price}</span>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-primary">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Button className={`w-full rounded-xl font-semibold hover:scale-105 transition-all duration-300 hover:shadow-lg ${pkg.highlighted ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                  Get a Quote
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* BOOKING: booking-cta */}
      <section className="container mx-auto px-6 py-16 max-w-2xl text-center">
        <div className="rounded-3xl p-12 border border-border bg-muted">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Ready to start planning?</h2>
          <p className="text-muted-foreground mb-8">Book a free 30-minute consultation and let&apos;s bring your vision to life.</p>
          <Button size="lg" className="px-10 rounded-xl font-semibold bg-primary text-primary-foreground hover:scale-105 transition-all duration-300 hover:shadow-lg">
            Book Free Consultation
          </Button>
        </div>
      </section>

      <Separator className="bg-border" />

      {/* FOOTER: footer-minimal */}
      <footer className="py-10 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-bold text-xl text-primary">Celebrate Co.</span>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
            <a href="#" className="hover:text-foreground transition-colors">Pinterest</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <p className="text-muted-foreground text-xs">© 2026 Celebrate Co. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
