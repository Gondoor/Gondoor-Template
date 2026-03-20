"use client";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: local-service
// sections: local-hero, local-services, trust-badges, steps-timeline, review-stars, booking-cta, map-location, footer-local
// theme: globals.css CSS variables
// hero-image: https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=80
// ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  { name: "Deep Clean", desc: "Top-to-bottom intensive cleaning for any space.", icon: "🧹" },
  { name: "Move-in/out", desc: "Leave or arrive to a spotless home.", icon: "📦" },
  { name: "Regular Weekly", desc: "Consistent upkeep on your schedule.", icon: "📅" },
  { name: "Window Cleaning", desc: "Crystal-clear windows inside and out.", icon: "🪟" },
  { name: "Carpet Steam", desc: "Deep steam extraction for fresh carpets.", icon: "✨" },
  { name: "Garage Clean", desc: "Declutter and deep clean your garage.", icon: "🏠" },
];

const BADGES = ["Licensed & Insured", "Background-Checked", "Eco-Friendly Products", "Satisfaction Guaranteed"];

const STEPS = [
  { n: "01", title: "Book Online", desc: "Pick your service, date, and time in under 2 minutes." },
  { n: "02", title: "We Arrive", desc: "Our vetted, uniformed cleaners show up on time, every time." },
  { n: "03", title: "Relax", desc: "Come home to a spotlessly clean space. Guaranteed." },
];

const REVIEWS = [
  { name: "Maria T.", text: "SparkClean transformed my home — I couldn't believe the difference after just one deep clean!", stars: 5 },
  { name: "James R.", text: "Punctual, thorough, and genuinely friendly. My go-to service every week.", stars: 5 },
  { name: "Priya S.", text: "Used them for a move-out clean. Got my full deposit back. 100% recommend!", stars: 5 },
  { name: "Carlos M.", text: "Eco-friendly products that actually work. My kids and pets are safe.", stars: 5 },
];

export default function LocalServiceTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO: local-hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=80"
          alt="Hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-24 text-center">
          <Badge className="mb-4 text-sm font-medium bg-primary text-primary-foreground animate-fade-in">
            Serving Your Neighborhood
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-background animate-fade-up">
            Your home,{" "}
            <span className="text-primary">spotlessly clean.</span>
          </h1>
          <p className="text-xl text-background/80 max-w-2xl mx-auto mb-8 animate-fade-up [animation-delay:150ms]">
            Professional home cleaning you can trust. SparkClean brings a five-star experience straight to your door — backed by a 100% satisfaction guarantee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up [animation-delay:300ms]">
            <Button size="lg" className="bg-primary text-primary-foreground font-semibold px-8 hover:scale-105 transition-all duration-300">
              Book a Cleaning
            </Button>
            <Button size="lg" variant="outline" className="border-background text-background hover:bg-background/10 font-semibold px-8 transition-all duration-300">
              See Our Services
            </Button>
          </div>
          <p className="mt-4 text-sm text-background/60 animate-fade-up [animation-delay:450ms]">No commitment · Free instant quote</p>
        </div>
      </section>

      <Separator className="border-border" />

      {/* TRUST BADGES: trust-badges */}
      <section className="py-10 px-6 bg-muted">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-4">
          {BADGES.map((b, i) => (
            <div
              key={b}
              className="flex items-center gap-2 bg-background border border-border rounded-full px-5 py-2 text-sm font-medium animate-fade-in transition-all duration-300 hover:shadow-lg"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="text-primary">✔</span> {b}
            </div>
          ))}
        </div>
      </section>

      {/* LOCAL SERVICES: local-services */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3 animate-fade-up">Our Cleaning Services</h2>
          <p className="text-center text-muted-foreground mb-12 animate-fade-up [animation-delay:100ms]">Tailored to every home, every need.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <Card
                key={s.name}
                className="border border-border hover:shadow-lg hover:scale-[1.02] transition-all duration-300 bg-card text-card-foreground"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardHeader>
                  <span className="text-3xl mb-2">{s.icon}</span>
                  <CardTitle className="text-lg">{s.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS TIMELINE: steps-timeline */}
      <section className="py-20 px-6 bg-muted">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up">How It Works</h2>
          <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
            {STEPS.map((step, i) => (
              <div key={step.n} className="flex-1 text-center animate-fade-up" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="text-5xl font-black mb-3 text-primary">{step.n}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEW STARS: review-stars */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4 animate-fade-up">
            <span className="text-5xl font-black text-accent-foreground">4.8★</span>
            <p className="text-muted-foreground mt-1 text-sm">from 1,200+ verified reviews</p>
          </div>
          <h2 className="text-3xl font-bold text-center mb-10 animate-fade-up [animation-delay:100ms]">What Our Clients Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {REVIEWS.map((r, i) => (
              <Card
                key={r.name}
                className="border border-border bg-card text-card-foreground hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-3 text-accent-foreground">
                    {"★".repeat(r.stars)}
                  </div>
                  <p className="text-muted-foreground text-sm italic mb-4">&quot;{r.text}&quot;</p>
                  <p className="text-sm font-semibold">{r.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING CTA: booking-cta */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-2xl mx-auto text-center text-primary-foreground">
          <h2 className="text-4xl font-bold mb-4 animate-fade-up">Ready for a Cleaner Home?</h2>
          <p className="mb-8 text-primary-foreground/80 animate-fade-up [animation-delay:100ms]">Book your first cleaning today and get 15% off. No contracts, no hassle.</p>
          <div className="bg-background rounded-2xl p-6 text-left shadow-xl animate-fade-up [animation-delay:200ms]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Your Name</label>
                <input type="text" placeholder="Jane Smith" className="w-full border border-border rounded-lg px-3 py-2 text-foreground text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Email Address</label>
                <input type="email" placeholder="jane@email.com" className="w-full border border-border rounded-lg px-3 py-2 text-foreground text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Select Date</label>
                <input type="date" className="w-full border border-border rounded-lg px-3 py-2 text-foreground text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Service Type</label>
                <select className="w-full border border-border rounded-lg px-3 py-2 text-foreground text-sm bg-background focus:outline-none">
                  <option>Deep Clean</option>
                  <option>Move-in/out</option>
                  <option>Regular Weekly</option>
                  <option>Window Cleaning</option>
                  <option>Carpet Steam</option>
                  <option>Garage Clean</option>
                </select>
              </div>
            </div>
            <Button className="w-full bg-primary text-primary-foreground font-semibold py-3 hover:scale-105 transition-all duration-300">
              Confirm Booking
            </Button>
          </div>
        </div>
      </section>

      {/* MAP LOCATION: map-location */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <h2 className="text-3xl font-bold mb-4">Find Us</h2>
            <p className="text-muted-foreground mb-6">We serve the greater metro area and surrounding suburbs. Get in touch to confirm your neighborhood.</p>
            <div className="space-y-2 text-sm text-foreground">
              <p>📍 1420 Greenfield Ave, Suite 3, Portland, OR 97201</p>
              <p>📞 (503) 555-0147</p>
              <p>✉️ hello@sparkclean.com</p>
              <p>🕗 Mon–Sat: 7am – 7pm</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border h-64 bg-muted flex items-center justify-center animate-fade-up [animation-delay:150ms]">
            <p className="text-muted-foreground text-sm">Map embed placeholder</p>
          </div>
        </div>
      </section>

      {/* FOOTER: footer-local */}
      <footer className="py-10 px-6 border-t border-border bg-background">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">SparkClean</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Services</a>
            <a href="#" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          </div>
          <p>© 2026 SparkClean. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
