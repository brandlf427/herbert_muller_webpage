// Smooth parallax: the image now moves at 0.28 instead of 0.38 (10 percentage points less).
// RequestAnimationFrame easing interpolates between scroll positions to prevent visible jumps.
(() => {
  const image = document.querySelector('.hero__image');
  if (!image || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const hero = image.closest('.hero');
  if (!hero) return;

  const travelFactor = 0.28;
  const maxTravel = 260;
  const easing = 0.12;
  let current = 0;
  let target = 0;
  let frame = null;

  const animate = () => {
    current += (target - current) * easing;
    if (Math.abs(target - current) < 0.08) current = target;
    image.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0) scale(1.13)`;
    if (current !== target) frame = requestAnimationFrame(animate);
    else frame = null;
  };

  const updateTarget = () => {
    const scrolled = Math.max(0, -hero.getBoundingClientRect().top);
    target = Math.min(maxTravel, scrolled * travelFactor);
    if (frame === null) frame = requestAnimationFrame(animate);
  };

  window.addEventListener('scroll', updateTarget, { passive: true });
  window.addEventListener('resize', updateTarget);
  updateTarget();
})();
