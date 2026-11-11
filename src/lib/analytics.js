// The ONE place analytics events leave the site.
// Pages never talk to Umami or Google directly; they call track().
// To switch provider, change `analytics.provider` in src/data/site.json.

const cfgEl = document.getElementById('analytics-config');
const cfg = cfgEl ? JSON.parse(cfgEl.textContent) : { provider: 'none' };

// A local record of what fired on this page, used for testing.
window.__tdEvents = window.__tdEvents || [];

export function track(name, props = {}) {
  window.__tdEvents.push({ name, props, at: Date.now() });
  try {
    if (cfg.provider === 'umami' && window.umami) window.umami.track(name, props);
    else if (cfg.provider === 'ga4' && window.gtag) window.gtag('event', name, props);
  } catch {
    /* analytics must never break the page */
  }
}

// Clicks: any element with data-track="event_name" (+ optional data-track-method / -location).
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-track]');
  if (!el) return;
  const props = {};
  if (el.dataset.trackMethod) props.method = el.dataset.trackMethod;
  if (el.dataset.trackLocation) props.location = el.dataset.trackLocation;
  track(el.dataset.track, props);
});

// Views: any element with data-track-view="event_name" fires once per page load
// when it reaches the middle part of the screen.
const seen = new Set();
const viewEls = document.querySelectorAll('[data-track-view]');
if (viewEls.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        const name = en.target.dataset.trackView;
        io.unobserve(en.target);
        if (seen.has(name)) continue;
        seen.add(name);
        track(name);
      }
    },
    { threshold: 0, rootMargin: '-30% 0px -30% 0px' }
  );
  viewEls.forEach((el) => io.observe(el));
}
