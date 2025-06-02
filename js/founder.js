// Founder section animations
document.addEventListener('DOMContentLoaded', function () {
    // Setup for IntersectionObserver to handle scroll-triggered animations
    const founderCard = document.querySelector('.founder-card');

    if (!founderCard) return;

    // Create an observer for the founder card
    const founderObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% of the element is visible
    });

    // Start observing the founder card
    founderObserver.observe(founderCard);

    // Add hover effect for social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.1)';
        });

        link.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });
});
