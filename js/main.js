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
    }); // Load testimonials from JSON data
    async function loadTestimonials() {
        try {
            const response = await fetch('data/testimonials.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            let testimonials = data.testimonials;
            const testimonialsContainer = document.getElementById('testimonials-container');
            if (!testimonialsContainer) return;
            // Only use testimonials with photo that exists in the folder, or fallback to logo
            testimonials = testimonials.map(t => {
                // Only allow jpgs that exist, or fallback
                let allowed = ['ibnushina.jpg', 'rifqi.jpg', 'dadang.jpg'];
                let photoFile = t.photo ? t.photo.split('/').pop() : '';
                if (!allowed.includes(photoFile)) {
                    t.photo = 'img/aiflogo.png';
                }
                return t;
            });
            // Define color schemes for quote icons
            const quoteColors = ['#10b093', '#f5a61c', '#4285f4', '#e74c3c', '#9b59b6'];
            testimonialsContainer.innerHTML = '';
            testimonials.forEach((testimonial, index) => {
                const colorIndex = index % quoteColors.length;
                const revealClass = index % 2 === 0 ? 'reveal-left' : 'reveal-right';
                const testimonialCard = document.createElement('div');
                testimonialCard.className = `alumni-testimonial-card ${revealClass}`;
                testimonialCard.innerHTML = `
                    <div class="testimonial-header">
                        <div class="alumni-photo">
                            <img src="${testimonial.photo}" alt="${testimonial.name}" onerror="this.src='img/aiflogo.png'" />
                        </div>
                        <div class="alumni-info">
                            <h3 class="alumni-name">${testimonial.name}</h3>
                            <p class="alumni-position">${testimonial.position}</p>
                            <p class="alumni-degree">${testimonial.degree ? testimonial.degree + ', ' : ''}${testimonial.year}</p>
                        </div>
                    </div>
                    <div class="testimonial-quote">
                        <i class="fa-solid fa-quote-left quote-icon" style="color: ${quoteColors[colorIndex]}"></i>
                        <p>${testimonial.quote}</p>
                    </div>
                `;
                testimonialsContainer.appendChild(testimonialCard);
            });
            // Re-observe the new testimonial cards for animations
            document.querySelectorAll('.alumni-testimonial-card').forEach(card => {
                if (typeof observer !== 'undefined') observer.observe(card);
            });
        } catch (error) {
            const testimonialsContainer = document.getElementById('testimonials-container');
            if (testimonialsContainer) {
                testimonialsContainer.innerHTML = '<p style="text-align: center; color: #666;">Unable to load testimonials at the moment.</p>';
            }
        }
    }
    loadTestimonials();

    // Testimonials horizontal scroll functionality
    const scrollContainer = document.querySelector('.alumni-testimonials-container');
    const scrollLeftBtn = document.querySelector('.scroll-left');
    const scrollRightBtn = document.querySelector('.scroll-right');

    if (scrollContainer && scrollLeftBtn && scrollRightBtn) {
        const cardWidth = 380; // Approximate width of one card plus gap

        scrollLeftBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({
                left: -cardWidth,
                behavior: 'smooth'
            });
        });

        scrollRightBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({
                left: cardWidth,
                behavior: 'smooth'
            });
        });

        // Update arrow visibility based on scroll position
        function updateArrows() {
            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            const currentScroll = scrollContainer.scrollLeft;

            scrollLeftBtn.style.opacity = currentScroll > 0 ? '1' : '0.5';
            scrollRightBtn.style.opacity = currentScroll < maxScroll ? '1' : '0.5';
        }

        scrollContainer.addEventListener('scroll', updateArrows);
        updateArrows(); // Initial call
    }
});
