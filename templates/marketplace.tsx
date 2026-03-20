"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: marketplace
// sections: marketplace-hero, ecom-categories, ecom-cart-cta, how-it-works, tech-stats, glow-cta, footer-minimal
// ─────────────────────────────────────────────────────────────────────

const categories = [
  { name: "Graphic Design", icon: "🎨", count: "8,400+ freelancers" },
  { name: "Photography", icon: "📸", count: "4,200+ freelancers" },
  { name: "Video & Film", icon: "🎬", count: "3,100+ freelancers" },
  { name: "Writing & Copy", icon: "✍️", count: "6,900+ freelancers" },
  { name: "Music & Audio", icon: "🎵", count: "2,800+ freelancers" },
  { name: "Web Development", icon: "💻", count: "9,200+ freelancers" },
];

const featuredFreelancers = [
  { name: "Lena M.", skill: "Brand Identity Design", rate: "$85/hr", rating: "4.9", projects: 142 },
  { name: "Carlos R.", skill: "Full-Stack Development", rate: "$110/hr", rating: "5.0", projects: 98 },
  { name: "Aisha T.", skill: "UX Research & Strategy", rate: "$95/hr", rating: "4.8", projects: 67 },
  { name: "James K.", skill: "Motion Graphics", rate: "$75/hr", rating: "4.9", projects: 203 },
];

const steps = [
  { num: "1", title: "Post a Project", desc: "Describe your project, set your budget, and specify your timeline." },
  { num: "2", title: "Get Matched", desc: "Our algorithm surfaces the best-fit creators within minutes." },
  { num: "3", title: "Hire & Pay Safely", desc: "Review proposals, hire with confidence, and pay through secure escrow." },
];

const stats = [
  ["50K+", "Freelancers"],
  ["200K+", "Projects Completed"],
  ["$8M+", "Earned by Creators"],
  ["192", "Countries"],
];

export default function MarketplaceTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO: marketplace-hero */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1920&q=80"
          alt="Marketplace hero"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-6 py-24 text-center">
          <Badge className="mb-6 px-3 py-1 text-xs uppercase tracking-widest rounded-full border border-primary-foreground/60 text-primary-foreground bg-transparent animate-fade-in [animation-delay:100ms]">
            The Creative Marketplace
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 max-w-4xl mx-auto text-primary-foreground animate-fade-up [animation-delay:100ms]">
            Find skilled creators.<br />
            <span className="text-primary-foreground/80 italic">Sell your work.</span>
          </h1>
          <p className="text-primary-foreground/70 text-xl max-w-xl mx-auto mb-10 leading-relaxed animate-fade-up [animation-delay:200ms]">
            CraftConnect is the two-sided marketplace where businesses find world-class creative talent and freelancers build thriving careers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10 animate-fade-up [animation-delay:300ms]">
            <Button size="lg" className="px-8 rounded-xl font-semibold bg-primary text-primary-foreground hover:scale-105 transition-all duration-300 hover:shadow-lg">
              Post a Project
            </Button>
            <Button size="lg" className="px-8 rounded-xl font-semibold bg-background text-foreground hover:scale-105 transition-all duration-300 hover:shadow-lg">
              Find Work
            </Button>
            <Button size="lg" variant="outline" className="px-8 rounded-xl font-semibold border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 hover:scale-105 transition-all duration-300">
              Browse Talent
            </Button>
          </div>
          <div className="flex items-center justify-center gap-6 text-sm text-primary-foreground/60">
            <span><strong className="text-primary-foreground">50K+</strong> creators ready</span>
            <span>·</span>
            <span><strong className="text-primary-foreground">Free</strong> to post a project</span>
            <span>·</span>
            <span><strong className="text-primary-foreground">Secure</strong> escrow payments</span>
          </div>
        </div>
      </section>

      {/* CATEGORIES: ecom-categories */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-extrabold text-center mb-10 text-foreground">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div key={cat.name} className="rounded-2xl border border-border bg-card p-4 text-center hover:border-primary hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group">
              <div className="text-3xl mb-2">{cat.icon}</div>
              <p className="font-semibold text-sm text-card-foreground group-hover:text-primary transition-colors">{cat.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{cat.count}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator className="bg-border" />

      {/* FEATURED FREELANCERS: ecom-cart-cta */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-extrabold text-foreground">Top-Rated Creators</h2>
          <Button variant="outline" className="rounded-xl border-border text-muted-foreground hover:bg-muted text-sm hover:scale-105 transition-all duration-300">
            View All →
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredFreelancers.map((f) => (
            <Card key={f.name} className="rounded-2xl border border-border bg-card hover:shadow-lg hover:scale-105 transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-base font-bold bg-primary text-primary-foreground">
                    {f.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-card-foreground">{f.name}</p>
                    <p className="text-xs text-muted-foreground">{f.skill}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-primary">★ {f.rating}</span>
                  <span className="text-muted-foreground text-xs">{f.projects} projects</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-lg text-primary">{f.rate}</span>
                  <Button size="sm" className="rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:scale-105 transition-all duration-300 hover:shadow-lg">
                    Hire
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold mb-3 text-foreground">How CraftConnect Works</h2>
            <p className="text-muted-foreground">From idea to done in three simple steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <div key={step.num} className="text-center hover:scale-105 transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-extrabold mx-auto mb-5 ${i % 2 === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                  {step.num}
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS: tech-stats */}
      <section className="border-y border-border py-16">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(([val, label]) => (
            <div key={label} className="hover:scale-105 transition-all duration-300">
              <p className="text-4xl font-extrabold mb-1 text-primary">{val}</p>
              <p className="text-muted-foreground text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA: glow-cta */}
      <section className="container mx-auto px-6 py-24">
        <div className="relative rounded-3xl p-16 text-center overflow-hidden bg-primary">
          <div className="absolute inset-0 pointer-events-none bg-primary-foreground/5 rounded-3xl" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-5 relative">
            Ready to grow your creative business?
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-10 max-w-md mx-auto relative">
            Join 50,000+ freelancers earning more on CraftConnect. It&apos;s free to create a profile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
            <Button size="lg" className="px-10 rounded-xl font-semibold bg-background text-foreground hover:scale-105 transition-all duration-300 hover:shadow-lg">
              Start for free
            </Button>
            <Button size="lg" variant="outline" className="px-10 rounded-xl font-semibold border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 hover:scale-105 transition-all duration-300">
              Post a Project
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER: footer-minimal */}
      <footer className="border-t border-border py-10 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-extrabold text-xl text-primary">CraftConnect</span>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">For Clients</a>
            <a href="#" className="hover:text-foreground transition-colors">For Freelancers</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
          <p className="text-muted-foreground text-xs">© 2026 CraftConnect, Inc. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
