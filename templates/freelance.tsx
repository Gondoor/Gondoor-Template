"use client";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: freelance
// sections: agency-hero, portfolio-masonry, agency-services, steps-timeline, testimonial-cards, glow-cta, footer-minimal
// theme: globals.css CSS variables
// hero-image: https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80
// ─────────────────────────────────────────────────────────────────────

const PROJECTS = [
  { title: "Helios — SaaS Dashboard", stack: ["Next.js", "Supabase", "TypeScript"] },
  { title: "Fern — E-commerce Platform", stack: ["React", "Shopify API", "Stripe"] },
  { title: "Pulse — Analytics SDK", stack: ["Node.js", "PostgreSQL", "tRPC"] },
  { title: "Scout — Mobile App", stack: ["React Native", "Expo", "Firebase"] },
  { title: "Apex — Developer Tools CLI", stack: ["Rust", "CLI", "GitHub Actions"] },
  { title: "Bloom — Booking System", stack: ["Next.js", "Drizzle ORM", "Resend"] },
];

const SERVICES = [
  { name: "Web Apps", desc: "Full-stack applications from authentication to deployment, built for scale." },
  { name: "API Development", desc: "RESTful and GraphQL APIs with documentation, rate limiting, and monitoring." },
  { name: "UI Engineering", desc: "Pixel-perfect, accessible, performant component libraries and design systems." },
  { name: "Performance Audit", desc: "Core Web Vitals analysis and targeted optimisations that move the needle." },
  { name: "Code Review", desc: "Expert review of existing codebases — architecture, security, and maintainability." },
  { name: "Consulting", desc: "Technical strategy, stack selection, and hiring guidance for growing teams." },
];

const STEPS = [
  { n: "01", title: "Discovery", desc: "A 30-min call to understand your goals, constraints, and timeline." },
  { n: "02", title: "Design", desc: "Wireframes and architecture proposal, scoped and priced clearly." },
  { n: "03", title: "Build", desc: "Weekly check-ins, async updates, and a staging preview throughout." },
  { n: "04", title: "Launch", desc: "Deployment, handover docs, and 30-day post-launch support included." },
];

const TESTIMONIALS = [
  { name: "Alex Chen", company: "CTO, Helios", text: "Shipped our MVP in 6 weeks flat. Clean code, great communication, zero surprises." },
  { name: "Mia Johansson", company: "Founder, Fern", text: "Our Shopify rebuild was long overdue. Delivered beautifully and on time. Highly recommend." },
  { name: "Derek Park", company: "Eng Lead, Pulse", text: "The performance audit alone paid for itself 3x over. Found issues we&apos;d missed for months." },
];

export default function FreelanceTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* NAV */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-border bg-background">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md flex items-center justify-center bg-primary text-primary-foreground text-xs font-black">J</div>
          <span className="font-bold text-sm text-foreground">Jordan Blake</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Work</a>
          <a href="#" className="hover:text-foreground transition-colors">Services</a>
          <a href="#" className="hover:text-foreground transition-colors">Process</a>
        </div>
        <Button size="sm" className="bg-primary text-primary-foreground text-xs font-semibold hover:scale-105 transition-all duration-300">Hire Me</Button>
      </nav>

      {/* HERO: agency-hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80"
          alt="Hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-28">
          <div className="flex flex-wrap gap-2 mb-8 animate-fade-in">
            <Badge className="text-xs border-border text-muted-foreground" variant="outline">Full-Stack Developer</Badge>
            <Badge className="text-xs border-border text-muted-foreground" variant="outline">Available for projects</Badge>
            <Badge className="text-xs font-semibold bg-accent text-accent-foreground">Open to contracts</Badge>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-none mb-6 text-background animate-fade-up">
            I build products{" "}
            <span className="text-primary">people love.</span>
          </h1>
          <p className="text-lg text-background/80 max-w-xl mb-10 animate-fade-up [animation-delay:150ms]">
            Hi, I&apos;m Jordan — a full-stack developer with 8+ years building fast, accessible, production-grade web applications. Let&apos;s ship something great together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up [animation-delay:300ms]">
            <Button size="lg" className="bg-primary text-primary-foreground font-semibold px-10 hover:scale-105 transition-all duration-300">
              View My Work
            </Button>
            <Button size="lg" variant="outline" className="border-background text-background hover:bg-background/10 px-10 transition-all duration-300">
              Get in Touch
            </Button>
          </div>
        </div>
      </section>

      {/* PORTFOLIO MASONRY: portfolio-masonry */}
      <section className="py-20 px-6 border-t border-border bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-14 animate-fade-up">Selected Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROJECTS.map((p, i) => (
              <div
                key={p.title}
                className="rounded-xl overflow-hidden cursor-pointer group border border-border bg-muted hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="h-44 p-6 flex flex-col justify-end">
                  <p className="font-semibold text-foreground mb-2">{p.title}</p>
                  <div className="flex flex-wrap gap-1">
                    {p.stack.map((s) => (
                      <span key={s} className="text-xs text-muted-foreground bg-background/50 rounded px-2 py-0.5">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGENCY SERVICES: agency-services */}
      <section className="py-20 px-6 border-t border-border bg-muted">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-14 animate-fade-up">What I Do</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div
                key={s.name}
                className="p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-8 h-0.5 mb-4 bg-primary" />
                <h3 className="font-semibold mb-2 text-card-foreground">{s.name}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS TIMELINE: steps-timeline */}
      <section className="py-20 px-6 border-t border-border bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-14 animate-fade-up">How We&apos;ll Work Together</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((s, i) => (
              <div key={s.n} className="animate-fade-up" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="text-4xl font-black mb-3 text-primary">{s.n}</div>
                <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL CARDS: testimonial-cards */}
      <section className="py-20 px-6 border-t border-border bg-muted">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-14 animate-fade-up">Client Feedback</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                className="rounded-xl border border-border bg-card p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <p className="text-muted-foreground text-sm italic leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-semibold text-sm text-card-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GLOW CTA: glow-cta */}
      <section className="py-28 px-6 text-center relative overflow-hidden bg-background">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-96 h-96 rounded-full blur-3xl opacity-10 bg-primary" />
        </div>
        <div className="relative max-w-2xl mx-auto">
          <h2 className="text-5xl font-bold mb-4 animate-fade-up">
            Let&apos;s work together
          </h2>
          <p className="text-muted-foreground mb-8 animate-fade-up [animation-delay:100ms]">
            I&apos;m currently accepting new projects starting Q2 2026. Let&apos;s talk about yours.
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground font-semibold px-12 hover:scale-105 transition-all duration-300 animate-fade-up [animation-delay:200ms]">
            Let&apos;s Build Together
          </Button>
          <p className="text-xs text-muted-foreground mt-4 animate-fade-up [animation-delay:300ms]">Typical response within 24 hours</p>
        </div>
      </section>

      {/* FOOTER: footer-minimal */}
      <footer className="py-8 px-8 border-t border-border bg-background">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="font-bold text-foreground">Jordan Blake</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
            <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
          </div>
          <p>© 2026 Jordan Blake. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
