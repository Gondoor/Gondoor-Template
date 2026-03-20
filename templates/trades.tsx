"use client";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: trades
// sections: construction-hero, local-services, trust-badges, review-stars, pricing-packages, booking-cta, map-location, footer-local
// ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  { name: "Electrical Wiring", desc: "Residential & commercial wiring done to code, safely and on schedule.", icon: "⚡" },
  { name: "Panel Upgrades", desc: "Modern breaker panels installed for today's power demands.", icon: "🔌" },
  { name: "Plumbing Install", desc: "Full fixture and pipe installation for kitchens and baths.", icon: "🚿" },
  { name: "Drain Cleaning", desc: "Stubborn clogs cleared fast with hydro-jet technology.", icon: "🪣" },
  { name: "HVAC Service", desc: "Heating and cooling tune-ups, repairs, and full installs.", icon: "❄️" },
  { name: "Emergency Repairs", desc: "24/7 response for electrical, plumbing, and HVAC emergencies.", icon: "🚨" },
];

const BADGES = ["Licensed Master Electrician", "Plumbing Licensed", "24/7 Emergency", "Flat-rate Pricing"];

const PACKAGES = [
  { name: "Inspection", price: "$99", features: ["Safety inspection", "Written report", "Priority scheduling", "1 minor fix included"] },
  { name: "Standard Service", price: "$299", features: ["Up to 4 hrs labor", "Parts & materials", "Code compliance check", "90-day warranty"], popular: true },
  { name: "Home Complete", price: "$799", features: ["Full-day service", "All trades covered", "1-year warranty", "Dedicated project manager"] },
];

const REVIEWS = [
  { name: "Kevin B.", text: "BlueStar rewired my entire basement in one day. Clean work, zero mess left behind.", stars: 5 },
  { name: "Sandra L.", text: "Called at 11pm for a burst pipe. Technician arrived in 45 minutes. Absolute lifesavers.", stars: 5 },
  { name: "Tom W.", text: "Flat-rate pricing means no surprises. HVAC tune-up was thorough and fairly priced.", stars: 5 },
  { name: "Rachael M.", text: "Panel upgrade completed ahead of schedule. Inspector passed it first try.", stars: 5 },
];

export default function TradesTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO: construction-hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1920&q=80"
          alt="Trades hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-24 text-center">
          <Badge className="mb-4 text-sm font-semibold bg-primary text-primary-foreground animate-fade-in">
            Licensed · Insured · Local
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-background animate-fade-up [animation-delay:100ms]">
            BlueStar Trades —{" "}
            <span className="text-accent">Fast. Reliable. Done right.</span>
          </h1>
          <p className="text-xl text-background/80 max-w-2xl mx-auto mb-8 animate-fade-up [animation-delay:200ms]">
            Your trusted electrical, plumbing, and HVAC contractor. We show up on time, charge fair flat rates, and stand behind every job.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up [animation-delay:300ms]">
            <Button size="lg" className="bg-primary text-primary-foreground font-semibold px-8 hover:opacity-90 transition-all duration-300">
              Book a Service Call
            </Button>
            <Button size="lg" variant="outline" className="font-semibold px-8 border-border text-background hover:opacity-90 transition-all duration-300">
              Call (512) 555-0183
            </Button>
          </div>
          <p className="mt-4 text-sm text-background/60 animate-fade-up [animation-delay:300ms]">Free estimates · No hidden fees · Same-day availability</p>
        </div>
      </section>

      <Separator />

      {/* TRUST BADGES: trust-badges */}
      <section className="py-10 px-6 bg-muted">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-4">
          {BADGES.map((b) => (
            <div key={b} className="flex items-center gap-2 bg-background border border-border rounded-full px-5 py-2 text-sm font-medium hover:scale-105 transition-all duration-300">
              <span className="text-primary">✔</span> {b}
            </div>
          ))}
        </div>
      </section>

      {/* LOCAL SERVICES: local-services */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">What We Do</h2>
          <p className="text-center text-muted-foreground mb-12">One call covers all your home&apos;s essential systems.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <Card key={s.name} className="border border-border bg-card hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                <CardHeader>
                  <span className="text-3xl mb-2">{s.icon}</span>
                  <CardTitle className="text-lg text-card-foreground">{s.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEW STARS: review-stars */}
      <section className="py-20 px-6 bg-muted">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-5xl font-black text-primary">4.8★</span>
            <p className="text-muted-foreground mt-1 text-sm">from 650+ verified reviews</p>
          </div>
          <h2 className="text-3xl font-bold text-center mb-10">Trusted by Homeowners</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {REVIEWS.map((r) => (
              <Card key={r.name} className="border border-border bg-card hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-3 text-lg text-primary">
                    {"★".repeat(r.stars)}
                  </div>
                  <p className="text-muted-foreground text-sm italic mb-4">&ldquo;{r.text}&rdquo;</p>
                  <p className="text-sm font-semibold text-card-foreground">{r.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PACKAGES: pricing-packages */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">Service Packages</h2>
          <p className="text-center text-muted-foreground mb-12">Flat-rate pricing. No surprises, ever.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACKAGES.map((pkg) => (
              <Card key={pkg.name} className={`border-2 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ${pkg.popular ? "border-primary" : "border-border"}`}>
                <CardHeader>
                  {pkg.popular && (
                    <Badge className="mb-2 w-fit bg-primary text-primary-foreground text-xs">Most Popular</Badge>
                  )}
                  <CardTitle className="text-card-foreground">{pkg.name}</CardTitle>
                  <p className="text-4xl font-black mt-2 text-primary">{pkg.price}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="text-primary">✔</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all duration-300">
                    Book This Package
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING CTA: booking-cta */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-2xl mx-auto text-center text-primary-foreground">
          <h2 className="text-4xl font-bold mb-4">Need a Technician Today?</h2>
          <p className="mb-8 text-primary-foreground/80">Schedule online in 2 minutes or call our dispatch line directly.</p>
          <div className="bg-background rounded-2xl p-6 text-left shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Service Needed</label>
                <select className="w-full border border-border rounded-lg px-3 py-2 text-foreground bg-background text-sm focus:outline-none">
                  <option>Electrical</option>
                  <option>Plumbing</option>
                  <option>HVAC</option>
                  <option>Emergency</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Preferred Date</label>
                <input type="date" className="w-full border border-border rounded-lg px-3 py-2 text-foreground bg-background text-sm focus:outline-none" />
              </div>
            </div>
            <Button className="w-full bg-primary text-primary-foreground font-semibold py-3 hover:opacity-90 transition-all duration-300">
              Request Appointment
            </Button>
          </div>
        </div>
      </section>

      {/* MAP LOCATION: map-location */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Service Area</h2>
            <p className="text-muted-foreground mb-6">We serve Austin and surrounding communities within a 40-mile radius.</p>
            <div className="space-y-2 text-sm text-foreground">
              <p>📍 3802 Industrial Blvd, Austin, TX 78744</p>
              <p>📞 (512) 555-0183</p>
              <p>✉️ dispatch@bluestartrades.com</p>
              <p>🕗 Mon–Fri: 7am – 8pm · Sat: 8am – 5pm · 24/7 Emergency</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border h-64 bg-muted flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Map embed placeholder</p>
          </div>
        </div>
      </section>

      {/* FOOTER: footer-local */}
      <footer className="py-10 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="font-bold text-foreground">BlueStar Trades</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Services</a>
            <a href="#" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#" className="hover:text-foreground transition-colors">Service Area</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <p>© 2026 BlueStar Trades. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
