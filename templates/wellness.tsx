"use client";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: wellness
// sections: medical-hero, local-services, team-grid, review-stars, pricing-tiers, booking-cta, footer-local
// ─────────────────────────────────────────────────────────────────────

const services = [
  { name: "Massage Therapy", desc: "Deep tissue, Swedish & hot stone massage tailored to your needs.", icon: "🌿" },
  { name: "Acupuncture", desc: "Ancient needle therapy to restore balance and relieve pain.", icon: "✨" },
  { name: "Yoga Classes", desc: "Morning vinyasa, restorative yin, and private sessions available.", icon: "🧘" },
  { name: "Nutrition Coaching", desc: "Personalized meal plans and functional food guidance.", icon: "🥗" },
  { name: "Meditation", desc: "Guided mindfulness sessions for stress relief and clarity.", icon: "🌸" },
  { name: "Energy Healing", desc: "Reiki and chakra balancing to align your energetic body.", icon: "💫" },
];

const team = [
  { name: "Dr. Amara Osei", role: "Lead Acupuncturist & Herbalist", exp: "12 years" },
  { name: "Sofia Reyes", role: "Licensed Massage Therapist", exp: "8 years" },
  { name: "James Nakamura", role: "Certified Yoga Instructor", exp: "10 years" },
  { name: "Priya Mehta", role: "Nutrition & Wellness Coach", exp: "6 years" },
];

const pricing = [
  { name: "Single Session", price: "$85", desc: "One 60-min session of your choice", highlight: false },
  { name: "5-Pack", price: "$375", desc: "Five sessions, mix & match services", highlight: true },
  { name: "Monthly Membership", price: "$199", desc: "Unlimited group classes + 1 private/mo", highlight: false },
];

const reviews = [
  "Life-changing massage therapy. I sleep better than I have in years.",
  "The acupuncture sessions completely resolved my chronic back pain.",
  "Serenity is the best thing to happen to my mental health this decade.",
];

export default function WellnessTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* WELLNESS-HERO: medical-hero — full-bleed image */}
      <section className="relative overflow-hidden min-h-[600px] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1920&q=80"
          alt="Wellness hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-28 text-center max-w-4xl animate-fade-in">
          <Badge className="mb-6 text-sm px-4 py-1 bg-primary/20 text-primary-foreground border border-primary-foreground/30">
            Holistic Wellness Center
          </Badge>
          <h1 className="text-6xl font-bold mb-6 leading-tight text-primary-foreground">
            Nourish your body.<br />
            <span className="text-primary">Calm your mind.</span>
          </h1>
          <p className="text-xl mb-10 text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Serenity Wellness is your sanctuary for integrative healing. We blend ancient wisdom with modern science to restore balance, reduce stress, and elevate your wellbeing.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground px-8 py-3 rounded-full text-base hover:scale-105 transition-all duration-300 hover:shadow-lg">
              Book a Session
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground px-8 py-3 rounded-full text-base hover:scale-105 transition-all duration-300">
              Explore Services
            </Button>
          </div>
        </div>
      </section>

      <Separator className="border-border" />

      {/* WELLNESS-SERVICES: local-services */}
      <section className="container mx-auto px-6 py-24 max-w-6xl">
        <div className="text-center mb-14 animate-fade-up">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Our Healing Services</h2>
          <p className="text-muted-foreground text-lg">Six pathways to whole-body wellness, all under one roof.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Card
              key={s.name}
              className="border border-border bg-card hover:shadow-lg hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-primary">{s.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* WELLNESS-TEAM: team-grid */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14 animate-fade-up">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Meet Your Practitioners</h2>
            <p className="text-muted-foreground text-lg">Experienced, certified, and genuinely passionate about your health.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((t, i) => (
              <Card
                key={t.name}
                className="text-center border border-border bg-card hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold bg-primary text-primary-foreground">
                    {t.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <h3 className="font-semibold text-base mb-1 text-card-foreground">{t.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{t.role}</p>
                  <Badge variant="secondary" className="text-xs">{t.exp} experience</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WELLNESS-REVIEWS: review-stars */}
      <section className="container mx-auto px-6 py-20 text-center max-w-3xl">
        <div className="text-5xl mb-4 text-primary animate-fade-in">★★★★★</div>
        <p className="text-3xl font-bold mb-2 text-foreground">4.9 out of 5</p>
        <p className="text-muted-foreground text-lg mb-6">Based on 600+ verified reviews from our community</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      </section>

      {/* WELLNESS-PRICING: pricing-tiers */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-14 animate-fade-up">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground text-lg">Invest in your wellbeing — no hidden fees, ever.</p>
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
                  <Button className="w-full rounded-full bg-primary text-primary-foreground hover:scale-105 transition-all duration-300">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WELLNESS-BOOKING: booking-cta */}
      <section className="container mx-auto px-6 py-24 text-center max-w-2xl">
        <h2 className="text-4xl font-bold mb-4 text-foreground animate-fade-up">Ready to Begin Your Journey?</h2>
        <p className="text-muted-foreground text-lg mb-8">Book your first session online or call us at (555) 234-5678. New clients receive a complimentary 15-min consultation.</p>
        <Button size="lg" className="bg-primary text-primary-foreground px-10 py-4 rounded-full text-lg hover:scale-105 transition-all duration-300 hover:shadow-lg">
          Book Your Session Now
        </Button>
      </section>

      {/* WELLNESS-FOOTER: footer-local */}
      <footer className="py-12 border-t border-border bg-foreground text-background">
        <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-3 text-background">Serenity Wellness</h3>
            <p className="text-sm leading-relaxed text-background/70">Holistic healing for mind, body, and spirit. Located in the heart of the community.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-background">Hours</h4>
            <p className="text-sm text-background/70">Mon–Fri: 8am – 8pm</p>
            <p className="text-sm text-background/70">Sat: 9am – 6pm</p>
            <p className="text-sm text-background/70">Sun: 10am – 4pm</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-background">Contact</h4>
            <p className="text-sm text-background/70">123 Serenity Lane, Suite 200</p>
            <p className="text-sm text-background/70">(555) 234-5678</p>
            <p className="text-sm text-background/70">hello@serenitywellness.com</p>
          </div>
        </div>
        <div className="container mx-auto px-6 max-w-6xl mt-8 pt-6 border-t border-background/20 text-center text-xs text-background/50">
          © 2026 Serenity Wellness. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
