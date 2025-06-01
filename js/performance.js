/**
 * Al Iman Foundation - Performance Optimizer
 * Script to enhance site performance and loading
 */

// Detect when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize performance tracking
    const startTime = performance.now();

    // Defer non-critical scripts
    deferNonCriticalScripts();

    // Lazy load images
    setupLazyLoading();

    // Preload critical pages
    preloadCriticalPages();

    // Log performance timing
    window.addEventListener('load', function () {
        const loadTime = performance.now() - startTime;
        console.log(`Page fully loaded in ${loadTime.toFixed(2)}ms`);
    });
});

// Function to defer non-critical scripts
function deferNonCriticalScripts() {
    // Add defer attribute to non-critical scripts
    const nonCriticalScripts = [
        'animations.js',
        'scroll-reveal.js',
        'service-animations.js'
    ];

    document.querySelectorAll('script').forEach(script => {
        if (script.src) {
            const scriptName = script.src.split('/').pop();
            if (nonCriticalScripts.includes(scriptName)) {
                script.defer = true;
            }
        }
    });
}

// Function to set up lazy loading for images
function setupLazyLoading() {
    // Use native lazy loading if supported
    if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img').forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const lazyImages = document.querySelectorAll('img:not([loading])');

        const lazyLoadObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');

                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }

                    lazyLoadObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            // Store original src in data-src
            if (!img.getAttribute('data-src')) {
                img.setAttribute('data-src', img.src);
                img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
            }

            lazyLoadObserver.observe(img);
        });
    }
}

// Function to preload critical pages
function preloadCriticalPages() {
    // Preload critical pages that users are likely to visit next
    const currentPage = window.location.pathname.split('/').pop();

    // Define preload mapping
    const preloadMap = {
        'index.html': ['about.html', 'services.html'],
        'about.html': ['index.html', 'services.html'],
        'services.html': ['contact.html', 'index.html'],
        'contact.html': ['index.html']
    };

    // Get pages to preload based on current page
    const pagesToPreload = preloadMap[currentPage] || [];

    // Preload pages with link prefetch
    pagesToPreload.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
    });
}
