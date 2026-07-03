const FOOTER_EDITOR_TARGET_ID = "footer";
const FOOTER_EDITOR_LABEL = "Footer";

export function SiteFooter() {
  return (
    <footer
      data-gondoor-editor-target-type="footer"
      data-gondoor-editor-target-id={FOOTER_EDITOR_TARGET_ID}
      data-gondoor-editor-label={FOOTER_EDITOR_LABEL}
    >
      <a href="#contact" data-gondoor-editor-target-type="footer" data-gondoor-editor-target-id="footer" data-gondoor-editor-label="Footer" data-gondoor-editor-text-id="footer-text-1">
        Pricing
      </a>
      <a data-href="/pricing" data-gondoor-editor-target-type="footer" data-gondoor-editor-target-id="footer" data-gondoor-editor-label="Footer" data-gondoor-editor-text-id="footer-text-2">
        Data marker
      </a>
      <a aria-href="/pricing" data-gondoor-editor-target-type="footer" data-gondoor-editor-target-id="footer" data-gondoor-editor-label="Footer" data-gondoor-editor-text-id="footer-text-3">
        Aria marker
      </a>
    </footer>
  );
}
