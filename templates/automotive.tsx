"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: automotive
// sections: construction-hero, local-services, trust-badges, review-stars, booking-cta, map-location, footer-local
// ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    name: "Oil Change",
    desc: "Conventional, synthetic blend, or full synthetic — quick, clean, and priced right.",
    icon: "🛢️",
  },
  { name: "Brake Service", desc: "Pad replacement, rotor resurfacing, and full brake system inspection.", icon: "🛞" },
  {
    name: "Engine Diagnostics",
    desc: "OBD-II scanning plus expert technician review of codes and causes.",
    icon: "🔧",
  },
  { name: "Transmission", desc: "Fluid service, filter changes, and full rebuild when needed.", icon: "⚙️" },
  { name: "Tire Rotation", desc: "Balance, rotate, and torque to spec for even wear and safer handling.", icon: "🔄" },
  { name: "AC Repair", desc: "Recharge, leak detection, and compressor replacement to keep you cool.", icon: "❄️" },
]

const BADGES = ["ASE Certified Technicians", "25-Point Inspection", "12mo/12K Warranty", "Free Loaner Cars"]

const REVIEWS = [
  {
    name: "Greg P.",
    text: "They diagnosed a check-engine light three other shops couldn't figure out. Fixed in two hours.",
    stars: 5,
  },
  {
    name: "Tanya B.",
    text: "Honest pricing, zero upselling. The loaner car program made everything stress-free.",
    stars: 5,
  },
  {
    name: "Mike S.",
    text: "Brakes feel brand new. They showed me the old pads so I knew exactly why the work was needed.",
    stars: 5,
  },
  {
    name: "Veronica C.",
    text: "I've been going here for 5 years. The warranty on their work is unmatched in the city.",
    stars: 5,
  },
]

export default function AutomotiveTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO: construction-hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80"
          alt="Automotive hero"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-24 text-center">
          <Badge className="mb-4 text-sm font-semibold uppercase tracking-widest bg-primary text-primary-foreground animate-fade-in">
            ASE Certified · Austin, TX
          </Badge>
          <h1 className="text-6xl md:text-9xl font-black tracking-widest mb-6 text-background uppercase animate-fade-up [animation-delay:100ms]">
            Precision Auto Care — <span className="text-accent">WE KEEP YOU MOVING.</span>
          </h1>
          <p className="text-xl text-background/80 max-w-2xl mx-auto mb-8 animate-fade-up [animation-delay:200ms]">
            Expert auto repair backed by a 12-month/12,000-mile warranty. From oil changes to full engine rebuilds — we
            do it right the first time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up [animation-delay:300ms]">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground font-bold px-8 uppercase tracking-wide hover:opacity-90 transition-all duration-300"
            >
              Book an Appointment
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="font-bold px-8 uppercase tracking-wide text-background border-border hover:opacity-90 transition-all duration-300"
            >
              Call (512) 555-0219
            </Button>
          </div>
        </div>
      </section>

      {/* TRUST BADGES: trust-badges */}
      <section className="py-10 px-6 bg-secondary">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-4">
          {BADGES.map((b) => (
            <div
              key={b}
              className="flex items-center gap-2 bg-background border border-border rounded-full px-5 py-2 text-sm font-medium hover:scale-105 transition-all duration-300"
            >
              <span className="text-primary">✔</span> {b}
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* LOCAL SERVICES: local-services */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">Our Services</h2>
          <p className="text-center text-muted-foreground mb-12">
            From routine maintenance to complex repairs, we handle it all.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <Card
                key={s.name}
                className="border border-border bg-card hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                <CardHeader>
                  <span className="text-3xl mb-2">{s.icon}</span>
                  <CardTitle className="text-lg font-bold text-card-foreground">{s.name}</CardTitle>
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
            <span className="text-5xl font-black text-primary">4.7★</span>
            <p className="text-muted-foreground mt-1 text-sm">from 1,100+ verified reviews</p>
          </div>
          <h2 className="text-3xl font-bold text-center mb-10">Drivers Trust Precision</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {REVIEWS.map((r) => (
              <Card
                key={r.name}
                className="border border-border bg-card hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-3 text-lg text-primary">{"★".repeat(r.stars)}</div>
                  <p className="text-muted-foreground text-sm italic mb-4">&quot;{r.text}&quot;</p>
                  <p className="text-sm font-semibold text-card-foreground">{r.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING CTA: booking-cta */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-2xl mx-auto text-center text-primary-foreground">
          <h2 className="text-4xl font-black mb-4 uppercase tracking-wide">Schedule Your Visit</h2>
          <p className="mb-8 text-primary-foreground/80">Drop-offs welcome. Loaner cars available for major repairs.</p>
          <div className="bg-background rounded-2xl p-6 text-left shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Service Type</label>
                <select className="w-full border border-border rounded-lg px-3 py-2 text-foreground bg-background text-sm focus:outline-none">
                  <option>Oil Change</option>
                  <option>Brake Service</option>
                  <option>Diagnostics</option>
                  <option>Tire Rotation</option>
                  <option>AC Repair</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Preferred Date</label>
                <input
                  type="date"
                  className="w-full border border-border rounded-lg px-3 py-2 text-foreground bg-background text-sm focus:outline-none"
                />
              </div>
            </div>
            <Button className="w-full bg-primary text-primary-foreground font-bold py-3 uppercase tracking-wide hover:opacity-90 transition-all duration-300">
              Request Appointment
            </Button>
          </div>
        </div>
      </section>

      {/* MAP LOCATION: map-location */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Find Our Shop</h2>
            <p className="text-muted-foreground mb-6">
              Conveniently located near the intersection of Lamar and Ben White. Easy drop-off and free pickup within 5
              miles.
            </p>
            <div className="space-y-2 text-sm text-foreground">
              <p>📍 4401 Lamar Blvd, Austin, TX 78756</p>
              <p>📞 (512) 555-0219</p>
              <p>✉️ service@precisionautocare.com</p>
              <p>🕗 Mon–Fri: 7:30am – 6pm · Sat: 8am – 4pm</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border h-64 bg-muted flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Map embed placeholder</p>
          </div>
        </div>
      </section>

      {/* FOOTER: footer-local */}
      <footer className="py-10 px-6 border-t border-border bg-secondary">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="font-black text-foreground tracking-widest uppercase">Precision Auto Care</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              Services
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Warranty
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Reviews
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
          <p>© 2026 Precision Auto Care. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
