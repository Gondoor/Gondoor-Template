"use client";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: yoga-studio
// sections: fitness-hero, local-services, team-grid, pricing-tiers, review-stars, booking-cta, footer-local
// ─────────────────────────────────────────────────────────────────────

const CLASSES = [
  { name: "Hatha Yoga", desc: "Foundational postures and breathwork for all levels — calm, grounding, and restorative.", icon: "🧘" },
  { name: "Vinyasa Flow", desc: "Dynamic movement linked with breath. Build strength and flexibility in a flowing sequence.", icon: "🌊" },
  { name: "Hot Yoga", desc: "26 postures in a heated room. Detoxify, deepen your stretch, and build resilience.", icon: "🔥" },
  { name: "Yin", desc: "Long-held poses targeting connective tissue. The perfect antidote to a stressful week.", icon: "🌙" },
  { name: "Meditation", desc: "Guided mindfulness sessions to quiet the mind and cultivate inner stillness.", icon: "☮️" },
  { name: "Breathwork", desc: "Pranayama and somatic breathing techniques for energy, focus, and nervous system reset.", icon: "💨" },
];

const TEAM = [
  { name: "Aria Patel", role: "RYT-500 · Hatha & Yin · 12 yrs exp", emoji: "🧘‍♀️" },
  { name: "Marcus Webb", role: "RYT-200 · Vinyasa & Hot Yoga", emoji: "🧘‍♂️" },
  { name: "Sofia Reyes", role: "RYT-300 · Meditation & Breathwork", emoji: "🧘‍♀️" },
  { name: "Jin Park", role: "RYT-500 · Restorative & Trauma-Informed", emoji: "🧘‍♂️" },
  { name: "Leila Hassan", role: "RYT-200 · Vinyasa & Hatha", emoji: "🧘‍♀️" },
];

const PRICING = [
  { name: "Single Class", price: "$22", period: "drop-in", features: ["Any class format", "Bring your own mat", "No commitment needed"] },
  { name: "10-Class Pack", price: "$180", period: "per pack", features: ["$18 per class", "Valid 3 months", "All class types included"], popular: true },
  { name: "Monthly Unlimited", price: "$129", period: "per month", features: ["Unlimited classes", "Guest pass/month", "Priority booking access"] },
];

const REVIEWS = [
  { name: "Hannah K.", text: "Flow Studio completely changed my relationship with my body. Aria's Yin classes are transformative.", stars: 5 },
  { name: "Ryan O.", text: "I was skeptical about hot yoga, but Marcus made it approachable. I'm hooked after one class.", stars: 5 },
  { name: "Diane F.", text: "The breathwork sessions with Sofia have done more for my anxiety than anything else I've tried.", stars: 5 },
  { name: "Tom V.", text: "Best yoga studio in the city. Clean space, incredible instructors, and a truly welcoming community.", stars: 5 },
];

export default function YogaStudioTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO: fitness-hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1920&q=80"
          alt="Yoga studio hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-24 text-center">
          <Badge className="mb-4 text-sm font-semibold bg-primary text-primary-foreground animate-fade-in">
            4.9★ · 550+ Reviews · Denver, CO
          </Badge>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 italic text-background animate-fade-up [animation-delay:100ms]">
            Flow Studio —{" "}
            <span className="text-accent">Find your flow.</span>
          </h1>
          <p className="text-xl text-background/80 max-w-2xl mx-auto mb-8 animate-fade-up [animation-delay:200ms]">
            A sanctuary for movement, mindfulness, and breath. Whether you&apos;re stepping on the mat for the first time or deepening an existing practice, you belong here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up [animation-delay:300ms]">
            <Button size="lg" className="bg-primary text-primary-foreground font-semibold px-8 hover:opacity-90 transition-all duration-300">
              Book Your First Class
            </Button>
            <Button size="lg" variant="outline" className="font-semibold px-8 border-border text-background hover:opacity-90 transition-all duration-300">
              View Schedule
            </Button>
          </div>
          <p className="mt-4 text-sm text-background/60 animate-fade-up [animation-delay:300ms]">First class free for new students</p>
        </div>
      </section>

      <Separator />

      {/* LOCAL SERVICES: local-services */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-3 italic">Class Offerings</h2>
          <p className="text-center text-muted-foreground mb-12">Every class is thoughtfully designed to meet you where you are.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLASSES.map((c) => (
              <Card key={c.name} className="border border-border bg-card hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                <CardHeader>
                  <span className="text-3xl mb-2">{c.icon}</span>
                  <CardTitle className="text-lg italic text-card-foreground">{c.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{c.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM GRID: team-grid */}
      <section className="py-20 px-6 bg-muted">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-3 italic">Your Instructors</h2>
          <p className="text-center text-muted-foreground mb-12">RYT-certified guides who teach from lived experience and authentic practice.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {TEAM.map((member) => (
              <Card key={member.name} className="border border-border bg-card text-center hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                <CardContent className="pt-6 pb-5">
                  <div className="text-5xl mb-3">{member.emoji}</div>
                  <h3 className="font-bold text-sm mb-1 italic text-card-foreground">{member.name}</h3>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TIERS: pricing-tiers */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-3 italic">Simple, Honest Pricing</h2>
          <p className="text-center text-muted-foreground mb-12">Practice at your own pace. No long-term contracts.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map((tier) => (
              <Card key={tier.name} className={`border-2 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ${tier.popular ? "border-primary" : "border-border"}`}>
                <CardHeader>
                  {tier.popular && (
                    <Badge className="mb-2 w-fit bg-primary text-primary-foreground text-xs">Best Value</Badge>
                  )}
                  <CardTitle className="italic text-card-foreground">{tier.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-4xl font-black text-primary">{tier.price}</span>
                    <span className="text-sm text-muted-foreground ml-2">{tier.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="text-primary">✔</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all duration-300">
                    Get Started
                  </Button>
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
            <span className="text-5xl font-black text-primary">4.9★</span>
            <p className="text-muted-foreground mt-1 text-sm">from 550+ verified reviews</p>
          </div>
          <h2 className="text-4xl font-bold text-center mb-10 italic">What Students Are Saying</h2>
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

      {/* BOOKING CTA: booking-cta */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-2xl mx-auto text-center text-primary-foreground">
          <h2 className="text-5xl font-bold mb-4 italic">Step onto the mat.</h2>
          <p className="mb-8 text-primary-foreground/80">Your first class is completely free. No experience needed — just show up.</p>
          <div className="bg-background rounded-2xl p-6 text-left shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Class Type</label>
                <select className="w-full border border-border rounded-lg px-3 py-2 text-foreground bg-background text-sm focus:outline-none">
                  <option>Hatha Yoga</option>
                  <option>Vinyasa Flow</option>
                  <option>Hot Yoga</option>
                  <option>Yin</option>
                  <option>Meditation</option>
                  <option>Breathwork</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Preferred Date</label>
                <input type="date" className="w-full border border-border rounded-lg px-3 py-2 text-foreground bg-background text-sm focus:outline-none" />
              </div>
            </div>
            <Button className="w-full bg-primary text-primary-foreground font-semibold py-3 hover:opacity-90 transition-all duration-300">
              Reserve My Spot
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER: footer-local */}
      <footer className="py-10 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="font-bold text-foreground italic text-lg">Flow Studio</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Schedule</a>
            <a href="#" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#" className="hover:text-foreground transition-colors">Instructors</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <p>© 2026 Flow Studio. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
