document.addEventListener('DOMContentLoaded', function() {
    // Form Submission Animation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const originalText = btnText.textContent;
            btnText.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                btnText.textContent = 'Message Sent!';
                submitBtn.style.background = 'linear-gradient(45deg, #4CAF50, #2E7D32)';
                
                // Reset form after animation
                setTimeout(() => {
                    contactForm.reset();
                    btnText.textContent = originalText;
                    submitBtn.style.background = 'linear-gradient(45deg, #7928ca, #00a8b5)';
                    submitBtn.disabled = false;
                    
                    // Show confirmation message
                    const confirmation = document.createElement('div');
                    confirmation.className = 'form-confirmation animate__animated animate__fadeIn';
                    confirmation.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        <p>Thank you! Your message has been sent successfully.</p>
                    `;
                    contactForm.appendChild(confirmation);
                    
                    // Remove confirmation after delay
                    setTimeout(() => {
                        confirmation.classList.add('animate__fadeOut');
                        setTimeout(() => {
                            confirmation.remove();
                        }, 500);
                    }, 3000);
                }, 2000);
            }, 1500);
        });
    }
    
    // Floating Label Enhancement
    const floatingInputs = document.querySelectorAll('.floating-form input, .floating-form textarea');
    
    floatingInputs.forEach(input => {
        // Check if input has value on page load
        if (input.value) {
            const label = input.nextElementSibling;
            label.classList.add('active');
        }
        
        input.addEventListener('focus', function() {
            const label = this.nextElementSibling;
            label.classList.add('active');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                const label = this.nextElementSibling;
                label.classList.remove('active');
            }
        });
    });
});

// Contact Form Validation and Interaction
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Add input effects
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        
        formInputs.forEach(input => {
            // Add focus class to parent
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (this.value === '') {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Check if input has value on page load
            if (input.value !== '') {
                input.parentElement.classList.add('focused');
            }
        });
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (field.value.trim() === '') {
                    isValid = false;
                    field.style.borderColor = '#ff3860';
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim() !== '') {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.style.borderColor = '#ff3860';
                }
            }
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.querySelector('span').textContent;
                const originalIcon = submitBtn.innerHTML;
                
                submitBtn.disabled = true;
                submitBtn.querySelector('span').textContent = 'Sending...';
                
                // Simulate API call
                setTimeout(() => {
                    // Show success message
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                    
                    // Reset button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalIcon;
                    submitBtn.querySelector('span').textContent = originalText;
                }, 2000);
            }
        });
    }
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.contact-method, .contact-form-container');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    const animatedElements = document.querySelectorAll('.contact-method, .contact-form-container');
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on load
    window.addEventListener('load', animateOnScroll);
});