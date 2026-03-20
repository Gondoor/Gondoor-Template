"use client";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: fitness
// sections: fitness-hero, local-services, team-grid, pricing-tiers, review-stars, booking-cta, footer-local
// theme: globals.css CSS variables
// hero-image: https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80
// ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  { name: "Personal Training", desc: "One-on-one sessions designed around your goals and schedule.", icon: "🏋️" },
  { name: "Group Classes", desc: "High-energy classes with a community that pushes you forward.", icon: "👥" },
  { name: "HIIT", desc: "Burn max calories in minimum time with science-backed intervals.", icon: "⚡" },
  { name: "Strength & Conditioning", desc: "Build a powerful, injury-resistant body from the ground up.", icon: "💪" },
  { name: "Nutrition Coaching", desc: "Personalised meal plans that fuel your performance.", icon: "🥗" },
  { name: "Recovery", desc: "Stretch, mobilise, and come back stronger — every session.", icon: "🧘" },
];

const TEAM = [
  { name: "Marcus Reid", role: "Head Coach · Strength", creds: "CSCS, 12 yrs", initials: "MR" },
  { name: "Danielle Park", role: "HIIT & Cardio Specialist", creds: "NASM-CPT, 8 yrs", initials: "DP" },
  { name: "Tomás Rivera", role: "Nutrition & Recovery", creds: "Pn2, RD, 10 yrs", initials: "TR" },
];

const TIERS = [
  { name: "Drop-in", price: "$25", period: "per class", perks: ["Access any single class", "No commitment", "Towel service included"] },
  { name: "Monthly", price: "$89", period: "per month", perks: ["Unlimited group classes", "1 free PT session/mo", "App access & tracking"], highlight: true },
  { name: "Annual", price: "$799", period: "per year", perks: ["Everything in Monthly", "Priority booking", "Nutrition consult", "Annual body composition scan"] },
];

const REVIEWS = [
  { name: "Kevin L.", text: "APEX changed how I train. Marcus pushed me further than I ever thought possible.", stars: 5 },
  { name: "Sandra M.", text: "Lost 18 lbs in 3 months and finally feel strong. The nutrition coaching made the difference.", stars: 5 },
  { name: "Bryce H.", text: "Best HIIT classes in the city. The energy in the room is unreal.", stars: 5 },
];

export default function FitnessTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO: fitness-hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80"
          alt="Hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-24 text-center">
          <Badge className="mb-6 text-xs font-bold uppercase tracking-widest border-border bg-transparent text-background animate-fade-in" variant="outline">
            Portland&apos;s #1 Performance Studio
          </Badge>
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tight leading-none mb-6 text-background animate-fade-up">
            Push Your <span className="text-primary">Limits.</span>
          </h1>
          <p className="text-lg text-background/80 max-w-xl mx-auto mb-10 animate-fade-up [animation-delay:150ms]">
            APEX Training is where elite performance meets everyday determination. Whatever your goal — we build champions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up [animation-delay:300ms]">
            <Button size="lg" className="bg-primary text-primary-foreground font-bold uppercase tracking-wider px-10 hover:scale-105 transition-all duration-300">
              Start Free Week
            </Button>
            <Button size="lg" variant="outline" className="border-background text-background hover:bg-background/10 font-bold uppercase tracking-wider px-10 transition-all duration-300">
              View Schedule
            </Button>
          </div>
          <div className="flex justify-center gap-12 mt-16 animate-fade-up [animation-delay:450ms]">
            {[["500+", "Members"], ["3", "Expert Coaches"], ["6", "Class Types"]].map(([n, l]) => (
              <div key={l} className="text-center">
                <div className="text-4xl font-black text-primary">{n}</div>
                <div className="text-xs text-background/60 mt-1 uppercase tracking-widest">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="border-border" />

      {/* LOCAL SERVICES: local-services */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-black uppercase text-center mb-12 animate-fade-up">
            Train <span className="text-primary">Smarter</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => (
              <div
                key={s.name}
                className="border border-border rounded-xl p-6 bg-card hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="text-3xl mb-3 block">{s.icon}</span>
                <h3 className="text-lg font-bold mb-2 uppercase text-primary">{s.name}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM GRID: team-grid */}
      <section className="py-20 px-6 border-t border-border bg-muted">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-black uppercase text-center mb-12 animate-fade-up">Your <span className="text-primary">Coaches</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {TEAM.map((m, i) => (
              <div
                key={m.name}
                className="text-center border border-border rounded-xl p-8 bg-card hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center bg-primary text-primary-foreground text-xl font-black">
                  {m.initials}
                </div>
                <h3 className="font-black text-lg uppercase text-foreground">{m.name}</h3>
                <p className="text-muted-foreground text-sm mt-1">{m.role}</p>
                <Badge className="mt-3 text-xs" variant="outline">{m.creds}</Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TIERS: pricing-tiers */}
      <section className="py-20 px-6 border-t border-border bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-black uppercase text-center mb-12 animate-fade-up">Choose Your <span className="text-primary">Plan</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TIERS.map((t, i) => (
              <Card
                key={t.name}
                className={`border bg-card text-card-foreground transition-all duration-300 hover:shadow-lg ${t.highlight ? "border-primary shadow-lg" : "border-border"}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardHeader className="text-center">
                  {t.highlight && <Badge className="mx-auto mb-2 text-xs bg-primary text-primary-foreground font-bold uppercase">Best Value</Badge>}
                  <CardTitle className="text-2xl font-black uppercase">{t.name}</CardTitle>
                  <div>
                    <span className="text-4xl font-black text-primary">{t.price}</span>
                    <span className="text-muted-foreground text-sm ml-1">{t.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {t.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2">
                        <span className="text-primary">▸</span> {perk}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-6 font-bold uppercase tracking-wider hover:scale-105 transition-all duration-300 ${t.highlight ? "bg-primary text-primary-foreground" : ""}`}
                    variant={t.highlight ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEW STARS: review-stars */}
      <section className="py-20 px-6 border-t border-border bg-muted">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl font-black mb-2 text-primary animate-fade-up">4.8★</div>
          <p className="text-muted-foreground text-sm mb-10 animate-fade-up [animation-delay:100ms]">from 900+ member reviews</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div
                key={r.name}
                className="border border-border rounded-xl p-6 text-left bg-card hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-sm mb-2 text-primary">{"★".repeat(r.stars)}</div>
                <p className="text-muted-foreground text-sm italic mb-3">&quot;{r.text}&quot;</p>
                <p className="text-sm font-bold text-foreground">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING CTA: booking-cta */}
      <section className="py-24 px-6 text-center bg-primary">
        <div className="max-w-2xl mx-auto text-primary-foreground">
          <h2 className="text-6xl font-black uppercase mb-4 animate-fade-up">
            Book Your Class
          </h2>
          <p className="text-primary-foreground/80 mb-8 animate-fade-up [animation-delay:100ms]">No credit card. No commitment. Just results.</p>
          <div className="bg-background rounded-2xl p-6 text-left shadow-xl animate-fade-up [animation-delay:200ms]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Your Name</label>
                <input type="text" placeholder="Alex Johnson" className="w-full border border-border rounded-lg px-3 py-2 text-foreground text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Email</label>
                <input type="email" placeholder="alex@email.com" className="w-full border border-border rounded-lg px-3 py-2 text-foreground text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Preferred Date</label>
                <input type="date" className="w-full border border-border rounded-lg px-3 py-2 text-foreground text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Class Type</label>
                <select className="w-full border border-border rounded-lg px-3 py-2 text-foreground text-sm bg-background focus:outline-none">
                  <option>Personal Training</option>
                  <option>Group Classes</option>
                  <option>HIIT</option>
                  <option>Strength &amp; Conditioning</option>
                  <option>Nutrition Coaching</option>
                  <option>Recovery</option>
                </select>
              </div>
            </div>
            <Button className="w-full bg-primary text-primary-foreground font-black uppercase tracking-widest hover:scale-105 transition-all duration-300">
              Book My Class
            </Button>
          </div>
          <p className="text-xs text-primary-foreground/50 mt-4 animate-fade-up [animation-delay:300ms]">Limited spots available each week</p>
        </div>
      </section>

      {/* FOOTER: footer-local */}
      <footer className="py-8 px-6 border-t border-border bg-background">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="font-black text-xl uppercase tracking-widest text-foreground">APEX Training</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Classes</a>
            <a href="#" className="hover:text-foreground transition-colors">Coaches</a>
            <a href="#" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <p>© 2026 APEX Training. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
