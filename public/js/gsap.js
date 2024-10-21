
    gsap.fromTo(".gsap", {
      x: -100,
      opacity: 0,
      ease: "power1.inOut",
    },{
        x:0,
        opacity:1,
        duration:2,
        stagger:0.5

    }
);

const navbar = document.querySelector('.sticky-top');
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        gsap.to(navbar, { boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', duration: 0.3 });
    } else {
        gsap.to(navbar, { boxShadow: 'none', duration: 0.3 });
    }
});
gsap.from('.card-hover', {
    scrollTrigger: '.card-hover', // start the animation when '.card-hover' is in view
    opacity: 0,
    y: 50,
    duration: 1
});
gsap.from('img', { opacity: 0, duration: 1, delay: 0.5 });


// public/js/gsap.js

document.addEventListener('DOMContentLoaded', function() {
    // Example animation for elements with class 'card-hover'
    gsap.from('.gsap', {
        opacity: 0,
        y: 50, // Move 50px from the bottom
        duration: 1, // 1 second duration
        stagger: 0.3 // Stagger the animations by 0.3 seconds
    });

    // Navbar animation when scrolled
    const navbar = document.querySelector('.sticky-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            gsap.to(navbar, { boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', duration: 0.3 });
        } else {
            gsap.to(navbar, { boxShadow: 'none', duration: 0.3 });
        }
    });
});

