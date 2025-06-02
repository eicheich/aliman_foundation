// Testimonials Animations
document.addEventListener('DOMContentLoaded', function () {
    // Initialize animations for the testimonial section
    initializeTestimonialAnimations();

    // Add event listeners to the scroll arrows
    setupTestimonialScrolling();

    // Enable touch and drag scrolling
    enableTestimonialTouchScroll();
});

// Function to initialize animations for testimonial elements
function initializeTestimonialAnimations() {
    // For reveal animations with better performance options
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Remove observer once animation is applied
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '-20px'
    });

    // Enhanced scroll effects observer with higher quality animations
    const enhancedObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add an enhanced animation class
                entry.target.classList.add('active');
                entry.target.classList.add('enhanced-animation');

                // Remove observer once animation is applied
                enhancedObserver.unobserve(entry.target);
            }
        });
    }, {
        // Use a higher threshold and adjusted margins for a more precise trigger
        threshold: 0.25,
        rootMargin: '-10px 0px -10px 0px'
    });

    // Apply special animations to title and description
    const sectionTitle = document.querySelector('.alumni-testimonials-section .section-title');
    const sectionDesc = document.querySelector('.alumni-testimonials-section .section-description');

    if (sectionTitle) {
        sectionTitle.classList.add('reveal-special');
        enhancedObserver.observe(sectionTitle);
    }

    if (sectionDesc) {
        sectionDesc.classList.add('reveal-special');
        sectionDesc.style.transitionDelay = '0.15s';
        enhancedObserver.observe(sectionDesc);
    }

    // Observe testimonial section elements
    document.querySelectorAll('.alumni-testimonials-section, .reveal, .reveal-left, .reveal-right').forEach(element => {
        observer.observe(element);
    });

    // Observe individual testimonial cards for animation with improved performance
    document.querySelectorAll('.alumni-testimonial-card').forEach((element, index) => {
        // Add will-change property for better performance
        element.style.willChange = 'opacity, transform';

        // Add a small incremental delay based on index for staggered appearance
        element.style.transitionDelay = `${0.2 + (index * 0.1)}s`;

        enhancedObserver.observe(element);
    });

    // Remove will-change after animations complete to free up resources
    setTimeout(() => {
        document.querySelectorAll('.alumni-testimonial-card').forEach(element => {
            element.style.willChange = 'auto';
        });
    }, 3000); // 3 seconds should be enough for animations to complete
}

// Function to set up testimonial scrolling
function setupTestimonialScrolling() {
    const scrollContainer = document.querySelector('.alumni-testimonials-container');
    const leftArrow = document.querySelector('.scroll-left');
    const rightArrow = document.querySelector('.scroll-right');
    const testimonialsSection = document.querySelector('.alumni-testimonials-section');

    if (!scrollContainer || !leftArrow || !rightArrow) return;

    // Calculate the scroll amount based on card width with improved precision
    const getScrollAmount = () => {
        const firstCard = scrollContainer.querySelector('.alumni-testimonial-card');
        if (firstCard) {
            // Get precise measurements including margins and gaps
            const cardStyle = window.getComputedStyle(firstCard);
            const cardWidth = firstCard.offsetWidth;
            const marginRight = parseInt(cardStyle.marginRight, 10) || 0;
            const marginLeft = parseInt(cardStyle.marginLeft, 10) || 0;
            return cardWidth + marginRight + marginLeft;
        }
        return 300; // Default fallback
    };

    // Add visual feedback for scrolling
    const addScrollingEffect = (direction = 'right') => {
        if (testimonialsSection) {
            testimonialsSection.classList.add('scrolling');
            testimonialsSection.classList.add(`scrolling-${direction}`);
            setTimeout(() => {
                testimonialsSection.classList.remove('scrolling');
                testimonialsSection.classList.remove(`scrolling-${direction}`);
            }, 600);
        }
    };

    // Function to check if scroll arrows should be visible
    function updateScrollArrows() {
        if (scrollContainer.scrollLeft <= 0) {
            leftArrow.style.opacity = '0.4';
            leftArrow.style.pointerEvents = 'none';
        } else {
            leftArrow.style.opacity = '0.8';
            leftArrow.style.pointerEvents = 'auto';
        }

        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10) {
            rightArrow.style.opacity = '0.4';
            rightArrow.style.pointerEvents = 'none';
        } else {
            rightArrow.style.opacity = '0.8';
            rightArrow.style.pointerEvents = 'auto';
        }
    }

    // Scroll left on left arrow click with better precision and smooth animation
    leftArrow.addEventListener('click', (e) => {
        e.preventDefault();
        const amount = getScrollAmount();
        addScrollingEffect('left');

        scrollContainer.scrollBy({
            left: -amount,
            behavior: 'smooth'
        });
    });

    // Scroll right on right arrow click with better precision and smooth animation
    rightArrow.addEventListener('click', (e) => {
        e.preventDefault();
        const amount = getScrollAmount();
        addScrollingEffect('right');

        scrollContainer.scrollBy({
            left: amount,
            behavior: 'smooth'
        });
    });

    // Add keyboard navigation support with improved visual feedback
    document.addEventListener('keydown', (e) => {
        // Only handle keyboard navigation when focus is on body or the testimonials section
        if (testimonialsSection &&
            (document.activeElement === document.body ||
                testimonialsSection.contains(document.activeElement))) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                addScrollingEffect('left');
                scrollContainer.scrollBy({
                    left: -getScrollAmount(),
                    behavior: 'smooth'
                });
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                addScrollingEffect('right');
                scrollContainer.scrollBy({
                    left: getScrollAmount(),
                    behavior: 'smooth'
                });
            }
        }
    });

    // Update arrows when scrolling
    scrollContainer.addEventListener('scroll', updateScrollArrows);

    // Add mousewheel support for horizontal scrolling
    scrollContainer.addEventListener('wheel', (e) => {
        // Prevent the default vertical scroll
        e.preventDefault();

        // Calculate scroll amount - use smaller increment for wheel
        const wheelScrollAmount = getScrollAmount() * 0.5;

        // Determine scroll direction based on deltaY
        const scrollDirection = e.deltaY > 0 ? 1 : -1;

        // Add visual feedback
        addScrollingEffect(scrollDirection > 0 ? 'right' : 'left');

        // Apply smooth scroll
        scrollContainer.scrollBy({
            left: wheelScrollAmount * scrollDirection,
            behavior: 'smooth'
        });
    }, {
        passive: false
    }); // passive: false is needed to prevent default

    // Add horizontal mouse wheel support (for touch pads that support horizontal scrolling)
    scrollContainer.addEventListener('wheel', (e) => {
        if (e.deltaX !== 0) {
            // If there's horizontal scroll input, use it directly
            e.preventDefault();

            // Add visual feedback
            addScrollingEffect(e.deltaX > 0 ? 'right' : 'left');

            // Apply smooth scroll using the horizontal delta
            scrollContainer.scrollBy({
                left: e.deltaX * 2, // Amplify the effect slightly
                behavior: 'smooth'
            });
        }
    }, {
        passive: false
    });

    // Initialize arrow states
    setTimeout(updateScrollArrows, 300);

    // Add focus effect when hovering cards to improve interactivity
    const cards = document.querySelectorAll('.alumni-testimonial-card');
    cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
            cards.forEach(c => c.classList.remove('focus'));
            card.classList.add('focus');
        });
    });

    scrollContainer.addEventListener('mouseleave', () => {
        cards.forEach(c => c.classList.remove('focus'));
    });
}

// Function to enable touch swipe for horizontal scrolling
function enableTestimonialTouchScroll() {
    const scrollContainer = document.querySelector('.alumni-testimonials-container');
    if (!scrollContainer) return;

    let isDown = false;
    let startX;
    let startY;
    let scrollLeft;
    let startTime;
    let isScrolling = false;

    // Mouse events for desktop drag scrolling
    scrollContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        scrollContainer.style.cursor = 'grabbing';
        startX = e.pageX - scrollContainer.offsetLeft;
        startY = e.pageY;
        scrollLeft = scrollContainer.scrollLeft;
        startTime = new Date().getTime();
    });

    scrollContainer.addEventListener('mouseleave', () => {
        isDown = false;
        scrollContainer.style.cursor = 'grab';
    });

    scrollContainer.addEventListener('mouseup', (e) => {
        if (!isDown) return;

        const endTime = new Date().getTime();
        const timeElapsed = endTime - startTime;
        const endX = e.pageX - scrollContainer.offsetLeft;
        const distance = endX - startX;

        // Add inertia for quick swipes
        if (timeElapsed < 300 && Math.abs(distance) > 30) {
            const momentum = distance * 3; // Amplify the momentum effect
            scrollContainer.scrollBy({
                left: -momentum,
                behavior: 'smooth'
            });
        }

        isDown = false;
        scrollContainer.style.cursor = 'grab';
        isScrolling = false;
    });

    scrollContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();

        const x = e.pageX - scrollContainer.offsetLeft;
        const y = e.pageY;

        // Check if it's more horizontal than vertical scrolling
        if (!isScrolling) {
            if (Math.abs(x - startX) > Math.abs(y - startY)) {
                isScrolling = true;
            } else {
                isDown = false;
                return; // Let vertical scrolling happen naturally
            }
        }

        const walk = (x - startX) * 1.5;
        scrollContainer.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    scrollContainer.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        isDown = true;
        startX = touch.pageX - scrollContainer.offsetLeft;
        startY = touch.pageY;
        scrollLeft = scrollContainer.scrollLeft;
        startTime = new Date().getTime();
    }, {
        passive: true
    });

    scrollContainer.addEventListener('touchend', (e) => {
        if (!isDown) return;

        const endTime = new Date().getTime();
        const timeElapsed = endTime - startTime;

        // Only apply momentum if we were actually scrolling horizontally
        if (isScrolling && timeElapsed < 300) {
            // Calculate the momentum based on how fast the swipe was
            const touchDistance = scrollContainer.scrollLeft - scrollLeft;
            const momentum = (touchDistance / timeElapsed) * 100;

            scrollContainer.scrollBy({
                left: momentum,
                behavior: 'smooth'
            });
        }

        isDown = false;
        isScrolling = false;
    }, {
        passive: true
    });

    scrollContainer.addEventListener('touchmove', (e) => {
        if (!isDown) return;

        const touch = e.touches[0];
        const x = touch.pageX - scrollContainer.offsetLeft;
        const y = touch.pageY;

        // Determine if scrolling horizontal or vertical
        if (!isScrolling) {
            if (Math.abs(x - startX) > Math.abs(y - startY)) {
                isScrolling = true;
                e.preventDefault(); // Prevent page scrolling when scrolling horizontally
            } else {
                isDown = false;
                return; // Let vertical scrolling happen naturally
            }
        } else {
            e.preventDefault();
        }

        const walk = (x - startX) * 1.2;
        scrollContainer.scrollLeft = scrollLeft - walk;
    }, {
        passive: false
    });

    // Add grab cursor style
    scrollContainer.style.cursor = 'grab';

    // Add visual indicator for scrollability
    const addScrollIndicator = () => {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        indicator.innerHTML = `
            <div class="scroll-hint">
                <i class="fa-solid fa-arrow-left-right"></i>
                <span>Scroll</span>
            </div>
        `;

        scrollContainer.parentNode.appendChild(indicator);

        // Remove the indicator after first interaction
        const removeIndicator = () => {
            indicator.classList.add('fade-out');
            setTimeout(() => {
                if (indicator.parentNode) {
                    indicator.parentNode.removeChild(indicator);
                }
            }, 500);

            scrollContainer.removeEventListener('scroll', removeIndicator);
            scrollContainer.removeEventListener('mousedown', removeIndicator);
            scrollContainer.removeEventListener('touchstart', removeIndicator);
            document.removeEventListener('keydown', removeIndicator);
        };

        scrollContainer.addEventListener('scroll', removeIndicator, {
            once: true
        });
        scrollContainer.addEventListener('mousedown', removeIndicator, {
            once: true
        });
        scrollContainer.addEventListener('touchstart', removeIndicator, {
            once: true
        });
        document.addEventListener('keydown', removeIndicator, {
            once: true
        });
    };

    // Add scroll indicator after a short delay
    setTimeout(addScrollIndicator, 2000);
}
