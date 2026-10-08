

let observer;
function bindRevealEvents(route) {
  observer?.disconnect();
  if (route === "home") {
    const sections = document.querySelectorAll(".home-reveal");
    if (
      "IntersectionObserver" in window &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 },
      );
      sections.forEach((el) => observer.observe(el));
    } else sections.forEach((el) => el.classList.add("is-visible"));
  }
}

export { bindRevealEvents };
