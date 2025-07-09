
// Animate hero text on load
document.addEventListener("DOMContentLoaded", () => {
  anime({
    targets: '.hero h1',
    translateY: [-40, 0],
    opacity: [0, 1],
    duration: 1200,
    easing: 'easeOutExpo'
  });
  anime({
    targets: '.project-card',
    opacity: [0, 1],
    translateY: [24, 0],
    delay: anime.stagger(180, {start: 600}),
    duration: 700,
    easing: 'easeOutCubic'
  });
});
