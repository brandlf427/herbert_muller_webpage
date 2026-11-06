// Subtle parallax: the hero image moves more slowly than the page content.
(() => {
  const image = document.querySelector(".hero__image");
  if (!image || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let ticking = false;
  const updateParallax = () => {
    const hero = image.closest(".hero");
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    const scrolledThroughHero = Math.max(0, -rect.top);
    // Positive movement offsets part of the normal upward page movement.
    image.style.setProperty("--parallax-shift", `${scrolledThroughHero * 0.38}px`);
    ticking = false;
  };

  const requestUpdate = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  updateParallax();
})();
