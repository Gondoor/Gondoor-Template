"use client";


import { Accordion,AccordionContent,AccordionItem,AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: mobile-app
// sections: app-hero, saas-features, tech-stats, testimonial-cards, download-cta, faq-accordion, footer-minimal
// theme: globals.css CSS variables
// hero-image: https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1920&q=80
// ─────────────────────────────────────────────────────────────────────

const features = [
  { title: "Smart Scheduling", desc: "AI-powered calendar that learns your habits and blocks focus time automatically." },
  { title: "Task Intelligence", desc: "Break down big goals into daily actions with priority scoring and deadline awareness." },
  { title: "Habit Tracking", desc: "Build streaks, visualize progress, and get gentle nudges when you drift off track." },
  { title: "Cross-Device Sync", desc: "Everything stays in sync across iPhone, iPad, Mac, and Android — instantly." },
  { title: "50+ Integrations", desc: "Connect with Google Calendar, Notion, Todoist, Slack, and all your favourite tools." },
];

const testimonials = [
  { name: "Aisha Patel", role: "Freelance Designer", quote: "I used to lose hours every week to task switching. Ordo changed that completely. I'm 40% more productive." },
  { name: "James Kowalski", role: "Startup Founder", quote: "The AI scheduling feature alone is worth it. My mornings are actually calm now." },
  { name: "Rachel Tan", role: "Product Manager at Stripe", quote: "Best productivity app I've ever used. The habit tracking keeps me accountable without feeling oppressive." },
];

const stats = [
  ["2M+", "Active users"],
  ["4.9★", "App Store rating"],
  ["50+", "Integrations"],
  ["#1", "Productivity category"],
];

const faqs = [
  { q: "Is there a free plan?", a: "Yes — our free plan includes unlimited tasks, habits, and 7-day calendar view with no time limit." },
  { q: "Which platforms are supported?", a: "Ordo is available on iOS, Android, macOS, and as a web app. All sync in real time." },
  { q: "Can I import from other apps?", a: "We support one-click imports from Todoist, Notion, Apple Reminders, Google Tasks, and Asana." },
  { q: "Is my data private?", a: "Your data is encrypted at rest and in transit. We never sell your data. You can export or delete it at any time." },
];

export default function MobileAppTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO: app-hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1920&q=80"
          alt="Hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-24">
          <Badge className="mb-4 animate-fade-in bg-primary text-primary-foreground">4.9★ on App Store &amp; Google Play</Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-background mb-6 animate-fade-up [animation-delay:100ms]">
            Your life,<br />organized.
          </h1>
          <p className="text-xl text-background/80 mb-8 max-w-2xl animate-fade-up [animation-delay:200ms]">
            The productivity app trusted by 2 million people. Smarter scheduling, effortless habits, and deep focus — all in one place.
          </p>
          <div className="flex gap-4 animate-fade-up [animation-delay:300ms]">
            <Button size="lg" className="bg-primary text-primary-foreground hover:scale-105 transition-all duration-300">
              Download free
            </Button>
            <Button size="lg" variant="outline" className="border-background text-background hover:bg-background hover:text-foreground transition-all duration-300">
              See how it works
            </Button>
          </div>
        </div>
      </section>

      {/* FEATURES: saas-features */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 animate-fade-up">Built for how you actually work</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Every feature is designed to reduce friction so you can focus on what matters.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Card
              key={f.title}
              className="bg-card text-card-foreground border-border rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardHeader className="pb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-lg text-primary">✦</span>
                </div>
                <CardTitle className="text-lg font-semibold">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm leading-relaxed">{f.desc}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* STATS: tech-stats */}
      <section className="border-y border-border bg-muted py-16">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(([val, label]) => (
            <div key={label} className="animate-fade-up">
              <p className="text-4xl font-bold mb-1 text-primary">{val}</p>
              <p className="text-muted-foreground text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS: testimonial-cards */}
      <section className="container mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-16 animate-fade-up">Loved by millions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card
              key={t.name}
              className="bg-card text-card-foreground border-border rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardContent className="pt-6">
                <div className="flex gap-0.5 mb-4">
                  {Array(5).fill(0).map((_, j) => <span key={j} className="text-primary text-sm">★</span>)}
                </div>
                <p className="text-sm leading-relaxed mb-6">&quot;{t.quote}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* DOWNLOAD CTA: download-cta */}
      <section className="bg-primary py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 animate-fade-up">Get started for free</h2>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-md mx-auto">
            Available on every device. Syncs everywhere. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up [animation-delay:100ms]">
            <Button size="lg" className="bg-background text-foreground hover:bg-background/90 hover:scale-105 transition-all duration-300 px-8">
              Download on App Store
            </Button>
            <Button size="lg" variant="outline" className="border-background text-background hover:bg-background hover:text-foreground hover:scale-105 transition-all duration-300 px-8">
              Get it on Google Play
            </Button>
          </div>
          <p className="text-primary-foreground/70 text-sm mt-6">Free forever plan available. Premium from $4.99/mo.</p>
        </div>
      </section>

      {/* FAQ: faq-accordion */}
      <section className="container mx-auto px-6 py-16 max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up">Frequently asked questions</h2>
        <Accordion multiple={false} className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-xl px-4 bg-card">
              <AccordionTrigger className="text-sm font-medium text-left hover:no-underline py-4">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm pb-4">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* FOOTER: footer-minimal */}
      <footer className="border-t border-border py-10 px-6 bg-muted">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-bold text-lg text-primary">Ordo</span>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-all duration-300">Privacy</a>
            <a href="#" className="hover:text-foreground transition-all duration-300">Terms</a>
            <a href="#" className="hover:text-foreground transition-all duration-300">Support</a>
            <a href="#" className="hover:text-foreground transition-all duration-300">Blog</a>
          </div>
          <p className="text-muted-foreground text-xs">© 2026 Ordo, Inc. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
