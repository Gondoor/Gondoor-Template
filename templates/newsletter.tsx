"use client";

import { Accordion,AccordionContent,AccordionItem,AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: newsletter
// sections: editorial-hero, testimonial-cards, subscribe-cta, faq-accordion, footer-minimal
// ─────────────────────────────────────────────────────────────────────

const testimonials = [
  { name: "Rachel Torres", role: "Startup Founder", quote: "The Clarity Letter is the one newsletter I actually read every week. Dense, useful, no fluff." },
  { name: "James Okafor", role: "Senior Analyst, Blackridge", quote: "I've cancelled a dozen subscriptions this year. This isn't one of them. Worth every penny." },
  { name: "Mei-Lin Park", role: "Product Manager, Hive", quote: "It changed how I think about decision-making. I forward it to my entire team." },
];

const faqs = [
  { q: "How often is it published?", a: "Free subscribers get one edition every Tuesday. Premium members receive daily deep-dives Monday through Friday plus a Sunday synthesis edition." },
  { q: "Can I cancel my Premium subscription?", a: "Yes — cancel any time from your account settings. You'll retain Premium access through the end of your billing period with no questions asked." },
  { q: "Can I access past issues?", a: "Free members can access the last 4 issues. Premium members get the full archive going back to issue #1, fully searchable." },
  { q: "Is there a referral program?", a: "Yes! Refer 3 friends and get one month of Premium free. Refer 10 and get a full year. Your unique link is in every issue footer." },
];

const tiers = [
  { name: "Free", price: "Free", per: "", desc: "Weekly digest every Tuesday", features: ["1 edition/week", "Last 4 issues", "Community access"], highlighted: false },
  { name: "Premium", price: "$9", per: "/mo", desc: "For sharp minds who want more", features: ["Daily deep-dives (M–F)", "Sunday synthesis", "Full archive", "Member community", "Referral rewards"], highlighted: true },
];

export default function NewsletterTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO: editorial-hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1499750310107-5cbf2f089f74?auto=format&fit=crop&w=1920&q=80"
          alt="Newsletter hero"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-28 max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in">
            <div className="h-px flex-1 max-w-16 bg-primary-foreground/40" />
            <Badge className="px-3 py-1 text-xs uppercase tracking-widest rounded-full border border-primary-foreground/60 text-primary-foreground bg-transparent">
              Issue 214 · Every Tuesday
            </Badge>
            <div className="h-px flex-1 max-w-16 bg-primary-foreground/40" />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6 tracking-tight text-primary-foreground animate-fade-up [animation-delay:100ms]">
            The Clarity<br />Letter
          </h1>
          <p className="text-xl text-primary-foreground/80 mb-4 italic animate-fade-up [animation-delay:200ms]">
            The briefing for sharp minds.
          </p>
          <p className="text-primary-foreground/60 max-w-lg mx-auto mb-10 text-base leading-relaxed animate-fade-up [animation-delay:200ms]">
            Concise analysis on business, technology, and ideas that matter. 50,000+ readers trust it to cut through the noise every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up [animation-delay:300ms]">
            <Button size="lg" className="px-8 rounded-xl font-semibold bg-primary text-primary-foreground hover:scale-105 transition-all duration-300 hover:shadow-lg">
              Subscribe Free
            </Button>
            <Button size="lg" variant="outline" className="px-8 rounded-xl font-semibold border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 hover:scale-105 transition-all duration-300">
              Go Premium — $9/mo
            </Button>
          </div>
          <p className="text-xs text-primary-foreground/50 mt-4">No spam. Cancel Premium any time. Free forever.</p>
        </div>
      </section>

      <Separator className="bg-border" />

      {/* TESTIMONIALS: testimonial-cards */}
      <section className="container mx-auto px-6 py-24">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-12">What readers say</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <Card key={t.name} className="rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <p className="text-card-foreground text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold bg-primary text-primary-foreground">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* SUBSCRIBE: subscribe-cta with tiers */}
      <section className="py-20 bg-foreground">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-background mb-4">
            Join 50,000 sharp readers
          </h2>
          <p className="text-background/60 mb-12 text-lg">Choose the plan that fits your pace.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10">
            {tiers.map((tier) => (
              <Card key={tier.name} className={`rounded-2xl p-6 text-left ${tier.highlighted ? "border-primary border-2 bg-primary/10" : "border-border bg-card/10"}`}>
                <CardHeader className="p-0 mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <CardTitle className="text-background text-base font-bold">{tier.name}</CardTitle>
                    {tier.highlighted && <Badge className="text-xs rounded-full px-2 bg-primary text-primary-foreground">Popular</Badge>}
                  </div>
                  <div className="flex items-end gap-1">
                    <span className="text-3xl font-extrabold text-background">{tier.price}</span>
                    <span className="text-background/50 mb-1">{tier.per}</span>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="space-y-2 mb-6">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-background/70">
                        <span className="text-primary">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full rounded-xl font-semibold hover:scale-105 transition-all duration-300 hover:shadow-lg ${tier.highlighted ? "bg-primary text-primary-foreground" : "bg-background/20 text-background"}`}>
                    {tier.highlighted ? "Start Premium" : "Subscribe Free"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ: faq-accordion */}
      <section className="container mx-auto px-6 py-20 max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          Frequently asked questions
        </h2>
        <Accordion multiple={false} className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-xl px-5 bg-card">
              <AccordionTrigger className="text-sm font-semibold text-left hover:no-underline py-4 text-card-foreground">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm pb-4 leading-relaxed">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* FOOTER: footer-minimal */}
      <footer className="border-t border-border py-10 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-bold text-xl text-foreground">The Clarity Letter</span>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Archive</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Unsubscribe</a>
          </div>
          <p className="text-muted-foreground text-xs">© 2026 The Clarity Letter. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
