// Initialize scroll reveal for all pages
document.addEventListener('DOMContentLoaded', function () {
    // Observer for scroll animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    // Add reveal classes to elements
    const addRevealClass = (selector, baseClass, direction = null, staggered = false) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            if (direction) {
                el.classList.add(`reveal-${direction}`);
            } else {
                el.classList.add(baseClass);
            }

            if (staggered) {
                el.style.transitionDelay = `${index * 0.1}s`;
            }

            observer.observe(el);
        });
    };

    // Common elements across pages
    addRevealClass('.service-card', 'reveal', null, true);
    addRevealClass('.feature-box', 'reveal', null, true);
    addRevealClass('.team-member', 'reveal', null, true);
    addRevealClass('.contact-card', 'reveal', null, true);
    addRevealClass('.event-card', 'reveal', null, true);

    // Content sections with left/right animations
    addRevealClass('.service-content:not(.reverse) .service-image', 'reveal', 'left');
    addRevealClass('.service-content:not(.reverse) .service-info', 'reveal', 'right');
    addRevealClass('.service-content.reverse .service-image', 'reveal', 'right');
    addRevealClass('.service-content.reverse .service-info', 'reveal', 'left');

    // Section titles
    addRevealClass('.section-title', 'reveal');

    // Enhance buttons with hover effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.classList.add('hover-lift');
    });

    // Add floating animation to feature icons
    document.querySelectorAll('.feature-icon, .service-icon').forEach(icon => {
        icon.classList.add('animate-float');
    });
});
