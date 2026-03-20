"use client";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: coaching
// sections: editorial-hero, agency-services, steps-timeline, testimonial-cards, pricing-packages, booking-cta, faq-accordion, footer-minimal
// ─────────────────────────────────────────────────────────────────────

const services = [
  { name: "1:1 Coaching", desc: "Private sessions tailored entirely to your goals, pace, and growth edges." },
  { name: "Career Transition", desc: "Structured support for professionals navigating pivotal career moments." },
  { name: "Leadership Development", desc: "Build the habits, presence, and strategic thinking that define great leaders." },
  { name: "Executive Presence", desc: "Master communication, gravitas, and influence at the highest levels." },
  { name: "Goal Architecture", desc: "Design a clear, actionable roadmap from where you are to where you want to be." },
  { name: "Mindset Mastery", desc: "Identify and dismantle the limiting beliefs holding you back from greatness." },
];

const steps = [
  { num: "01", title: "Discovery Call", desc: "A complimentary 45-minute conversation to explore your goals and determine if we're the right fit." },
  { num: "02", title: "Deep Assessment", desc: "A comprehensive values, strengths, and shadow audit that becomes the foundation of your program." },
  { num: "03", title: "12-Week Program", desc: "Weekly 1:1 sessions, between-session accountability, curated resources, and real-time support." },
  { num: "04", title: "Integration", desc: "We anchor the shifts, build sustainable systems, and design your ongoing growth framework." },
];

const testimonials = [
  { name: "Catherine M.", role: "VP of Operations, Fortune 500", quote: "Working with James was the single best investment I've made in my career. Within six months I was promoted to a role I'd been chasing for three years." },
  { name: "Thomas R.", role: "Founder, Series A Startup", quote: "The Transformation package completely changed how I lead. My team engagement scores went from 62% to 91%. The ROI is incalculable." },
  { name: "Linda T.", role: "Partner, Global Law Firm", quote: "James helped me find the clarity and confidence I didn't know I was missing. I negotiate, present, and lead from a completely different place now." },
];

const packages = [
  { name: "Clarity", price: "$2,500", duration: "4 weeks", desc: "4 private sessions + discovery assessment. For professionals seeking focused direction.", highlight: false },
  { name: "Transformation", price: "$5,500", duration: "12 weeks", desc: "12 sessions + full assessment + email support. The complete career & leadership program.", highlight: true },
  { name: "Elite", price: "$12,000", duration: "6 months", desc: "Unlimited sessions + board prep + speaking coaching + direct access. For C-suite executives.", highlight: false },
];

const faqs = [
  { q: "How is coaching different from therapy?", a: "Coaching is future-focused and performance-oriented. We work on where you're going, not processing the past. For deeper psychological work, therapy is the right tool." },
  { q: "Do you work with clients remotely?", a: "Yes. All sessions are conducted via Zoom. Clients across 18 countries have completed James's programs." },
  { q: "How quickly will I see results?", a: "Most clients report meaningful shifts in clarity and confidence within the first 2–3 sessions. Structural career and leadership change typically unfolds over 8–12 weeks." },
  { q: "Is the investment tax-deductible?", a: "In many jurisdictions, professional development coaching is deductible as a business expense. Consult your accountant for guidance specific to your situation." },
];

export default function CoachingTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* COACHING-HERO: editorial-hero — full-bleed image */}
      <section className="relative overflow-hidden min-h-[620px] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1560252829-1fa0a8a3ff72?auto=format&fit=crop&w=1920&q=80"
          alt="Coaching hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-28 max-w-4xl animate-fade-in">
          <Badge className="mb-8 text-xs px-4 py-1 uppercase tracking-widest bg-primary/30 text-primary-foreground border border-primary-foreground/30">
            Executive Life Coach
          </Badge>
          <h1 className="text-6xl font-bold mb-8 leading-tight text-primary-foreground">
            Lead the life<br />
            <span className="text-primary">you were built for.</span>
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mb-10 leading-relaxed">
            James Whitfield has coached Fortune 500 executives, founders, and professionals who refuse to settle. His approach is direct, evidence-based, and built around your specific life.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-primary text-primary-foreground px-8 py-4 text-base hover:scale-105 transition-all duration-300 hover:shadow-lg">
              Book a Discovery Call
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground px-8 py-4 text-base hover:scale-105 transition-all duration-300">
              View Packages
            </Button>
          </div>
          <p className="mt-6 text-primary-foreground/60 text-sm">Discovery calls are complimentary and carry zero obligation.</p>
        </div>
      </section>

      <Separator className="border-border" />

      {/* COACHING-SERVICES: agency-services */}
      <section className="container mx-auto px-6 py-24 max-w-6xl">
        <div className="text-center mb-14 animate-fade-up">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Areas of Engagement</h2>
          <p className="text-muted-foreground text-lg">Six domains where James delivers transformational results.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s.name}
              className="p-6 border-l-4 border-primary bg-card hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-up rounded-r-lg"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <h3 className="font-semibold text-lg mb-2 text-primary">{s.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COACHING-PROCESS: steps-timeline */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-14 animate-fade-up">
            <h2 className="text-4xl font-bold mb-4 text-foreground">The Process</h2>
            <p className="text-muted-foreground text-lg">Four phases, engineered for lasting change.</p>
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
        </div>
      </section>

      {/* COACHING-TESTIMONIALS: testimonial-cards */}
      <section className="container mx-auto px-6 py-24 max-w-6xl">
        <h2 className="text-4xl font-bold mb-14 text-center text-foreground animate-fade-up">Client Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card
              key={t.name}
              className="border border-border bg-card shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardContent className="p-8">
                <p className="text-card-foreground leading-relaxed italic mb-6 text-base">&quot;{t.quote}&quot;</p>
                <Separator className="mb-5 border-border" />
                <p className="font-semibold text-sm text-primary">{t.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{t.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* COACHING-PACKAGES: pricing-packages */}
      <section className="py-24 bg-foreground">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-14 animate-fade-up">
            <h2 className="text-4xl font-bold mb-4 text-background">Coaching Packages</h2>
            <p className="text-background/60 text-lg">An investment in yourself. Choose the depth of engagement that matches your ambition.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {packages.map((p, i) => (
              <Card
                key={p.name}
                className={`border bg-card hover:shadow-lg transition-all duration-300 animate-fade-up ${p.highlight ? "scale-105 border-primary shadow-2xl" : "border-border"}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardHeader className="pb-2">
                  {p.highlight && (
                    <Badge className="w-fit mb-2 text-xs bg-primary text-primary-foreground">Most Selected</Badge>
                  )}
                  <CardTitle className="text-xl text-card-foreground">{p.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">{p.duration}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold mb-3 text-primary">{p.price}</p>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{p.desc}</p>
                  <Button className={`w-full ${p.highlight ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"} hover:scale-105 transition-all duration-300`}>
                    Apply for {p.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* COACHING-BOOKING: booking-cta */}
      <section className="container mx-auto px-6 py-24 max-w-2xl text-center">
        <h2 className="text-4xl font-bold mb-4 text-foreground animate-fade-up">Begin with a Conversation</h2>
        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">Book your complimentary 45-minute discovery call. No pitch, no pressure — just an honest conversation about where you are and where you want to go.</p>
        <Button size="lg" className="bg-primary text-primary-foreground px-10 py-4 text-base hover:scale-105 transition-all duration-300 hover:shadow-lg">
          Schedule Discovery Call
        </Button>
      </section>

      {/* COACHING-FAQ: faq-accordion */}
      <section className="py-24 border-t border-border bg-muted">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl font-bold mb-14 text-center text-foreground animate-fade-up">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div
                key={i}
                className="border-b border-border pb-6 animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <h3 className="font-bold text-base mb-2 text-primary">{f.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COACHING-FOOTER: footer-minimal */}
      <footer className="py-10 border-t border-border">
        <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground">
          <p className="font-bold text-lg text-foreground">James Whitfield Coaching</p>
          <p className="text-sm">© 2026 All rights reserved.</p>
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
