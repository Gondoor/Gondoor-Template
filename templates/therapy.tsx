"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// ── Registry metadata ────────────────────────────────────────────────
// source: gondoor-template-registry.js
// business: therapy
// sections: medical-hero, agency-services, steps-timeline, testimonial-cards, booking-cta, faq-accordion, footer-minimal
// colors: primary #7C3AED · accent #A78BFA · bg #FAF5FF · text #1E1B4B
// fonts: display Fraunces · body Lora
// ─────────────────────────────────────────────────────────────────────

const CONFIG = {
  colors: { primary: "#7C3AED", accent: "#A78BFA", bg: "#FAF5FF", text: "#1E1B4B" },
  fonts: { display: "Fraunces", body: "Lora" },
};

const MODALITIES = [
  { name: "Individual Therapy", desc: "A private, confidential space to explore your thoughts, feelings, and patterns at your own pace." },
  { name: "Couples Counseling", desc: "Strengthen communication, rebuild trust, and develop deeper understanding together." },
  { name: "Anxiety & Depression", desc: "Evidence-based approaches to reduce symptoms and build lasting resilience." },
  { name: "Trauma-Informed", desc: "Gentle, respectful care that honours your story and moves at your pace." },
  { name: "EMDR", desc: "Eye Movement Desensitisation and Reprocessing to process and heal traumatic memories." },
  { name: "Group Sessions", desc: "Shared healing in a safe, facilitated group environment for common challenges." },
];

const STEPS = [
  { n: "01", title: "Reach Out", desc: "Fill out a short contact form or call us. No lengthy intake — just a simple hello." },
  { n: "02", title: "Match with a Therapist", desc: "We'll match you with a therapist whose specialty and style fits your needs." },
  { n: "03", title: "Begin Your Journey", desc: "Your first session is a conversation — no pressure, no agenda. Just a beginning." },
];

const TESTIMONIALS = [
  { name: "Anonymous", text: "I had tried therapy twice before and it never clicked. My therapist at Mindful Path actually listens. For the first time, I feel like I'm making real progress." },
  { name: "Anonymous", text: "The EMDR sessions were transformative. I walked out of a decade of anxiety in a way I never thought possible. I'm so grateful." },
  { name: "Anonymous", text: "Couples counseling saved our relationship. We have actual tools now. Our therapist was warm, honest, and incredibly skilled." },
];

const FAQS = [
  { q: "Do you accept insurance?", a: "We are out-of-network providers. We can provide a monthly Superbill that you may submit to your insurer for possible reimbursement. Many clients receive 40–80% back. We recommend checking with your plan before your first session." },
  { q: "What happens in the first session?", a: "Your first session is an intake conversation. Your therapist will ask about what's bringing you in, your background, and your goals. There's no pressure to share more than you're comfortable with — it's a chance to see if it's a good fit." },
  { q: "What is your cancellation policy?", a: "We ask for 24 hours' notice to cancel or reschedule. Late cancellations and no-shows are charged at the full session rate. We understand life happens and apply this policy with care." },
  { q: "Do you offer telehealth sessions?", a: "Yes. All our therapists offer secure video sessions via a HIPAA-compliant platform. Many clients prefer telehealth for its convenience and find it equally effective." },
  { q: "How long does therapy typically last?", a: "This varies widely by individual, goals, and therapeutic approach. Some clients see meaningful change in 8–12 sessions. Others benefit from longer-term work. We review progress together regularly and honour your timeline." },
];

export default function TherapyTemplate() {
  return (
    <div className="min-h-screen" style={{ background: CONFIG.colors.bg, color: CONFIG.colors.text }}>

      {/* NAV */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-violet-100">
        <p className="text-xl font-semibold italic" style={{ fontFamily: CONFIG.fonts.display, color: CONFIG.colors.primary }}>Mindful Path Therapy</p>
        <div className="hidden md:flex gap-8 text-sm text-indigo-400" style={{ fontFamily: CONFIG.fonts.body }}>
          <a href="#" className="hover:text-indigo-900">Services</a>
          <a href="#" className="hover:text-indigo-900">Our Therapists</a>
          <a href="#" className="hover:text-indigo-900">FAQs</a>
        </div>
        <Button size="sm" className="text-white text-xs font-medium" style={{ background: CONFIG.colors.primary }}>Book a Session</Button>
      </nav>

      {/* HERO: medical-hero */}
      <section className="px-6 py-28 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <div>
          <Badge className="mb-6 text-xs font-medium" style={{ background: "#EDE9FE", color: CONFIG.colors.primary }}>
            Private Practice · Telehealth Available
          </Badge>
          <h1 className="text-5xl md:text-6xl font-semibold italic leading-tight mb-5" style={{ fontFamily: CONFIG.fonts.display }}>
            Healing starts with{" "}
            <span style={{ color: CONFIG.colors.accent }}>being heard.</span>
          </h1>
          <p className="text-lg text-indigo-700 mb-8" style={{ fontFamily: CONFIG.fonts.body }}>
            Mindful Path Therapy is a warm, inclusive private practice offering evidence-based therapy for individuals and couples. Wherever you are in your journey — there&apos;s a place for you here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-white font-medium px-8" style={{ background: CONFIG.colors.primary }}>
              Get Started Today
            </Button>
            <Button size="lg" variant="outline" className="border-violet-200 px-8" style={{ color: CONFIG.colors.primary }}>
              Meet the Therapists
            </Button>
          </div>
        </div>
        <div className="rounded-3xl p-10 text-center" style={{ background: "#EDE9FE" }}>
          <div className="text-6xl mb-4">🌿</div>
          <p className="font-semibold text-indigo-800 mb-2" style={{ fontFamily: CONFIG.fonts.display }}>You don&apos;t have to do this alone.</p>
          <p className="text-sm text-indigo-500 mb-5">New clients matched within 48 hours.</p>
          <Button className="text-white w-full font-medium" style={{ background: CONFIG.colors.primary }}>Request a Match</Button>
        </div>
      </section>

      <Separator className="border-violet-100" />

      {/* AGENCY SERVICES: agency-services */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-semibold italic text-center mb-3" style={{ fontFamily: CONFIG.fonts.display }}>How We Can Help</h2>
          <p className="text-center text-indigo-400 mb-14 text-sm">Evidence-based modalities, tailored to you.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODALITIES.map((m) => (
              <div key={m.name} className="rounded-xl p-7 border border-violet-100 hover:border-violet-300 transition-colors hover:shadow-sm bg-white">
                <div className="w-6 h-0.5 mb-4" style={{ background: CONFIG.colors.accent }} />
                <h3 className="font-semibold mb-2" style={{ fontFamily: CONFIG.fonts.display, color: CONFIG.colors.primary }}>{m.name}</h3>
                <p className="text-indigo-500 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS TIMELINE: steps-timeline */}
      <section className="py-20 px-6" style={{ background: "#EDE9FE" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-semibold italic text-center mb-14" style={{ fontFamily: CONFIG.fonts.display }}>Getting Started Is Simple</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
            {STEPS.map((s) => (
              <div key={s.n}>
                <div className="text-5xl font-black mb-3" style={{ color: CONFIG.colors.primary, fontFamily: CONFIG.fonts.display }}>{s.n}</div>
                <h3 className="font-semibold text-lg mb-2 italic" style={{ fontFamily: CONFIG.fonts.display }}>{s.title}</h3>
                <p className="text-indigo-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL CARDS: testimonial-cards */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-semibold italic text-center mb-14" style={{ fontFamily: CONFIG.fonts.display }}>Words from Our Clients</h2>
          <p className="text-center text-sm text-indigo-400 mb-10 -mt-10">All testimonials shared anonymously with consent.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="rounded-2xl p-7 border border-violet-100">
                <div className="text-2xl mb-4" style={{ color: CONFIG.colors.accent }}>&quot;</div>
                <p className="text-indigo-700 text-sm italic leading-relaxed mb-5">{t.text}</p>
                <p className="text-sm font-medium text-indigo-400">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING CTA: booking-cta */}
      <section className="py-24 px-6 text-center" style={{ background: CONFIG.colors.primary }}>
        <div className="max-w-xl mx-auto text-white">
          <h2 className="text-4xl font-semibold italic mb-4" style={{ fontFamily: CONFIG.fonts.display }}>Take the First Step</h2>
          <p className="mb-8 text-violet-200 text-sm" style={{ fontFamily: CONFIG.fonts.body }}>
            A free 15-minute phone consultation is available for all new clients. No commitment — just a conversation.
          </p>
          <Button size="lg" className="bg-white font-semibold px-12" style={{ color: CONFIG.colors.primary }}>
            Request a Free Consultation
          </Button>
          <p className="text-xs text-violet-300 mt-4">In-person and telehealth sessions available</p>
        </div>
      </section>

      {/* FAQ ACCORDION: faq-accordion */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-semibold italic text-center mb-14" style={{ fontFamily: CONFIG.fonts.display }}>Common Questions</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <details key={f.q} className="bg-white border border-violet-100 rounded-2xl p-6 cursor-pointer group shadow-sm">
                <summary className="font-medium text-sm flex justify-between items-center list-none" style={{ fontFamily: CONFIG.fonts.body }}>
                  {f.q}
                  <span className="text-violet-300 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="mt-4 text-indigo-500 text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER: footer-minimal */}
      <footer className="py-10 px-8 border-t border-violet-100">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-indigo-400">
          <p className="font-semibold italic" style={{ fontFamily: CONFIG.fonts.display, color: CONFIG.colors.primary }}>Mindful Path Therapy</p>
          <p className="text-xs text-center text-indigo-300 max-w-sm">This site is for informational purposes only and does not constitute a therapeutic relationship. If you are in crisis, please call 988 (Suicide &amp; Crisis Lifeline).</p>
          <p>© 2026 Mindful Path Therapy. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
