/**
 * Al Iman Foundation - Components Loader
 * Enhanced version that handles all component loading with animations
 */

// Load components and initialize animations
document.addEventListener('DOMContentLoaded', function () {
    // Load navbar and footer components
    loadComponent("navbar", "nav-placeholder").then(() => {
        // Highlight active nav item based on current page
        highlightActiveNavItem();
    });

    loadComponent("footer", "footer-placeholder");
});

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

        // Insert the component HTML
        if (placeholder) {
            placeholder.innerHTML = html;
            placeholder.classList.remove('loading');
            placeholder.classList.add('loaded');

            // Trigger reveal animation
            setTimeout(() => {
                placeholder.classList.add('revealed');
            }, 100);
        }

        return true;
    } catch (error) {
        console.error(`Error loading ${componentName} component:`, error);
        return false;
    }
}

// Function to highlight active nav item
function highlightActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');

        // Check if href matches current page
        if (href === currentPage ||
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
