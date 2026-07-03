'use client';

import { useEffect, useRef } from 'react';

const ALLOWED_PARENT_ORIGINS = ["https://gondoor.app","https://app.gondoor.app","http://localhost:3000","http://127.0.0.1:3000"];
const HANDSHAKE_MESSAGE_TYPE = 'gondoor:mvp-site-editor:handshake';
const READY_MESSAGE_TYPE = 'gondoor:mvp-site-editor:ready';
const BRIDGE_VERSION = 1;
const BRIDGE_CAPABILITIES = { textStyleRanges: true } as const;
const TARGETS_MESSAGE_TYPE = 'gondoor:mvp-site-editor:targets';
const HOVER_MESSAGE_TYPE = 'gondoor:mvp-site-editor:hover';
const CLICK_MESSAGE_TYPE = 'gondoor:mvp-site-editor:click';
const MARKER_CLEAR_MESSAGE_TYPE = 'gondoor:mvp-site-editor:marker-clear';
const DRAFT_TEXT_UPDATE_MESSAGE_TYPE = 'gondoor:mvp-site-editor:draft-text-update';
const CLEAR_DRAFT_TEXT_MESSAGE_TYPE = 'gondoor:mvp-site-editor:clear-draft-text';

type EditorTargetType = 'header' | 'section' | 'footer';

type EditorTarget = {
  elementTagName: string;
  targetType?: EditorTargetType | null;
  targetId?: string | null;
  textElementId?: string | null;
  label: string;
  text: string;
  rect: { top: number; left: number; width: number; height: number };
};

type ClickMarkerPayload = {
  target: EditorTarget;
  domPath: string;
  click: { x: number; y: number };
};

type MarkerClearReason = 'preview-scroll' | 'preview-unload' | 'preview-click-outside';

type TextStyleRange = {
  start: number;
  end: number;
  color?: string;
  underline?: true;
};

type TextElementIdentity = {
  targetType: EditorTargetType;
  targetId: string;
  textElementId: string;
};

type DraftOriginalText = TextElementIdentity & {
  element: HTMLElement;
  originalText: string;
};

type EditorMetadata = {
  targetType: EditorTargetType | null;
  targetId: string | null;
  targetElement: HTMLElement | null;
};

const TARGET_METADATA_SELECTOR =
  '[data-gondoor-editor-target-type][data-gondoor-editor-target-id][data-gondoor-editor-label]';
const TEXT_METADATA_SELECTOR = '[data-gondoor-editor-text-id]';
const TEXT_BEARING_ELEMENT_SELECTOR = [
  'h1,h2,h3,h4,h5,h6,p,span,button,label,a,li,blockquote,strong,em,small,dt,dd',
  TEXT_METADATA_SELECTOR,
].join(',');
const DERIVED_TEXT_ID_LOOKUP_SELECTOR = [
  TEXT_BEARING_ELEMENT_SELECTOR,
  'div,nav,article',
].join(',');

const hoverElementIds = new WeakMap<Element, number>();
let nextHoverElementId = 1;

function getHoverElementId(element: Element) {
  const existingId = hoverElementIds.get(element);
  if (existingId) return existingId;
  const nextId = nextHoverElementId;
  nextHoverElementId += 1;
  hoverElementIds.set(element, nextId);
  return nextId;
}

function getScrollX() {
  return window.scrollX ?? document.documentElement.scrollLeft ?? document.body.scrollLeft ?? 0;
}

function getScrollY() {
  return window.scrollY ?? document.documentElement.scrollTop ?? document.body.scrollTop ?? 0;
}

function isVisibleElement(element: Element, rect: DOMRect) {
  if (!Number.isFinite(rect.width) || !Number.isFinite(rect.height)) return false;
  if (rect.width <= 0 || rect.height <= 0) return false;
  const style = window.getComputedStyle(element);
  if (style.display === 'none') return false;
  if (style.visibility === 'hidden') return false;
  return true;
}

function readNearestEditorMetadata(element: Element): EditorMetadata {
  const targetElement = element.closest<HTMLElement>(TARGET_METADATA_SELECTOR);
  if (!targetElement) {
    return { targetType: null, targetId: null, targetElement: null };
  }

  const targetType = targetElement.dataset.gondoorEditorTargetType;
  const targetId = targetElement.dataset.gondoorEditorTargetId;
  if (!isEditorTargetType(targetType)) {
    return { targetType: null, targetId: null, targetElement: null };
  }
  if (!targetId) {
    return { targetType: null, targetId: null, targetElement: null };
  }

  return { targetType, targetId, targetElement };
}

function labelForElement(element: Element) {
  const tagName = element.tagName.toUpperCase();

  if (tagName === 'SECTION') {
    const editorLabel = (element as HTMLElement).dataset?.gondoorEditorLabel;
    return editorLabel && editorLabel.trim().length > 0 ? editorLabel.toUpperCase() : 'SECTION';
  }

  switch (tagName) {
    case 'H1':
      return 'HEADER-1';
    case 'H2':
      return 'HEADER-2';
    case 'H3':
      return 'HEADER-3';
    case 'H4':
      return 'HEADER-4';
    case 'H5':
      return 'HEADER-5';
    case 'H6':
      return 'HEADER-6';
    case 'P':
      return 'PARAGRAPH';
    case 'SPAN':
      return 'TEXT';
    case 'A':
      return 'LINK';
    case 'BUTTON':
      return 'BUTTON';
    case 'IMG':
      return 'IMAGE';
    case 'DIV':
      return 'CONTAINER';
    case 'HEADER':
      return 'HEADER';
    case 'FOOTER':
      return 'FOOTER';
    case 'NAV':
      return 'NAVIGATION';
    case 'MAIN':
      return 'MAIN';
    default:
      return tagName;
  }
}

function resolveTextBearingElement(element: Element, targetElement: HTMLElement | null) {
  if (!targetElement) return null;
  let textElement = element.closest<HTMLElement>(TEXT_BEARING_ELEMENT_SELECTOR);
  while (textElement?.dataset.gondoorEditorStyleSpan === 'true') {
    textElement =
      textElement.parentElement?.closest<HTMLElement>(TEXT_BEARING_ELEMENT_SELECTOR) ?? null;
  }
  if (!textElement) return null;
  if (!targetElement.contains(textElement)) return null;
  const textElementTarget = textElement.closest<HTMLElement>(TARGET_METADATA_SELECTOR);
  if (textElementTarget !== targetElement) return null;

  const rect = textElement.getBoundingClientRect();
  if (!isVisibleElement(textElement, rect)) return null;
  if ((textElement.textContent ?? '').trim().length === 0) return null;

  return { element: textElement, rect };
}

function stableTextElementIdForElement(
  textElement: HTMLElement,
  metadata: {
    targetType: EditorTargetType | null;
    targetId: string | null;
  },
) {
  const existingId = textElement.dataset.gondoorEditorTextId;
  if (existingId && existingId.trim()) return existingId;
  if (!metadata.targetType || !metadata.targetId) return null;

  const domPath = buildDomPath(textElement);
  if (!domPath) return null;

  const derivedId = `${metadata.targetType}:${metadata.targetId}:${domPath}`;
  textElement.dataset.gondoorEditorTextId = derivedId;
  return derivedId;
}

function readEditorElement(element: Element): EditorTarget | null {
  const initialRect = element.getBoundingClientRect();
  if (!isVisibleElement(element, initialRect)) return null;

  const metadata = readNearestEditorMetadata(element);
  const textElement = resolveTextBearingElement(element, metadata.targetElement);
  const resolvedElement = textElement?.element ?? element;
  const rect = textElement?.rect ?? initialRect;
  const textElementId = textElement
    ? stableTextElementIdForElement(textElement.element, metadata)
    : null;
  const elementTagName = resolvedElement.tagName.toUpperCase();

  return {
    elementTagName,
    targetType: metadata.targetType,
    targetId: metadata.targetId,
    textElementId,
    label: labelForElement(resolvedElement),
    text: resolvedElement.textContent ?? '',
    rect: {
      top: rect.top + getScrollY(),
      left: rect.left + getScrollX(),
      width: rect.width,
      height: rect.height,
    },
  };
}

function createHoverKey(element: Element, target: EditorTarget) {
  return [
    getHoverElementId(element),
    target.elementTagName,
    target.targetType ?? 'none',
    target.targetId ?? 'none',
    target.textElementId ?? 'none',
    target.rect.top,
    target.rect.left,
    target.rect.width,
    target.rect.height,
  ].join(':');
}

function sameTagSiblingIndex(element: Element) {
  const parent = element.parentElement;
  if (!parent) return null;
  const tagName = element.tagName.toLowerCase();
  const sameTagSiblings = Array.from(parent.children).filter(
    (child) => child.tagName.toLowerCase() === tagName,
  );
  if (sameTagSiblings.length <= 1) return null;
  return sameTagSiblings.indexOf(element);
}

function domPathSegment(element: Element) {
  const tagName = element.tagName.toLowerCase();
  const siblingIndex = sameTagSiblingIndex(element);
  return siblingIndex === null ? tagName : tagName + '[' + siblingIndex + ']';
}

function isBodyChild(element: Element) {
  return element.parentElement === document.body;
}

function isTopLevelEditorRegion(element: Element) {
  if (!isBodyChild(element)) return false;
  const tagName = element.tagName.toLowerCase();
  return tagName === 'header' || tagName === 'section' || tagName === 'footer';
}

function buildDomPath(element: Element) {
  if (!document.body) return null;
  const pathToBody: Element[] = [];
  let current: Element | null = element;
  while (current && current !== document.body) {
    pathToBody.unshift(current);
    current = current.parentElement;
  }
  if (current !== document.body || pathToBody.length === 0) return null;

  const regionStart = pathToBody.find(isTopLevelEditorRegion) ?? null;
  const start = regionStart ?? pathToBody.find(isBodyChild) ?? null;
  if (!start) return null;
  const startRect = start.getBoundingClientRect();
  if (!isVisibleElement(start, startRect)) return null;

  const startIndex = pathToBody.indexOf(start);
  if (startIndex < 0) return null;
  return pathToBody.slice(startIndex).map(domPathSegment).join('.');
}

function findElementByDerivedTextIdentity(textElementId: string) {
  const match = textElementId.match(/^(header|section|footer):([^:]+):(.+)$/);
  if (!match) return null;

  const [, targetType, targetId, domPath] = match;
  for (const element of Array.from(
    document.querySelectorAll<HTMLElement>(DERIVED_TEXT_ID_LOOKUP_SELECTOR),
  )) {
    if (buildDomPath(element) !== domPath) continue;
    const metadata = readNearestEditorMetadata(element);
    if (metadata.targetType !== targetType || metadata.targetId !== targetId) continue;
    element.dataset.gondoorEditorTextId = textElementId;
    return element;
  }

  return null;
}

function findTextElementsById(textElementId: string) {
  const explicitMatches = Array.from(
    document.querySelectorAll<HTMLElement>(
      `[data-gondoor-editor-text-id="${CSS.escape(textElementId)}"]`,
    ),
  );
  if (explicitMatches.length > 0) return explicitMatches;
  const derivedMatch = findElementByDerivedTextIdentity(textElementId);
  return derivedMatch ? [derivedMatch] : [];
}

function textElementIdentityKey(identity: TextElementIdentity) {
  return JSON.stringify([
    identity.targetType,
    identity.targetId,
    identity.textElementId,
  ]);
}

function draftTextSignature(editedText: string, styleRanges: TextStyleRange[]) {
  return JSON.stringify([
    editedText,
    styleRanges.map((range) => [
      range.start,
      range.end,
      range.color ?? null,
      range.underline === true,
    ]),
  ]);
}

function isEditorTargetType(value: unknown): value is EditorTargetType {
  return value === 'header' || value === 'section' || value === 'footer';
}

function isValidHexColor(value: unknown): value is string {
  return typeof value === 'string' && /^#[0-9a-fA-F]{6}$/.test(value);
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseTextStyleRanges(value: unknown, editedText: string): TextStyleRange[] | null {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) return null;

  const ranges: TextStyleRange[] = [];
  for (const entry of value) {
    if (!isPlainRecord(entry)) return null;
    const start = entry.start;
    const end = entry.end;
    if (typeof start !== 'number' || typeof end !== 'number') return null;
    if (!Number.isInteger(start) || !Number.isInteger(end)) return null;
    if (start < 0 || end <= start || end > editedText.length) return null;

    const nextRange: TextStyleRange = { start, end };
    const color = entry.color;
    if (color !== undefined) {
      if (!isValidHexColor(color)) return null;
      nextRange.color = color.toLowerCase();
    }
    const underline = entry.underline;
    if (underline !== undefined) {
      if (typeof underline !== 'boolean') return null;
      if (underline) nextRange.underline = true;
    }
    if (!nextRange.color && !nextRange.underline) return null;
    ranges.push(nextRange);
  }

  ranges.sort((a, b) => a.start - b.start || a.end - b.end);
  for (let index = 1; index < ranges.length; index += 1) {
    if (ranges[index].start < ranges[index - 1].end) return null;
  }

  return ranges;
}

function setElementText(element: HTMLElement, text: string) {
  element.replaceChildren(document.createTextNode(text));
}

function applyStyledText(
  element: HTMLElement,
  editedText: string,
  styleRanges: TextStyleRange[],
) {
  if (styleRanges.length === 0) {
    setElementText(element, editedText);
    return;
  }

  const nodes: Array<Text | HTMLElement> = [];
  let cursor = 0;
  for (const range of styleRanges) {
    if (range.start > cursor) {
      nodes.push(document.createTextNode(editedText.slice(cursor, range.start)));
    }
    const span = document.createElement('span');
    span.dataset.gondoorEditorStyleSpan = 'true';
    span.textContent = editedText.slice(range.start, range.end);
    if (range.color) span.style.color = range.color;
    if (range.underline) span.style.textDecorationLine = 'underline';
    nodes.push(span);
    cursor = range.end;
  }
  if (cursor < editedText.length) {
    nodes.push(document.createTextNode(editedText.slice(cursor)));
  }

  element.replaceChildren(...nodes);
}

function findTextElementByIdentity(
  identity: TextElementIdentity,
  options: { requireVisible?: boolean } = {},
) {
  const requireVisible = options.requireVisible ?? true;
  for (const element of findTextElementsById(identity.textElementId)) {
    const rect = element.getBoundingClientRect();
    if (requireVisible && !isVisibleElement(element, rect)) continue;
    const metadata = readNearestEditorMetadata(element);
    if (metadata.targetType !== identity.targetType || metadata.targetId !== identity.targetId) {
      continue;
    }
    return element;
  }

  return null;
}

function findDraftTextElementByIdentity(
  identity: TextElementIdentity,
  draft?: DraftOriginalText,
) {
  if (draft && document.body?.contains(draft.element)) return draft.element;
  return (
    findTextElementByIdentity(identity) ??
    findTextElementByIdentity(identity, { requireVisible: false })
  );
}

function createClickMarkerPayload(
  element: Element,
  event: { clientX: number; clientY: number },
): ClickMarkerPayload | null {
  const target = readEditorElement(element);
  if (!target) return null;
  const domPath = buildDomPath(element);
  if (!domPath) return null;
  const clickX = event.clientX + getScrollX();
  const clickY = event.clientY + getScrollY();
  if (!Number.isFinite(clickX) || !Number.isFinite(clickY)) return null;
  return {
    target,
    domPath,
    click: {
      x: clickX,
      y: clickY,
    },
  };
}

function collectTargets() {
  const elements = new Set<HTMLElement>();
  for (const targetElement of Array.from(
    document.querySelectorAll<HTMLElement>(TARGET_METADATA_SELECTOR),
  )) {
    elements.add(targetElement);
    for (const textElement of Array.from(
      targetElement.querySelectorAll<HTMLElement>(TEXT_BEARING_ELEMENT_SELECTOR),
    )) {
      if (textElement.dataset.gondoorEditorStyleSpan === 'true') continue;
      elements.add(textElement);
    }
  }

  return Array.from(elements)
    .map(readEditorElement)
    .filter((target): target is EditorTarget => target !== null);
}

function getDocumentHeight() {
  const body = document.body;
  const documentElement = document.documentElement;
  return Math.ceil(
    Math.max(
      body?.scrollHeight ?? 0,
      body?.offsetHeight ?? 0,
      body?.clientHeight ?? 0,
      documentElement?.scrollHeight ?? 0,
      documentElement?.offsetHeight ?? 0,
      documentElement?.clientHeight ?? 0,
    ),
  );
}

function isAllowedParentOrigin(origin: string) {
  return ALLOWED_PARENT_ORIGINS.includes(origin);
}

function debugLog(event: string, payload?: unknown) {
  try {
    if (typeof window === 'undefined' || window.parent === window) return;
    console.info('[gondoor-site-editor-bridge]', event, payload ?? {});
  } catch {
    // Diagnostics must never affect the generated public page.
  }
}

function findVisibleElementFromEvent(event: Event) {
  const target = event.target instanceof Element ? event.target : null;
  return target;
}

export function SiteEditorBridge() {
  const parentOriginRef = useRef<string | null>(null);
  const enabledRef = useRef(false);
  const lastHoverKeyRef = useRef<string | null>(null);
  const primaryClickSequenceHandledRef = useRef(false);
  const pointerPositionRef = useRef<{ clientX: number; clientY: number } | null>(null);
  const previewTokenRef = useRef<string | null>(null);
  const originalTextByIdentityKeyRef = useRef<Map<string, DraftOriginalText>>(new Map());
  const appliedDraftSignatureByIdentityKeyRef = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    debugLog('mounted', {
      allowedParentOrigins: ALLOWED_PARENT_ORIGINS,
      isIframe: window.parent !== window,
    });

    function isEditorEnabled() {
      return enabledRef.current && parentOriginRef.current !== null && window.parent !== window;
    }

    function postToParent(type: string, payload: unknown) {
      if (!isEditorEnabled()) {
        debugLog('post_skipped_not_enabled', { type });
        return;
      }
      window.parent.postMessage({ type, previewToken: previewTokenRef.current, payload }, parentOriginRef.current!);
    }

    function postTargets() {
      const targets = collectTargets();
      const documentHeight = getDocumentHeight();
      debugLog('targets_posted', { count: targets.length, documentHeight });
      postToParent(TARGETS_MESSAGE_TYPE, { targets, documentHeight });
    }

    function postMarkerClear(reason: MarkerClearReason) {
      postToParent(MARKER_CLEAR_MESSAGE_TYPE, { reason });
    }

    function restoreDraftText(payload?: {
      targetType?: unknown;
      targetId?: unknown;
      textElementId?: unknown;
    } | null) {
      const restoreOne = (draft: DraftOriginalText | undefined) => {
        if (!draft) return;
        const element = findDraftTextElementByIdentity(draft, draft);
        if (!element) return;
        setElementText(element, draft.originalText);
        originalTextByIdentityKeyRef.current.delete(textElementIdentityKey(draft));
        appliedDraftSignatureByIdentityKeyRef.current.delete(textElementIdentityKey(draft));
      };

      const targetType = payload?.targetType;
      const targetId = payload?.targetId;
      const textElementId = payload?.textElementId;
      if (
        !isEditorTargetType(targetType) ||
        typeof targetId !== 'string' ||
        typeof textElementId !== 'string'
      ) {
        return;
      }

      restoreOne(
        originalTextByIdentityKeyRef.current.get(
          textElementIdentityKey({ targetType, targetId, textElementId }),
        ),
      );
    }

    function handleMessage(event: MessageEvent) {
      if (event.source !== window.parent) {
        debugLog('message_ignored_source', { origin: event.origin });
        return;
      }
      const data = event.data as { type?: unknown; payload?: unknown } | null;
      if (!data || typeof data !== 'object') {
        debugLog('message_ignored_payload', { origin: event.origin });
        return;
      }

      debugLog('message_received', {
        origin: event.origin,
        type: typeof data.type === 'string' ? data.type : null,
      });

      if (data.type === HANDSHAKE_MESSAGE_TYPE) {
        const allowed = isAllowedParentOrigin(event.origin);
        const payload = data.payload as { previewToken?: unknown } | null;
        const previewToken =
          payload && typeof payload.previewToken === 'string' && payload.previewToken.trim()
            ? payload.previewToken
            : null;
        debugLog('handshake_received', {
          origin: event.origin,
          allowed,
          allowedParentOrigins: ALLOWED_PARENT_ORIGINS,
        });
        if (!allowed) return;
        parentOriginRef.current = event.origin;
        previewTokenRef.current = previewToken;
        enabledRef.current = true;
        postToParent(READY_MESSAGE_TYPE, {
          ready: true,
          bridgeVersion: BRIDGE_VERSION,
          capabilities: BRIDGE_CAPABILITIES,
        });
        debugLog('ready_posted', { origin: event.origin });
        postTargets();
        return;
      }

      if (!isEditorEnabled()) {
        debugLog('message_ignored_not_enabled', {
          origin: event.origin,
          type: data.type,
        });
        return;
      }
      if (isEditorEnabled() && event.origin !== parentOriginRef.current) {
        debugLog('message_ignored_origin', {
          origin: event.origin,
          parentOrigin: parentOriginRef.current,
          type: data.type,
        });
        return;
      }

      if (data.type === DRAFT_TEXT_UPDATE_MESSAGE_TYPE) {
        const payload = data.payload as {
          targetType?: unknown;
          targetId?: unknown;
          textElementId?: unknown;
          editedText?: unknown;
          styleRanges?: unknown;
        } | null;
        const targetType =
          payload && isEditorTargetType(payload.targetType) ? payload.targetType : null;
        const targetId = payload && typeof payload.targetId === 'string' ? payload.targetId : null;
        const textElementId =
          payload && typeof payload.textElementId === 'string' ? payload.textElementId : null;
        const nextText = payload && typeof payload.editedText === 'string' ? payload.editedText : null;
        const styleRanges =
          nextText !== null ? parseTextStyleRanges(payload?.styleRanges, nextText) : null;
        if (!targetType || !targetId || !textElementId || nextText === null) return;
        if (styleRanges === null) return;
        const identity = { targetType, targetId, textElementId };
        const identityKey = textElementIdentityKey(identity);
        const signature = draftTextSignature(nextText, styleRanges);
        if (appliedDraftSignatureByIdentityKeyRef.current.get(identityKey) === signature) {
          debugLog('draft_text_update_duplicate_skipped', {
            targetType,
            targetId,
            textElementId,
          });
          return;
        }
        const existingDraft = originalTextByIdentityKeyRef.current.get(identityKey);
        const element = findDraftTextElementByIdentity(identity, existingDraft);
        debugLog('draft_text_update_received', {
          targetType,
          targetId,
          textElementId,
          elementFound: Boolean(element),
        });
        if (!element) return;
        if (!originalTextByIdentityKeyRef.current.has(identityKey)) {
          originalTextByIdentityKeyRef.current.set(identityKey, {
            ...identity,
            element,
            originalText: element.textContent ?? '',
          });
        }
        applyStyledText(element, nextText, styleRanges);
        appliedDraftSignatureByIdentityKeyRef.current.set(identityKey, signature);
        postTargets();
      }

      if (data.type === CLEAR_DRAFT_TEXT_MESSAGE_TYPE) {
        const payload = data.payload as {
          targetType?: unknown;
          targetId?: unknown;
          textElementId?: unknown;
        } | null;
        debugLog('clear_draft_text_received', { payload });
        restoreDraftText(payload);
        postTargets();
      }

    }

    function clearHover() {
      if (!isEditorEnabled()) return;
      if (lastHoverKeyRef.current === null) return;
      lastHoverKeyRef.current = null;
      postToParent(HOVER_MESSAGE_TYPE, { target: null });
    }

    function postHoverForElement(element: Element | null) {
      if (!isEditorEnabled()) return;
      if (!element) {
        clearHover();
        return;
      }
      const target = readEditorElement(element);
      if (!target) {
        clearHover();
        return;
      }
      const hoverKey = createHoverKey(element, target);
      if (lastHoverKeyRef.current === hoverKey) return;
      lastHoverKeyRef.current = hoverKey;
      postToParent(HOVER_MESSAGE_TYPE, { target });
    }

    function handleHover(event: MouseEvent) {
      pointerPositionRef.current = { clientX: event.clientX, clientY: event.clientY };
      postHoverForElement(findVisibleElementFromEvent(event));
    }

    function refreshHoverFromCurrentPointer() {
      if (!isEditorEnabled()) return;
      const pointer = pointerPositionRef.current;
      if (!pointer) {
        clearHover();
        return;
      }
      postHoverForElement(document.elementFromPoint(pointer.clientX, pointer.clientY));
    }

    function consumePrimaryEvent(event: Event) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    }

    function isPreviewDocumentElement(element: Element) {
      const body = document.body;
      if (body && (element === body || body.contains(element))) return true;
      const documentElement = document.documentElement;
      return (
        documentElement instanceof Element &&
        (element === documentElement || documentElement.contains(element))
      );
    }

    function postPrimaryClickActionForElement(
      element: Element | null,
      event: Event & { clientX: number; clientY: number },
    ) {
      if (!element) return false;
      if (!isPreviewDocumentElement(element)) return false;
      const markerPayload = createClickMarkerPayload(element, event);
      if (!markerPayload) {
        consumePrimaryEvent(event);
        postMarkerClear('preview-click-outside');
        return true;
      }

      consumePrimaryEvent(event as Event);
      postToParent(CLICK_MESSAGE_TYPE, markerPayload);
      return true;
    }

    function isPrimaryMouseEvent(event: MouseEvent) {
      return event.button === 0;
    }

    function isPrimaryPointerEvent(event: PointerEvent) {
      return event.button === 0 && event.isPrimary !== false;
    }

    function handlePrimaryPointerDown(event: PointerEvent) {
      if (!isEditorEnabled() || !isPrimaryPointerEvent(event)) return;
      const element = findVisibleElementFromEvent(event);
      primaryClickSequenceHandledRef.current = postPrimaryClickActionForElement(element, event);
    }

    function handlePrimaryPointerUp(event: PointerEvent) {
      if (!isEditorEnabled() || !isPrimaryPointerEvent(event)) return;
      if (primaryClickSequenceHandledRef.current) {
        consumePrimaryEvent(event);
      }
    }

    function handlePrimaryMouseEvent(event: MouseEvent) {
      if (!isEditorEnabled() || !isPrimaryMouseEvent(event)) return;
      if (primaryClickSequenceHandledRef.current) {
        consumePrimaryEvent(event);
      }
    }

    function handleClick(event: MouseEvent) {
      if (!isEditorEnabled() || !isPrimaryMouseEvent(event)) return;
      if (primaryClickSequenceHandledRef.current) {
        consumePrimaryEvent(event);
        primaryClickSequenceHandledRef.current = false;
        return;
      }
      const element = findVisibleElementFromEvent(event);
      postPrimaryClickActionForElement(element, event);
    }

    function handlePointerCancel() {
      primaryClickSequenceHandledRef.current = false;
    }

    function handlePreviewScroll() {
      postMarkerClear('preview-scroll');
      refreshHoverFromCurrentPointer();
    }

    function handlePreviewUnload() {
      postMarkerClear('preview-unload');
    }

    const mediaElements = Array.from(document.querySelectorAll<HTMLElement>('img,video'));
    window.addEventListener('message', handleMessage);
    document.addEventListener('mousemove', handleHover, true);
    document.addEventListener('mouseleave', clearHover, true);
    document.addEventListener('pointerdown', handlePrimaryPointerDown, true);
    document.addEventListener('pointerup', handlePrimaryPointerUp, true);
    document.addEventListener('pointercancel', handlePointerCancel, true);
    document.addEventListener('mousedown', handlePrimaryMouseEvent, true);
    document.addEventListener('mouseup', handlePrimaryMouseEvent, true);
    document.addEventListener('click', handleClick, true);
    window.addEventListener('scroll', handlePreviewScroll, true);
    window.addEventListener('pagehide', handlePreviewUnload);
    window.addEventListener('load', postTargets);
    for (const mediaElement of mediaElements) {
      mediaElement.addEventListener('load', postTargets);
      mediaElement.addEventListener('loadedmetadata', postTargets);
    }
    window.addEventListener('resize', postTargets);

    return () => {
      window.removeEventListener('message', handleMessage);
      document.removeEventListener('mousemove', handleHover, true);
      document.removeEventListener('mouseleave', clearHover, true);
      document.removeEventListener('pointerdown', handlePrimaryPointerDown, true);
      document.removeEventListener('pointerup', handlePrimaryPointerUp, true);
      document.removeEventListener('pointercancel', handlePointerCancel, true);
      document.removeEventListener('mousedown', handlePrimaryMouseEvent, true);
      document.removeEventListener('mouseup', handlePrimaryMouseEvent, true);
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('scroll', handlePreviewScroll, true);
      window.removeEventListener('pagehide', handlePreviewUnload);
      window.removeEventListener('load', postTargets);
      for (const mediaElement of mediaElements) {
        mediaElement.removeEventListener('load', postTargets);
        mediaElement.removeEventListener('loadedmetadata', postTargets);
      }
      window.removeEventListener('resize', postTargets);
    };
  }, []);

  return null;
}
