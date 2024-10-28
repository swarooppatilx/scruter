document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger);
  const tl = gsap.timeline();
  tl.fromTo(
    '.gsap',
    {
      y: -100,
      opacity: 0,
      ease: 'power1.inOut',
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.3,
    }
  );

  tl.fromTo(
    '.gsap-main',
    {
      scale: 0,
      opacity: 0,
      ease: 'power1.inOut',
    },
    {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: 'power1.inOut',
    }
  );

  gsap.fromTo(
    '.gsap-card',
    {
      y: 200,
      opacity: 0,
      ease: 'power1.inOut',
    },
    {
      y: 0,
      opacity: 1,
      duration: 2,
      scrollTrigger: {
        trigger: '.gsap-card',
        start: 'top 92%',
        toggleActions: 'play none none none',
      },
    }
  );

  gsap.fromTo(
    '.gsap-card2',
    {
      y: 200,
      opacity: 0,
      ease: 'power1.inOut',
    },
    {
      y: 0,
      opacity: 1,
      duration: 2,
      scrollTrigger: {
        trigger: '.gsap-card2',
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    }
  );
});
