document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Navbar Scroll Effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Parallax Effect
    const heroImage = document.querySelector('.hero-image img');
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        heroImage.style.transform = `translateY(${scrollPosition * 0.3}px)`;
    });
    
    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Scroll Animations
    function checkScroll() {
        const statItems = document.querySelectorAll('.stat-item');
        const scaleElements = document.querySelectorAll('.scale-on-scroll');
        
        statItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                item.classList.add('animated');
                if (!counters[0].classList.contains('animated')) {
                    animateCounters();
                    counters.forEach(c => c.classList.add('animated'));
                }
            }
        });
        
        scaleElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Run once on load
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // Initialize all animations
    setTimeout(() => {
        document.querySelector('.hero-content').style.opacity = '1';
    }, 100);
});


document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.leader-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentIndex = 0;
    const slideCount = slides.length;
    
    // Set animation order for elements
    function setAnimationOrder() {
        const activeSlide = document.querySelector('.leader-slide.active');
        if (activeSlide) {
            const elements = activeSlide.querySelectorAll('.leader-details > *');
            elements.forEach((el, index) => {
                el.style.setProperty('--order', index);
            });
        }
    }
    
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Update slides
        slides.forEach((slide, index) => {
            const wasActive = slide.classList.contains('active');
            slide.classList.toggle('active', index === currentIndex);
            
            // Trigger animations when slide becomes active
            if (!wasActive && index === currentIndex) {
                setAnimationOrder();
            }
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Initialize
    setAnimationOrder();
    updateCarousel();
    
    // Optional: Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const heroImages = document.querySelectorAll('.hero-image img');
    
    heroImages.forEach(img => {
        // Add mouseenter event
        img.parentElement.addEventListener('mouseenter', function() {
            img.classList.add('zoomed');
        });
        
        // Add mouseleave event
        img.parentElement.addEventListener('mouseleave', function() {
            img.classList.remove('zoomed');
        });
        
        // Force reflow hack
        void img.offsetWidth;
    });
});

document.addEventListener('DOMContentLoaded', function() {
  const heroTitle = document.querySelector('.hero-title');
  
  // First check - run immediately if already visible
  if (isElementInViewport(heroTitle)) {
    heroTitle.classList.add('animate-in');
  }
  
  // Then set up scroll listener
  window.addEventListener('scroll', function() {
    if (isElementInViewport(heroTitle)) {
      heroTitle.classList.add('animate-in');
    }
  });

  function isElementInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight * 0.8) &&
      rect.bottom >= 0
    );
  }
});

document.addEventListener('DOMContentLoaded', function() {
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            document.getElementById('formLoading').style.display = 'block';
            contactForm.querySelector('.button-text').style.visibility = 'hidden';
            
            // Simulate form submission
            setTimeout(function() {
                document.getElementById('formLoading').style.display = 'none';
                contactForm.style.display = 'none';
                document.getElementById('formSuccess').style.display = 'block';
                
                // Reset form after 5 seconds
                setTimeout(function() {
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    document.getElementById('formSuccess').style.display = 'none';
                    contactForm.querySelector('.button-text').style.visibility = 'visible';
                }, 5000);
            }, 2000);
        });
    }

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and content
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.querySelector(`.tab-content[data-tab="${tabName}"]`).classList.add('active');
        });
    });

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Intersection Observer for animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.slide-in-left, .slide-in-right, .fade-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(element => {
            element.style.opacity = '0';
            if (element.classList.contains('slide-in-left')) {
                element.style.transform = 'translateX(-50px)';
            } else if (element.classList.contains('slide-in-right')) {
                element.style.transform = 'translateX(50px)';
            }
            observer.observe(element);
        });
    };
    
    // Initialize animations
    animateOnScroll();
});