/**
 * Al Iman Foundation Website Components
 * Modern implementation for loading components dynamically
 */

// Function to load HTML components with fade-in effect
async function loadComponent(componentName, elementId) {
    try {
        const placeholder = document.getElementById(elementId);

        // Add loading state
        if (placeholder) {
            placeholder.classList.add('loading');
        }

        const response = await fetch(`components/${componentName}.html`);

        if (!response.ok) {
            throw new Error(`Failed to load ${componentName}: ${response.status} ${response.statusText}`);
        }

        const html = await response.text();

        if (placeholder) {
            // Insert the HTML with fade-in effect
            placeholder.innerHTML = html;

            // Wait a bit and remove loading class for animation
            setTimeout(() => {
                placeholder.classList.remove('loading');
                placeholder.classList.add('loaded');

                // If this is the navbar, set the active class
                if (componentName === 'navbar') {
                    setActiveNavLink();
                }
            }, 100);
        }
    } catch (error) {
        console.error(`Error loading ${componentName}:`, error);
    }
}

// Function to set the active navigation link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop().split('.')[0] || 'index';
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('data-page');
        if ((currentPage === 'index' && linkPage === 'home') || currentPage === linkPage) {
            link.classList.add('active');

            // Add animation to active link
            link.classList.add('link-active-animation');
        } else {
            link.classList.remove('active');
            link.classList.remove('link-active-animation');
        }
    });
}

// Add scroll effects for elements
function addScrollEffects() {
    const elementsToAnimate = document.querySelectorAll(
        '.feature-box, .event-card, .service-card, .team-member, .facility-box, .service-content, .link-card, .event-list li, .whatsapp-features .feature'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elementsToAnimate.forEach(element => {
        element.classList.add('scroll-animation');
        observer.observe(element);
    });
}

// Add CSS for animations
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .loading { opacity: 0; transition: opacity 0.3s ease; }
        .loaded { opacity: 1; }

        .scroll-animation {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .scroll-animation.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .link-active-animation {
            animation: pulse 2s ease-in-out;
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            10% { transform: scale(1.05); }
            20% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize the site
function initSite() {
    // Add animation styles
    addAnimationStyles();

    // Load components
    loadComponent('navbar', 'nav-placeholder');
    loadComponent('footer', 'footer-placeholder');

    // Add scroll effects after a delay to ensure page elements are loaded
    setTimeout(addScrollEffects, 500);
}

// Load components when the page loads
document.addEventListener('DOMContentLoaded', initSite);
