"use client";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: property-management
// sections: agency-hero, agency-services, tech-stats, steps-timeline, pricing-tiers, testimonial-cards, footer-minimal
// ─────────────────────────────────────────────────────────────────────

const services = [
  { name: "Tenant Screening", desc: "Comprehensive background checks, credit reports, and rental history verification.", icon: "🔍" },
  { name: "Rent Collection", desc: "Automated online rent collection with same-day ACH transfers to your account.", icon: "💳" },
  { name: "Maintenance Coordination", desc: "24/7 maintenance requests handled by our vetted contractor network.", icon: "🔧" },
  { name: "Financial Reporting", desc: "Monthly statements, annual reports, and real-time dashboard access.", icon: "📊" },
  { name: "Lease Management", desc: "Legally compliant lease creation, renewals, and enforcement.", icon: "📋" },
  { name: "Vacancy Marketing", desc: "Professional photos, listings on 50+ platforms, and rapid tenant placement.", icon: "📣" },
];

const stats = [
  { value: "1,200+", label: "Units Under Management" },
  { value: "98%", label: "Occupancy Rate" },
  { value: "12 Yrs", label: "Industry Experience" },
  { value: "4.9★", label: "Owner Satisfaction" },
];

const steps = [
  { num: "01", title: "Free Property Audit", desc: "We assess your property's market rate, condition, and potential — at no cost." },
  { num: "02", title: "Onboarding & Setup", desc: "We handle all paperwork, tenant transitions, and platform setup within 5 days." },
  { num: "03", title: "Active Management", desc: "We handle every detail — rent, maintenance, compliance, and communication." },
  { num: "04", title: "Monthly Reporting", desc: "You receive transparent statements and can check your dashboard anytime." },
];

const pricing = [
  { name: "Basic", rate: "8%", desc: "Rent collection, maintenance coordination, monthly statements", highlight: false },
  { name: "Standard", rate: "10%", desc: "Everything in Basic + tenant placement, lease management, 24/7 support", highlight: true },
  { name: "Premium", rate: "12%", desc: "Everything in Standard + dedicated manager, annual property review, legal coverage", highlight: false },
];

const testimonials = [
  { name: "Sandra K.", role: "8-unit multi-family owner", quote: "Keystone took my portfolio from 85% to 99% occupancy in 90 days. Their tenant screening alone is worth the fee." },
  { name: "David P.", role: "Out-of-state investor, 3 properties", quote: "I haven't had to think about my properties in two years. The monthly reports are clear and the team is incredibly responsive." },
  { name: "Marcia T.", role: "Single-family landlord", quote: "I switched from self-managing and immediately reclaimed my weekends. Keystone handles everything professionally and ethically." },
];

export default function PropertyManagementTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* PROPERTY-MANAGEMENT-HERO: agency-hero — full-bleed image */}
      <section className="relative overflow-hidden min-h-[600px] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1920&q=80"
          alt="Property management hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-28 max-w-5xl text-center animate-fade-in">
          <Badge className="mb-6 text-xs px-4 py-1 uppercase tracking-widest bg-primary/30 text-primary-foreground border border-primary-foreground/30">
            Professional Property Management
          </Badge>
          <h1 className="text-6xl font-bold mb-6 leading-tight text-primary-foreground">
            Stress-free<br />
            <span className="text-primary">property ownership.</span>
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Keystone Management handles every aspect of your rental property — so you collect the income without the headaches. 1,200+ units managed. 98% occupancy guaranteed.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground px-8 py-3 text-base font-semibold hover:scale-105 transition-all duration-300 hover:shadow-lg">
              Get a Free Audit
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground px-8 py-3 text-base hover:scale-105 transition-all duration-300">
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      <Separator className="border-border" />

      {/* PROPERTY-MANAGEMENT-SERVICES: agency-services */}
      <section className="container mx-auto px-6 py-24 max-w-6xl">
        <div className="text-center mb-14 animate-fade-up">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Everything Handled For You</h2>
          <p className="text-muted-foreground text-lg">Full-service property management under one roof.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
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

      {/* PROPERTY-MANAGEMENT-STATS: tech-stats */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6 max-w-5xl">
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
        </div>
      </section>

      {/* PROPERTY-MANAGEMENT-PROCESS: steps-timeline */}
      <section className="container mx-auto px-6 py-24 max-w-5xl">
        <div className="text-center mb-14 animate-fade-up">
          <h2 className="text-4xl font-bold mb-4 text-foreground">How It Works</h2>
          <p className="text-muted-foreground text-lg">We&apos;re managing your property within days, not weeks.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="flex gap-5 animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="text-4xl font-extrabold opacity-20 leading-none shrink-0 text-primary">{s.num}</span>
              <div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROPERTY-MANAGEMENT-PRICING: pricing-tiers */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-14 animate-fade-up">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Simple, Transparent Fees</h2>
            <p className="text-muted-foreground text-lg">A percentage of collected rent — no hidden charges, ever.</p>
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
                  <p className="text-5xl font-extrabold mb-1 text-primary">{p.rate}</p>
                  <p className="text-muted-foreground text-xs mb-4">of monthly collected rent</p>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{p.desc}</p>
                  <Button className={`w-full ${p.highlight ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"} hover:scale-105 transition-all duration-300`}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PROPERTY-MANAGEMENT-TESTIMONIALS: testimonial-cards */}
      <section className="container mx-auto px-6 py-24 max-w-6xl">
        <h2 className="text-4xl font-bold mb-14 text-center text-foreground animate-fade-up">What Property Owners Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card
              key={t.name}
              className="border border-border bg-card hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardContent className="p-8">
                <p className="text-primary text-lg mb-4">★★★★★</p>
                <p className="text-muted-foreground italic text-sm leading-relaxed mb-6">&quot;{t.quote}&quot;</p>
                <p className="font-semibold text-sm text-primary">{t.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{t.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* PROPERTY-MANAGEMENT-FOOTER: footer-minimal */}
      <footer className="py-10 border-t border-border">
        <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground">
          <p className="font-bold text-lg text-primary">Keystone Management</p>
          <p className="text-sm">© 2026 Keystone Management. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
