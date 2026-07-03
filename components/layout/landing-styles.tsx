const LANDING_CSS = "";

export function LandingStyles() {
  if (!LANDING_CSS) return null;
  return <style>{LANDING_CSS}</style>;
}
