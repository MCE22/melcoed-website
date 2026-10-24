// Subtle fade-in for content as it scrolls into view. Loaded on every page by BaseLayout.
//
// Safety: only elements that START below the fold are ever dimmed, so nothing the
// visitor can already see is hidden or delayed, and without JS nothing is dimmed at all.
//
// Targets are found automatically (no per-page markup):
//   - each direct child of a `.section > .wrap` block
//   - for card grids and step lists, each item instead of the whole container
// Opt out with data-no-reveal; opt any other element in with data-reveal.
//
// Uses a rAF-throttled scroll check (not IntersectionObserver): an element counts as
// revealed as soon as any part of it enters the viewport, including when the visitor
// jumps past it, so nothing can be left dimmed.

const GROUPS = '.grid, .steps, .topics';
const STAGGER_MS = 40; // per item in a grid, capped below
const MAX_STAGGER_MS = 120;

function targets(): HTMLElement[] {
  const out: HTMLElement[] = [];
  for (const el of document.querySelectorAll<HTMLElement>('main .section > .wrap > *, main [data-reveal]')) {
    if (el.closest('[data-no-reveal]')) continue;
    if (el.matches(GROUPS)) {
      [...el.children].forEach((child, i) => {
        (child as HTMLElement).style.setProperty('--reveal-delay', `${Math.min(i * STAGGER_MS, MAX_STAGGER_MS)}ms`);
        out.push(child as HTMLElement);
      });
    } else {
      out.push(el);
    }
  }
  return out;
}

function init() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const fold = window.innerHeight;
  let pending: HTMLElement[] = [];
  for (const el of targets()) {
    // Already on screen (or above it): leave untouched.
    if (el.getBoundingClientRect().top < fold) continue;
    el.classList.add('reveal', 'reveal-pending');
    pending.push(el);
  }
  if (!pending.length) return;

  // Reveal anything that is on screen OR already scrolled past. Checking "above the
  // viewport" too means fast scrolls and anchor jumps can never leave content dimmed.
  let queued = false;
  let stop = () => {};
  const check = () => {
    queued = false;
    const line = window.innerHeight;
    pending = pending.filter((el) => {
      if (el.getBoundingClientRect().top < line) {
        el.classList.remove('reveal-pending');
        return false;
      }
      return true;
    });
    if (!pending.length) {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      stop();
    }
  };
  const onScroll = () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(check);
    }
  };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll, { passive: true });
  // Re-check when the scroll position is restored after load (back/forward, #anchor
  // links) and when late layout shifts (web fonts, images) move content into view
  // without any scrolling.
  addEventListener('load', onScroll, { once: true });
  document.fonts?.ready.then(onScroll);
  const ro = new ResizeObserver(onScroll);
  ro.observe(document.body);
  stop = () => ro.disconnect();
}

init();
