/**
 * Al Iman Foundation - Consistency Checker
 * This script can be run to verify consistency across pages
 * It checks for required elements, styles, and scripts
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log('Running consistency check...');

    // Check if all required CSS files are loaded
    const requiredCSS = [
        'styles.css',
        'css/footer.css',
        'css/header.css',
        'css/animations.css'
    ];

    const loadedCSS = Array.from(document.styleSheets)
        .map(sheet => {
            try {
                return sheet.href ? new URL(sheet.href).pathname.split('/').pop() : '';
            } catch (e) {
                return '';
            }
        })
        .filter(Boolean);

    console.log('CSS files check:');
    requiredCSS.forEach(css => {
        const found = loadedCSS.some(loaded => loaded.includes(css));
        console.log(`- ${css}: ${found ? '✓' : '✗'}`);
    });

    // Check if all required scripts are loaded
    const requiredScripts = [
        'components-enhanced.js',
        'animations.js',
        'scroll-reveal.js'
    ];

    const loadedScripts = Array.from(document.scripts)
        .map(script => {
            try {
                return script.src ? new URL(script.src).pathname.split('/').pop() : '';
            } catch (e) {
                return '';
            }
        })
        .filter(Boolean);

    console.log('JavaScript files check:');
    requiredScripts.forEach(script => {
        const found = loadedScripts.some(loaded => loaded.includes(script));
        console.log(`- ${script}: ${found ? '✓' : '✗'}`);
    });

    // Check for required HTML elements
    const requiredElements = [{
            selector: '#nav-placeholder',
            name: 'Navigation placeholder'
        },
        {
            selector: '#footer-placeholder',
            name: 'Footer placeholder'
        },
        {
            selector: '.container',
            name: 'Container element'
        }
    ];

    console.log('Required elements check:');
    requiredElements.forEach(element => {
        const found = document.querySelector(element.selector);
        console.log(`- ${element.name}: ${found ? '✓' : '✗'}`);
    });

    // Check for color consistency
    const elementsToCheck = [{
            selector: 'a',
            property: 'color'
        },
        {
            selector: '.btn',
            property: 'background-color'
        },
        {
            selector: '.page-header',
            property: 'background'
        }
    ];

    console.log('Color consistency check:');
    elementsToCheck.forEach(element => {
        const elements = document.querySelectorAll(element.selector);
        if (elements.length > 0) {
            const firstValue = window.getComputedStyle(elements[0])[element.property];
            let consistent = true;

            for (let i = 1; i < elements.length; i++) {
                const value = window.getComputedStyle(elements[i])[element.property];
                if (value !== firstValue) {
                    consistent = false;
                    break;
                }
            }

            console.log(`- ${element.selector} (${element.property}): ${consistent ? '✓' : '✗'}`);
        } else {
            console.log(`- ${element.selector} (${element.property}): Not found`);
        }
    });

    console.log('Consistency check complete');
});
