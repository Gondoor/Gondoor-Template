const HEADER_EDITOR_TARGET_ID = "header";
const HEADER_EDITOR_LABEL = "Header";

export function SiteHeader() {
  return (
    <header
      data-gondoor-editor-target-type="header"
      data-gondoor-editor-target-id={HEADER_EDITOR_TARGET_ID}
      data-gondoor-editor-label={HEADER_EDITOR_LABEL}
    >
      <a href="#features" data-gondoor-editor-target-type="header" data-gondoor-editor-target-id="header" data-gondoor-editor-label="Header" data-gondoor-editor-text-id="header-text-1">
        Services
      </a>
      <a href="#contact" data-gondoor-editor-target-type="header" data-gondoor-editor-target-id="header" data-gondoor-editor-label="Header" data-gondoor-editor-text-id="header-text-2">
        Pricing
      </a>
      <a href="#contact" data-gondoor-editor-target-type="header" data-gondoor-editor-target-id="header" data-gondoor-editor-label="Header" data-gondoor-editor-text-id="header-text-3">
        Log in
      </a>
      <a href="#contact" data-gondoor-editor-target-type="header" data-gondoor-editor-target-id="header" data-gondoor-editor-label="Header" data-gondoor-editor-text-id="header-text-4">
        Start
      </a>
    </header>
  );
}
