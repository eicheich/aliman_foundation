/**
 * Al Iman Foundation - Modern Contact Form
 * Enhances the contact form with animations and validation
 */

document.addEventListener('DOMContentLoaded', function () {
    // Animate contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.classList.add('reveal');
        card.style.transitionDelay = `${index * 0.1}s`;

        // Add floating animation to contact icons
        const icon = card.querySelector('.contact-icon');
        if (icon) {
            icon.classList.add('animate-float');
        }
    });

    // Add animation to form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.classList.add('reveal');

        // Enhance form with advanced validation
        const form = document.getElementById('contactForm');
        if (form) {
            const formGroups = form.querySelectorAll('.form-group');

            // Add focus effects to form inputs
            formGroups.forEach(group => {
                const input = group.querySelector('input, textarea, select');
                const label = group.querySelector('label');

                if (input && label) {
                    // Handle focus state
                    input.addEventListener('focus', () => {
                        label.classList.add('active');
                    });

                    // Handle blur state
                    input.addEventListener('blur', () => {
                        if (!input.value.trim()) {
                            label.classList.remove('active');
                        }
                    });

                    // Set initial state if input has value
                    if (input.value.trim()) {
                        label.classList.add('active');
                    }
                }
            });

            // Enhanced form validation
            form.addEventListener('submit', function (e) {
                e.preventDefault();

                let isValid = true;
                const formData = {};

                // Validate each input
                formGroups.forEach(group => {
                    const input = group.querySelector('input, textarea, select');
                    const errorElement = group.querySelector('.error-message');

                    if (input && input.hasAttribute('required')) {
                        let fieldValid = true;

                        // Add to form data
                        formData[input.id] = input.value.trim();

                        // Required field validation
                        if (!input.value.trim()) {
                            fieldValid = false;
                            if (errorElement) {
                                errorElement.innerHTML = 'Kolom ini wajib diisi';
                                errorElement.classList.add('show');
                            }
                        }

                        // Email validation
                        if (input.type === 'email' && input.value.trim()) {
                            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (!emailPattern.test(input.value.trim())) {
                                fieldValid = false;
                                if (errorElement) {
                                    errorElement.innerHTML = 'Format email tidak valid';
                                    errorElement.classList.add('show');
                                }
                            }
                        }

                        // Phone validation
                        if (input.id === 'phone' && input.value.trim()) {
                            const phonePattern = /^[0-9\+\-\s]+$/;
                            if (!phonePattern.test(input.value.trim())) {
                                fieldValid = false;
                                if (errorElement) {
                                    errorElement.innerHTML = 'Format nomor telepon tidak valid';
                                    errorElement.classList.add('show');
                                }
                            }
                        }

                        // Update UI based on validation
                        if (!fieldValid) {
                            isValid = false;
                            input.classList.add('error');
                        } else {
                            input.classList.remove('error');
                            if (errorElement) {
                                errorElement.classList.remove('show');
                            }
                        }
                    }
                });

                // If form is valid, show success message
                if (isValid) {
                    // Show loading state on button
                    const submitButton = form.querySelector('.btn-submit');
                    const originalText = submitButton.innerHTML;

                    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
                    submitButton.disabled = true;

                    // Simulate form submission (in a real app, you'd send data to server)
                    setTimeout(() => {
                        // Show success message
                        const successMessage = document.querySelector('.form-success');
                        if (successMessage) {
                            successMessage.classList.add('show');

                            // Scroll to success message
                            successMessage.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            });
                        }

                        // Reset form
                        form.reset();
                        formGroups.forEach(group => {
                            const label = group.querySelector('label');
                            if (label) {
                                label.classList.remove('active');
                            }
                        });

                        // Reset button
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;

                        // Hide success message after 5 seconds
                        setTimeout(() => {
                            if (successMessage) {
                                successMessage.classList.remove('show');
                            }
                        }, 5000);
                    }, 1500);
                }
            });
        }
    }

    // Animate map container
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        mapContainer.classList.add('reveal');
    }
});
