// Testimonials loader
document.addEventListener('DOMContentLoaded', function () {
    loadDataFromJson();
    // Initialize animation observer and scrolling after testimonials are loaded
    setTimeout(() => {
        initializeAnimations();
        initializeHorizontalScroll();
        enableTouchScroll();
        addDragIndicators();
        enhanceHorizontalScroll(); // Make sure enhanced scroll is activated
    }, 500);
});

async function loadDataFromJson() {
    try {
        const response = await fetch('data/testimonials.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Create a section for testimonials directly in the DOM
        insertTestimonialsSection(data.testimonials);

    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function insertTestimonialsSection(testimonials) {
    if (!testimonials || testimonials.length === 0) return;

    // Find the Vision & Mission section to place our testimonials after it
    const visionMissionSection = document.querySelector('.vision-mission-section');
    if (!visionMissionSection) return;

    // Create a new section for alumni testimonials
    const testimonialsSection = document.createElement('section');
    testimonialsSection.className = 'section alumni-testimonials-section reveal'; // Create the HTML structure for the testimonials section
    testimonialsSection.innerHTML = `
        <div class="container">
            <h2 class="section-title text-center">Apa Kata Mereka <span style="color: #10B093;">Yang Terdampak</span></h2>
            <p class="section-description text-center">
                Dengarkan langsung pengalaman para alumni yang telah merasakan manfaat dari program dan layanan Al-Iman Foundation
            </p>
            <div class="testimonials-scroll-container">
                <div class="scroll-arrow scroll-left">
                    <i class="fa-solid fa-chevron-left"></i>
                </div>
                <div class="alumni-testimonials-container stagger-list">
                    ${createTestimonialCards(testimonials)}
                </div>
                <div class="scroll-arrow scroll-right">
                    <i class="fa-solid fa-chevron-right"></i>
                </div>
            </div>
        </div>
    `;

    // Insert the new section after the vision & mission section
    visionMissionSection.parentNode.insertBefore(testimonialsSection, visionMissionSection.nextSibling);
}

function createTestimonialCards(testimonials) {
    return testimonials.map((testimonial, index) => {
        // Use default image if photo is not available
        const photoSrc = testimonial.photo || 'img/aiflogo.png';
        // Alternate the animation direction for a more dynamic effect
        const animationClass = index % 2 === 0 ? 'reveal-left' : 'reveal-right';
        // Add staggered animation delay with improved timing
        const animationDelay = `${0.1 + (index * 0.15)}s`;
        // Add subtle rotation for dynamic appearance
        const rotation = index % 2 === 0 ? '0.5deg' : '-0.5deg';
        // Define a custom accent color based on index
        const accentColors = ['#10B093', '#F5A61C', '#4285F4'];
        const accentColor = accentColors[index % accentColors.length];

        return `
            <div class="alumni-testimonial-card ${animationClass}"
                style="transition-delay: ${animationDelay}; transform: rotate(${rotation}); border-top-color: ${accentColor};">
                <div class="testimonial-header">
                    <div class="alumni-photo">
                        <img src="${photoSrc}" alt="${testimonial.name}" onerror="this.src='img/aiflogo.png'">
                    </div>
                    <div class="alumni-info">
                        <h3 class="alumni-name">${testimonial.name}</h3>
                        <p class="alumni-position">${testimonial.position}</p>
                        <p class="alumni-degree">${testimonial.degree}, ${testimonial.year}</p>
                    </div>
                </div>
                <div class="testimonial-quote">
                    <i class="fa-solid fa-quote-left quote-icon" style="color: ${accentColor}"></i>
                    <p>${testimonial.quote}</p>
                </div>
            </div>
        `;
    }).join('');
}

// Function to initialize animations for testimonial elements
function initializeAnimations() {
    // For staggered animations in lists with improved timing
    const staggerLists = document.querySelectorAll('.stagger-list');
    staggerLists.forEach(list => {
        // Add a small delay before animating for better visibility
        setTimeout(() => {
            list.classList.add('animate');
        }, 100);
    });

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

        // Add a small incremental delay based on index for staggered appearance with improved timing
        element.style.transitionDelay = `${0.2 + (index * 0.1)}s`;

        // Add a slight rotation effect based on position
        const rotation = index % 2 === 0 ? '1deg' : '-1deg';
        element.style.transform += ` rotate(${rotation})`;

        enhancedObserver.observe(element);
    });

    // Remove will-change after animations complete to free up resources
    setTimeout(() => {
        document.querySelectorAll('.alumni-testimonial-card').forEach(element => {
            element.style.willChange = 'auto';
        });
    }, 3000); // 3 seconds should be enough for animations to complete
}

// Function to initialize horizontal scrolling functionality
function initializeHorizontalScroll() {
    const scrollContainer = document.querySelector('.alumni-testimonials-container');
    const leftArrow = document.querySelector('.scroll-left');
    const rightArrow = document.querySelector('.scroll-right');

    if (!scrollContainer || !leftArrow || !rightArrow) return;

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

    // Scroll left on left arrow click
    leftArrow.addEventListener('click', () => {
        scrollContainer.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    });

    // Scroll right on right arrow click
    rightArrow.addEventListener('click', () => {
        scrollContainer.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    });

    // Update arrows when scrolling
    scrollContainer.addEventListener('scroll', updateScrollArrows);

    // Initialize arrow states
    setTimeout(updateScrollArrows, 300);

    // Enable touch scrolling gestures
    enableTouchScroll();
}

// Function to enable touch swipe for horizontal scrolling
function enableTouchScroll() {
    const scrollContainer = document.querySelector('.alumni-testimonials-container');
    if (!scrollContainer) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    scrollContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        scrollContainer.style.cursor = 'grabbing';
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
    });

    scrollContainer.addEventListener('mouseleave', () => {
        isDown = false;
        scrollContainer.style.cursor = 'grab';
    });

    scrollContainer.addEventListener('mouseup', () => {
        isDown = false;
        scrollContainer.style.cursor = 'grab';
    });

    scrollContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainer.scrollLeft = scrollLeft - walk;
    });

    // Add grab cursor style
    scrollContainer.style.cursor = 'grab';
}

// Function to add scroll indicator badges on testimonial cards
function addDragIndicators() {
    const scrollContainer = document.querySelector('.alumni-testimonials-container');

    if (!scrollContainer) return;

    // Add drag indicator to first testimonial card
    const firstCard = scrollContainer.querySelector('.alumni-testimonial-card');
    if (firstCard) {
        const dragIndicator = document.createElement('div');
        dragIndicator.className = 'drag-indicator';
        dragIndicator.innerHTML = `
            <div class="drag-icon">
                <i class="fa-solid fa-arrows-left-right"></i>
            </div>
            <div class="drag-text">Geser</div>
        `;
        firstCard.appendChild(dragIndicator);

        // Remove the indicator after user has scrolled
        scrollContainer.addEventListener('scroll', function removeIndicator() {
            if (scrollContainer.scrollLeft > 10) {
                dragIndicator.classList.add('fade-out');
                setTimeout(() => {
                    dragIndicator.remove();
                }, 500);
                scrollContainer.removeEventListener('scroll', removeIndicator);
            }
        });

        // Also remove after a click or touch on any card
        const allCards = scrollContainer.querySelectorAll('.alumni-testimonial-card');
        allCards.forEach(card => {
            card.addEventListener('click', function removeOnClick() {
                if (dragIndicator.parentElement) {
                    dragIndicator.classList.add('fade-out');
                    setTimeout(() => {
                        if (dragIndicator.parentElement) {
                            dragIndicator.remove();
                        }
                    }, 500);
                }
                allCards.forEach(c => c.removeEventListener('click', removeOnClick));
            });
        });
    }
}

// Function to enhance horizontal scrolling with better behavior
function enhanceHorizontalScroll() {
    const scrollContainer = document.querySelector('.alumni-testimonials-container');
    const leftArrow = document.querySelector('.scroll-left');
    const rightArrow = document.querySelector('.scroll-right');
    const testimonialsSection = document.querySelector('.alumni-testimonials-section');

    if (!scrollContainer || !leftArrow || !rightArrow) return;

    // Calculate the scroll amount based on card width with improved precision
    const getScrollAmount = () => {
        const firstCard = scrollContainer.querySelector('.alumni-testimonial-card');
        if (firstCard) {
            // Get precise measurements including margins and gap
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

    // Scroll left on left arrow click with better precision and smooth animation
    leftArrow.onclick = (e) => {
        e.preventDefault();
        const amount = getScrollAmount();
        addScrollingEffect('left');

        scrollContainer.scrollBy({
            left: -amount,
            behavior: 'smooth'
        });
    };

    // Scroll right on right arrow click with better precision and smooth animation
    rightArrow.onclick = (e) => {
        e.preventDefault();
        const amount = getScrollAmount();
        addScrollingEffect('right');

        scrollContainer.scrollBy({
            left: amount,
            behavior: 'smooth'
        });
    };

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

    // Improve scroll snapping on scroll end with better user experience
    let isScrolling;
    scrollContainer.addEventListener('scroll', () => {
        // Clear previous timeout
        window.clearTimeout(isScrolling);

        // Set new timeout to detect end of scrolling
        isScrolling = setTimeout(() => {
            const cardWidth = getScrollAmount();
            const currentScroll = scrollContainer.scrollLeft;
            const snapPoint = Math.round(currentScroll / cardWidth) * cardWidth;

            // Only apply if the difference is significant but not too large
            if (Math.abs(currentScroll - snapPoint) > 10 && Math.abs(currentScroll - snapPoint) < cardWidth * 0.6) {
                scrollContainer.scrollTo({
                    left: snapPoint,
                    behavior: 'smooth'
                });
            }
        }, 150); // Wait a short time after scrolling stops
    });

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
