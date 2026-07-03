import { Suspense } from 'react';
import { WebsiteAnalyticsTracker } from '@/components/analytics/website-analytics-tracker';
import { SiteEditorBridge } from '@/components/editor/site-editor-bridge';
import { LandingStyles } from '@/components/layout/landing-styles';

export default function LandingPage() {
  return (
    <>
      <Suspense fallback={null}>
        <WebsiteAnalyticsTracker />
      </Suspense>
      <SiteEditorBridge />
      <LandingStyles />
      <header>
        <a href="#features">
          Services
        </a>
        <a href="#contact">
          Pricing
        </a>
        <a href="#contact">
          Log in
        </a>
        <a href="#contact">
          Start
        </a>
      </header>
      <main>
        <section id="hero" data-gondoor-editor-target-type="section" data-gondoor-editor-target-id="hero" data-gondoor-editor-label="Hero">
          <h1 data-gondoor-editor-target-type="section" data-gondoor-editor-target-id="hero" data-gondoor-editor-label="Hero" data-gondoor-editor-text-id="hero-text-1">
            Vectorine
          </h1>
          <p data-gondoor-editor-target-type="section" data-gondoor-editor-target-id="hero" data-gondoor-editor-label="Hero" data-gondoor-editor-text-id="hero-text-2">
            AI operations consulting, workflow automation, and analytics enablement for B2B teams.
          </p>
          <a href="#contact" data-gondoor-editor-target-type="section" data-gondoor-editor-target-id="hero" data-gondoor-editor-label="Hero" data-gondoor-editor-text-id="hero-text-3">
            Client dashboard
          </a>
          <a href="#contact" data-gondoor-editor-target-type="section" data-gondoor-editor-target-id="hero" data-gondoor-editor-label="Hero" data-gondoor-editor-text-id="hero-text-4">
            Book a consultation
          </a>
        </section>
        <section id="features" data-gondoor-editor-target-type="section" data-gondoor-editor-target-id="features" data-gondoor-editor-label="Features">
          <h2 data-gondoor-editor-target-type="section" data-gondoor-editor-target-id="features" data-gondoor-editor-label="Features" data-gondoor-editor-text-id="features-text-1">
            Services
          </h2>
          <p data-gondoor-editor-target-type="section" data-gondoor-editor-target-id="features" data-gondoor-editor-label="Features" data-gondoor-editor-text-id="features-text-2">
            We design AI operating systems, automated reporting, and repeatable analytics workflows.
          </p>
          <a href="#contact" data-gondoor-editor-target-type="section" data-gondoor-editor-target-id="features" data-gondoor-editor-label="Features" data-gondoor-editor-text-id="features-text-3">
            View packages
          </a>
        </section>
        <section id="contact" data-gondoor-editor-target-type="section" data-gondoor-editor-target-id="contact" data-gondoor-editor-label="Contact">
          <h2 data-gondoor-editor-target-type="section" data-gondoor-editor-target-id="contact" data-gondoor-editor-label="Contact" data-gondoor-editor-text-id="contact-text-1">
            Contact
          </h2>
          <p data-gondoor-editor-target-type="section" data-gondoor-editor-target-id="contact" data-gondoor-editor-label="Contact" data-gondoor-editor-text-id="contact-text-2">
            Email hello@vectorine.test for an implementation sprint.
          </p>
        </section>
      </main>
      <footer>
        <a href="#contact">
          Pricing
        </a>
        <a data-href="/pricing">
          Data marker
        </a>
        <a aria-href="/pricing">
          Aria marker
        </a>
      </footer>
    </>
  );
}
