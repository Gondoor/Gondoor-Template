"use client";


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: tech-company
// sections: agency-hero, logo-marquee, saas-features, tech-stats, team-grid, testimonial-cards, glow-cta, footer-minimal
// theme: globals.css CSS variables
// hero-image: https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80
// ─────────────────────────────────────────────────────────────────────

const features = [
  { title: "Cloud Infrastructure", desc: "Scalable, resilient cloud architecture designed for enterprise workloads and peak demand." },
  { title: "Data Engineering", desc: "End-to-end data pipelines, warehousing, and real-time analytics for decision-makers." },
  { title: "AI & Machine Learning", desc: "Custom ML models, NLP solutions, and AI integrations tuned to your business data." },
  { title: "Cybersecurity", desc: "Threat detection, zero-trust architecture, compliance auditing, and 24/7 SOC monitoring." },
  { title: "API Development", desc: "High-performance REST and GraphQL APIs built to handle millions of requests per day." },
  { title: "Digital Transformation", desc: "End-to-end modernisation of legacy systems, processes, and customer experiences." },
];

const logos = ["Microsoft", "AWS", "Salesforce", "Oracle", "SAP", "Google", "IBM", "Cisco"];

const team = [
  { name: "Dr. Lena Fischer", role: "Chief Executive Officer", bio: "20 years leading enterprise tech at Fortune 500 companies. PhD in Computer Science, MIT." },
  { name: "David Okafor", role: "Chief Technology Officer", bio: "Ex-Google SRE. Designed infrastructure serving 500M+ users. Open source contributor." },
  { name: "Amara Singh", role: "VP of Engineering", bio: "Previously at Stripe and Cloudflare. Passionate about distributed systems and developer experience." },
  { name: "Marco Bianchi", role: "Head of AI Research", bio: "Published researcher in NLP and computer vision. Built production ML systems at scale." },
];

const testimonials = [
  { name: "Claire Hoffman", role: "CIO, Meridian Group", quote: "Nexus modernised our entire data stack in six months. The ROI was evident within the first quarter." },
  { name: "Richard Yau", role: "VP Tech, Colossus Finance", quote: "Their security team is best-in-class. We passed our SOC 2 audit without a single major finding." },
  { name: "Sandra Mwiti", role: "CDO, Orbis Retail", quote: "The AI models they built for demand forecasting cut our overstock by 31%. Exceptional work." },
];

const stats = [
  ["150+", "Enterprise clients"],
  ["99.99%", "Infrastructure uptime"],
  ["$2B+", "Revenue influenced"],
  ["8", "Global offices"],
];

export default function TechCompanyTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO: agency-hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
          alt="Hero"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-24">
          <Badge className="mb-4 animate-fade-in bg-primary text-primary-foreground">Enterprise Technology Partner</Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-background mb-6 animate-fade-up [animation-delay:100ms]">
            Technology that<br />moves business<br />forward.
          </h1>
          <p className="text-xl text-background/80 mb-8 max-w-2xl animate-fade-up [animation-delay:200ms]">
            Nexus partners with enterprise organisations to architect, build, and scale technology that delivers competitive advantage.
          </p>
          <div className="flex gap-4 animate-fade-up [animation-delay:300ms]">
            <Button size="lg" className="bg-primary text-primary-foreground hover:scale-105 transition-all duration-300">
              Talk to our team
            </Button>
            <Button size="lg" variant="outline" className="border-background text-background hover:bg-background hover:text-foreground transition-all duration-300">
              View case studies
            </Button>
          </div>
        </div>
      </section>

      {/* LOGO MARQUEE: logo-marquee */}
      <section className="py-12 border-y border-border bg-muted">
        <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-widest">Technology partnerships</p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 px-6">
          {logos.map((logo) => (
            <span key={logo} className="text-muted-foreground font-semibold text-lg hover:text-foreground transition-all duration-300">{logo}</span>
          ))}
        </div>
      </section>

      {/* FEATURES: saas-features */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 animate-fade-up">Our core capabilities</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            From infrastructure to AI — deep expertise across the full technology stack.
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

      {/* TEAM GRID: team-grid */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 animate-fade-up">Leadership team</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Decades of combined experience in enterprise technology and digital transformation.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <Card
              key={member.name}
              className="bg-card text-card-foreground border-border rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">{member.name[0]}</span>
                </div>
                <h3 className="font-semibold text-base mb-1">{member.name}</h3>
                <p className="text-primary text-xs font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS: testimonial-cards */}
      <section className="bg-muted py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 animate-fade-up">Client outcomes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Card
                key={t.name}
                className="bg-card text-card-foreground border-border rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardContent className="pt-6">
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
        </div>
      </section>

      {/* CTA: glow-cta */}
      <section className="container mx-auto px-6 py-24">
        <div className="bg-primary rounded-3xl p-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 animate-fade-up">
            Ready to accelerate your roadmap?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-md mx-auto">
            Let&apos;s scope your next initiative together. Our team is ready to listen.
          </p>
          <Button size="lg" className="bg-background text-foreground hover:bg-background/90 hover:scale-105 transition-all duration-300 px-10">
            Schedule a discovery call
          </Button>
        </div>
      </section>

      {/* FOOTER: footer-minimal */}
      <footer className="border-t border-border py-10 px-6 bg-muted">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-bold text-lg text-primary">Nexus</span>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-all duration-300">Services</a>
            <a href="#" className="hover:text-foreground transition-all duration-300">Case Studies</a>
            <a href="#" className="hover:text-foreground transition-all duration-300">Careers</a>
            <a href="#" className="hover:text-foreground transition-all duration-300">Contact</a>
          </div>
          <p className="text-muted-foreground text-xs">© 2026 Nexus Technology Group. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
