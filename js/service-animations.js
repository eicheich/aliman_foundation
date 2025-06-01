/**
 * Al Iman Foundation - Service Card Animation
 * Adds animation classes to service cards for a more dynamic presentation
 */

document.addEventListener('DOMContentLoaded', function () {
    // Add animation classes to service cards
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach((card, index) => {
        // Add animation classes with staggered delay
        card.classList.add('card-hover-effect', 'reveal');
        card.style.animationDelay = `${index * 0.1}s`;

        // Add hover animation to service icons
        const icon = card.querySelector('.service-icon');
        if (icon) {
            icon.classList.add('animate-float');
        }

        // Add hover effect to buttons
        const button = card.querySelector('.btn');
        if (button) {
            button.classList.add('hover-lift');
        }
    });

    // Add special effect to CTA section
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
        ctaSection.classList.add('reveal');

        const ctaButton = ctaSection.querySelector('.btn');
        if (ctaButton) {
            ctaButton.classList.add('animate-pulse');
        }
    }
});
