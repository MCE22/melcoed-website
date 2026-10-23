// Subtle fade-in for content as it scrolls into view. Loaded on every page by BaseLayout.
//
// Safety: only elements that START below the fold are ever dimmed, so nothing the
// visitor can already see is hidden or delayed, and without JS nothing is dimmed at all.
//
// Targets are found automatically (no per-page markup):
//   - each direct child of a `.section > .wrap` block
//   - for card grids and step lists, each item instead of the whole container
// Opt out with data-no-reveal; opt any other element in with data-reveal.

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
  if (!('IntersectionObserver' in window)) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.remove('reveal-pending');
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );

  const fold = window.innerHeight;
  for (const el of targets()) {
    // Already on screen (or above it): leave untouched.
    if (el.getBoundingClientRect().top < fold) continue;
    el.classList.add('reveal', 'reveal-pending');
    io.observe(el);
  }
}

init();
