'use client';

const LANDING_CSS = '';

export function LandingStyles() {
  if (!LANDING_CSS) return null;
  return <style dangerouslySetInnerHTML={{ __html: LANDING_CSS }} />;
}
