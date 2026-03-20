"use client";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: online-course
// sections: editorial-hero, course-curriculum, testimonial-cards, pricing-tiers, faq-accordion, glow-cta, footer-minimal
// ─────────────────────────────────────────────────────────────────────

const modules = [
  { num: "01", title: "HTML & CSS Fundamentals", lessons: 6, topics: ["Semantic HTML5", "Flexbox & Grid", "Responsive design", "CSS variables", "Accessibility basics", "Forms & validation"] },
  { num: "02", title: "JavaScript Deep Dive", lessons: 8, topics: ["ES2024+ syntax", "Async/await", "DOM manipulation", "Closures & scope", "Modules & bundling", "Error handling", "TypeScript intro", "Testing with Jest"] },
  { num: "03", title: "React & Next.js", lessons: 7, topics: ["React 19 fundamentals", "Server components", "App Router", "Data fetching", "State management", "Performance optimization", "Deployment"] },
  { num: "04", title: "Backend & APIs", lessons: 6, topics: ["Node.js & Express", "REST & GraphQL", "Database design", "Authentication", "File uploads", "Rate limiting"] },
  { num: "05", title: "Deployment & DevOps", lessons: 5, topics: ["CI/CD pipelines", "Vercel & AWS", "Docker basics", "Monitoring & logs", "Performance audits"] },
];

const testimonials = [
  { name: "Marcus T.", role: "Now a Frontend Engineer at Stripe", quote: "This course gave me everything I needed to land my first job in tech. The curriculum is incredibly well structured and practical." },
  { name: "Aisha K.", role: "Freelance Developer — $95/hr", quote: "I went from knowing nothing about coding to building client projects in 3 months. The mentorship track is worth every penny." },
  { name: "Derek L.", role: "Built & launched his own SaaS", quote: "The DevOps module alone saved me weeks of trial and error. Real-world content, no fluff." },
];

const pricing = [
  { name: "Self-Paced", price: "$497", desc: "Lifetime access, all 5 modules, community forum", highlight: false },
  { name: "Mentored", price: "$997", desc: "Everything in Self-Paced + weekly 1:1 mentor calls", highlight: true },
  { name: "Bootcamp", price: "$1,997", desc: "Full cohort experience, job guarantee, career coaching", highlight: false },
];

const faqs = [
  { q: "Do I need prior coding experience?", a: "No. We start from absolute zero in Module 1 and build up systematically. Thousands of complete beginners have graduated." },
  { q: "How long does the course take?", a: "Self-paced students typically finish in 8–16 weeks. The Bootcamp cohort runs on a structured 12-week schedule." },
  { q: "Is there a refund policy?", a: "Yes — a full 30-day money-back guarantee, no questions asked. We're confident you'll love it." },
  { q: "Will I get a certificate?", a: "Yes. You'll receive a verifiable certificate of completion that you can share on LinkedIn and your portfolio." },
  { q: "What if I get stuck?", a: "Every tier includes access to our active Discord community. Mentored and Bootcamp students also get direct mentor access." },
];

export default function OnlineCourseTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ONLINE-COURSE-HERO: editorial-hero — full-bleed image */}
      <section className="relative overflow-hidden min-h-[620px] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1501504905252-473c47ee57b1?auto=format&fit=crop&w=1920&q=80"
          alt="Online course hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-28 max-w-5xl text-center animate-fade-in">
          <Badge className="mb-6 text-xs px-4 py-1 uppercase tracking-widest bg-primary/30 text-primary-foreground border border-primary-foreground/30">
            New Cohort — April 2026
          </Badge>
          <h1 className="text-6xl font-extrabold mb-6 leading-tight tracking-tight text-primary-foreground">
            Mastering Modern<br />
            <span className="text-primary">Web Development</span>
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Go from beginner to job-ready in 12 weeks. 5 modules, 32 hands-on lessons, real projects, and a career-focused curriculum built for 2026.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-base hover:scale-105 transition-all duration-300 hover:shadow-lg">
              Enroll Now
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3 rounded-lg text-base border-primary-foreground text-primary-foreground hover:scale-105 transition-all duration-300">
              Watch Preview
            </Button>
          </div>
          <p className="mt-6 text-primary-foreground/60 text-sm">Join 4,200+ students who have already transformed their careers.</p>
        </div>
      </section>

      <Separator className="border-border" />

      {/* ONLINE-COURSE-CURRICULUM: course-curriculum */}
      <section className="container mx-auto px-6 py-24 max-w-4xl">
        <div className="text-center mb-14 animate-fade-up">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Course Curriculum</h2>
          <p className="text-muted-foreground text-lg">5 modules · 32 lessons · 40+ hours of content</p>
        </div>
        <div className="space-y-4">
          {modules.map((m, i) => (
            <Card
              key={m.num}
              className="border border-border bg-card hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-extrabold opacity-30 text-primary">{m.num}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-card-foreground">{m.title}</h3>
                      <Badge variant="secondary" className="text-xs">{m.lessons} lessons</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {m.topics.map((topic) => (
                        <span key={topic} className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">{topic}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ONLINE-COURSE-TESTIMONIALS: testimonial-cards */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-4xl font-bold mb-14 text-center text-foreground animate-fade-up">Student Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Card
                key={t.name}
                className="border border-border bg-card hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardContent className="p-6">
                  <p className="text-primary text-lg mb-4">★★★★★</p>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed italic">&quot;{t.quote}&quot;</p>
                  <div>
                    <p className="font-semibold text-sm text-card-foreground">{t.name}</p>
                    <p className="text-xs text-primary mt-1">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ONLINE-COURSE-PRICING: pricing-tiers */}
      <section className="container mx-auto px-6 py-24 max-w-5xl">
        <div className="text-center mb-14 animate-fade-up">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Choose Your Path</h2>
          <p className="text-muted-foreground text-lg">One-time payment. Lifetime access.</p>
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
                  <Badge className="w-fit mb-2 text-xs bg-primary text-primary-foreground font-semibold">Best Value</Badge>
                )}
                <CardTitle className="text-xl text-card-foreground">{p.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-extrabold mb-3 text-primary">{p.price}</p>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{p.desc}</p>
                <Button className={`w-full font-semibold ${p.highlight ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"} hover:scale-105 transition-all duration-300`}>
                  Enroll in {p.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ONLINE-COURSE-FAQ: faq-accordion */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl font-bold mb-14 text-center text-foreground animate-fade-up">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <Card
                key={i}
                className="border border-border bg-card hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-base text-primary">{f.q}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ONLINE-COURSE-CTA: glow-cta */}
      <section className="container mx-auto px-6 py-28 text-center max-w-3xl">
        <div className="rounded-2xl p-12 border border-primary/30 bg-primary/10 animate-fade-up">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Your developer career starts today.</h2>
          <p className="text-muted-foreground mb-8 text-lg">30-day money-back guarantee. No risk. All reward.</p>
          <Button size="lg" className="px-10 py-4 bg-primary text-primary-foreground text-lg font-bold rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-lg">
            Start Learning Now →
          </Button>
        </div>
      </section>

      {/* ONLINE-COURSE-FOOTER: footer-minimal */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-bold text-lg text-primary">Mastering Modern Web Dev</p>
          <p className="text-muted-foreground text-sm">© 2026 All rights reserved.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
