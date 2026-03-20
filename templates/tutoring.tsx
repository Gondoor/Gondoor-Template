"use client";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: tutoring
// sections: local-hero, local-services, team-grid, impact-stats, review-stars, pricing-tiers, booking-cta, footer-local
// ─────────────────────────────────────────────────────────────────────

const subjects = [
  { name: "Mathematics", desc: "Algebra, geometry, calculus, and statistics for all grade levels.", icon: "📐" },
  { name: "Science", desc: "Biology, chemistry, physics — from middle school to AP level.", icon: "🔬" },
  { name: "English & Writing", desc: "Grammar, essay writing, reading comprehension, and literature.", icon: "📝" },
  { name: "SAT / ACT Prep", desc: "Score-boosting strategies and full-length practice tests.", icon: "🎯" },
  { name: "History & Social Studies", desc: "US history, world history, government, and AP courses.", icon: "🌍" },
  { name: "Coding & Computer Science", desc: "Python, web development, AP CS Principles and A.", icon: "💻" },
];

const tutors = [
  { name: "Emily Chen", role: "Math & SAT Specialist", degree: "MIT — Applied Math" },
  { name: "David Okafor", role: "Science & Chemistry", degree: "UC Berkeley — Chemistry" },
  { name: "Sarah Gonzalez", role: "English & Writing", degree: "UCLA — English Literature" },
  { name: "Ryan Park", role: "Coding & CS", degree: "Stanford — Computer Science" },
  { name: "Nadia Foster", role: "History & Humanities", degree: "Yale — History" },
  { name: "Alex Kim", role: "ACT Prep & Math", degree: "Northwestern — Education" },
];

const stats = [
  { value: "94%", label: "Grade Improvement Rate" },
  { value: "200+", label: "Active Students" },
  { value: "8 Yrs", label: "In the Community" },
  { value: "4.9★", label: "Average Rating" },
];

const pricing = [
  { name: "1-Hour Single", price: "$75", desc: "One session with your chosen tutor", highlight: false },
  { name: "5-Session Pack", price: "$325", desc: "Save $50 — best for focused test prep", highlight: true },
  { name: "Monthly Unlimited", price: "$549", desc: "Unlimited sessions across all subjects", highlight: false },
];

const reviews = [
  "My daughter went from failing algebra to a B+ in one semester. Truly grateful.",
  "The SAT prep course raised my son's score by 180 points. Incredible tutors.",
  "BrightMinds made my kid actually enjoy learning. Worth every dollar.",
];

export default function TutoringTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* TUTORING-HERO: local-hero — full-bleed image */}
      <section className="relative overflow-hidden min-h-[600px] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1434030216411-0b793f4b6f78?auto=format&fit=crop&w=1920&q=80"
          alt="Tutoring hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-24 max-w-6xl animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-5 text-xs px-3 py-1 uppercase tracking-widest font-semibold bg-primary/30 text-primary-foreground border border-primary-foreground/30">
                Academic Tutoring Center
              </Badge>
              <h1 className="text-5xl font-extrabold mb-5 leading-tight text-primary-foreground">
                Every student<br />
                <span className="text-primary">can thrive.</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
                BrightMinds Tutoring connects students with expert tutors who make learning click. Personalized sessions, proven methods, and real results.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="bg-primary text-primary-foreground px-7 rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-lg">
                  Book a Session
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground px-7 rounded-lg hover:scale-105 transition-all duration-300">
                  Meet Our Tutors
                </Button>
              </div>
            </div>
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <p className="text-sm text-muted-foreground mb-5 font-medium">What subject do you need help with?</p>
              <div className="grid grid-cols-2 gap-3">
                {subjects.map((s) => (
                  <div key={s.name} className="flex items-center gap-2 p-3 rounded-lg border border-border hover:border-primary hover:scale-105 transition-all duration-300 cursor-pointer text-sm font-medium text-card-foreground">
                    <span>{s.icon}</span>{s.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="border-border" />

      {/* TUTORING-SERVICES: local-services */}
      <section className="container mx-auto px-6 py-24 max-w-6xl">
        <div className="text-center mb-14 animate-fade-up">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Subjects We Cover</h2>
          <p className="text-muted-foreground text-lg">From middle school foundations to AP and college prep.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((s, i) => (
            <Card
              key={s.name}
              className="border border-border bg-card hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-semibold text-lg mb-2 text-primary">{s.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* TUTORING-TEAM: team-grid */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14 animate-fade-up">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Our Expert Tutors</h2>
            <p className="text-muted-foreground text-lg">Credentialed educators who make every session count.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutors.map((t, i) => (
              <Card
                key={t.name}
                className="border border-border bg-card hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary text-primary-foreground font-bold text-lg shrink-0">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-card-foreground">{t.name}</h3>
                    <p className="text-sm text-primary">{t.role}</p>
                    <p className="text-xs text-muted-foreground mt-1">{t.degree}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TUTORING-STATS: impact-stats */}
      <section className="container mx-auto px-6 py-20 max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="p-6 rounded-xl bg-card border border-border hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <p className="text-4xl font-extrabold mb-2 text-primary">{s.value}</p>
              <p className="text-muted-foreground text-sm font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TUTORING-REVIEWS: review-stars */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <p className="text-5xl mb-4 text-primary animate-fade-in">★★★★★</p>
          <h2 className="text-3xl font-bold mb-2 text-foreground">4.9 Average Rating</h2>
          <p className="text-muted-foreground mb-10 text-lg">From 200+ students and their families</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.map((q, i) => (
              <Card
                key={i}
                className="border border-border bg-card hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardContent className="p-5 text-sm text-muted-foreground italic">&quot;{q}&quot;</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TUTORING-PRICING: pricing-tiers */}
      <section className="container mx-auto px-6 py-24 max-w-5xl">
        <div className="text-center mb-14 animate-fade-up">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Straightforward Pricing</h2>
          <p className="text-muted-foreground text-lg">No contracts. Cancel anytime.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {pricing.map((p, i) => (
            <Card
              key={p.name}
              className={`border-2 border-border bg-card hover:shadow-lg transition-all duration-300 animate-fade-up ${p.highlight ? "scale-105 border-primary shadow-xl" : ""}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardHeader className="pb-2">
                {p.highlight && (
                  <Badge className="w-fit mb-2 text-xs bg-primary text-primary-foreground">Most Popular</Badge>
                )}
                <CardTitle className="text-xl text-card-foreground">{p.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold mb-3 text-primary">{p.price}</p>
                <p className="text-muted-foreground text-sm mb-6">{p.desc}</p>
                <Button className="w-full rounded-lg bg-primary text-primary-foreground hover:scale-105 transition-all duration-300">
                  Choose Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* TUTORING-BOOKING: booking-cta */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-4 text-primary-foreground">Start Your First Session</h2>
          <p className="text-primary-foreground/80 text-lg mb-8">Free 30-minute consultation for new students. No commitment required.</p>
          <Button size="lg" className="bg-background text-foreground px-10 py-4 text-lg font-semibold rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-lg">
            Book Free Consultation
          </Button>
        </div>
      </section>

      {/* TUTORING-FOOTER: footer-local */}
      <footer className="py-12 border-t border-border bg-foreground text-background">
        <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3 text-background">BrightMinds Tutoring</h3>
            <p className="text-sm leading-relaxed text-background/70">Helping students reach their full academic potential since 2018.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-background">Hours</h4>
            <p className="text-sm text-background/70">Mon–Thu: 9am – 9pm</p>
            <p className="text-sm text-background/70">Fri–Sat: 9am – 7pm</p>
            <p className="text-sm text-background/70">Sun: 11am – 5pm</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-background">Contact</h4>
            <p className="text-sm text-background/70">456 Learning Ave, Suite 101</p>
            <p className="text-sm text-background/70">(555) 876-5432</p>
            <p className="text-sm text-background/70">info@brightminds.com</p>
          </div>
        </div>
        <div className="container mx-auto px-6 max-w-6xl mt-8 pt-6 border-t border-background/20 text-center text-xs text-background/50">
          © 2026 BrightMinds Tutoring. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
