// --- Animations.js ---
/**
 * Al Iman Foundation - Modern Animation Script
 * Adds scroll reveal animations and interactive elements
 */

document.addEventListener('DOMContentLoaded', function () {
    // Scroll reveal animation for elements with reveal classes
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all elements with reveal classes
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(element => {
        observer.observe(element);
    });

    // Add reveal classes to service cards with staggered delay
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.classList.add('reveal');
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Add reveal classes to team members with staggered delay
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        member.classList.add('reveal');
        member.style.transitionDelay = `${index * 0.1}s`;
    });

    // Add reveal classes to feature boxes
    const featureBoxes = document.querySelectorAll('.feature-box');
    featureBoxes.forEach((box, index) => {
        box.classList.add('reveal');
        box.style.transitionDelay = `${index * 0.1}s`;
    });

    // Add animations to contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.classList.add('reveal');
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Animate header elements
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
        const headerTitle = pageHeader.querySelector('h2');
        const headerText = pageHeader.querySelector('p');
        const breadcrumb = pageHeader.querySelector('.breadcrumb');

        if (headerTitle) headerTitle.classList.add('animate-slide-up');
        if (headerText) headerText.classList.add('animate-slide-up', 'delay-200');
        if (breadcrumb) breadcrumb.classList.add('animate-slide-up', 'delay-300');
    }

    // Animate hero elements
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const heroTitle = heroContent.querySelector('h1');
        const heroText = heroContent.querySelector('p');
        const heroButtons = heroContent.querySelector('.hero-buttons');

        if (heroTitle) heroTitle.classList.add('animate-slide-up');
        if (heroText) heroText.classList.add('animate-slide-up', 'delay-200');
        if (heroButtons) heroButtons.classList.add('animate-slide-up', 'delay-300');
    }

    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let valid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            // Reset error states
            document.querySelectorAll('.form-control').forEach(input => {
                input.classList.remove('error');
            });
            document.querySelectorAll('.error-message').forEach(msg => {
                msg.classList.remove('show');
            });

            // Validate name
            if (!nameInput.value.trim()) {
                valid = false;
                nameInput.classList.add('error');
                nameInput.nextElementSibling.classList.add('show');
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
                valid = false;
                emailInput.classList.add('error');
                emailInput.nextElementSibling.classList.add('show');
            }

            // Validate message
            if (!messageInput.value.trim()) {
                valid = false;
                messageInput.classList.add('error');
                messageInput.nextElementSibling.classList.add('show');
            }

            // If valid, show success message
            if (valid) {
                contactForm.reset();
                document.querySelector('.form-success').classList.add('show');

                // Hide success message after 5 seconds
                setTimeout(() => {
                    document.querySelector('.form-success').classList.remove('show');
                }, 5000);
            }
        });
    }

    // Initialize staggered list animations
    const staggerLists = document.querySelectorAll('.stagger-list');
    staggerLists.forEach(list => {
        list.classList.add('animate');
    });

    // Pulse effect for CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-cta');
    ctaButtons.forEach(button => {
        button.classList.add('animate-pulse');
    });

    // --- Scroll-reveal.js ---
    // Observer for scroll animation
    const observer2 = new IntersectionObserver((entries) => {
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

            observer2.observe(el);
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
