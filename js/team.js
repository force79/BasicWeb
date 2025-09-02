document.addEventListener('DOMContentLoaded', function() {
    const directorCard = document.getElementById('directorCard');
    const managerCards = document.querySelectorAll('.manager-card');
    const teamHierarchy = document.getElementById('teamHierarchy');
    const singleManagerView = document.getElementById('singleManagerView');
    const backButton = document.getElementById('backButton');
    
    let draggedCard = null;

    // Add drag events to manager cards
    managerCards.forEach(card => {
        card.addEventListener('dragstart', function(e) {
            draggedCard = this;
            setTimeout(() => {
                this.classList.add('dragging');
            }, 0);
        });

        card.addEventListener('dragend', function() {
            this.classList.remove('dragging');
            directorCard.classList.remove('director-highlight');
        });

        card.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const name = this.querySelector('h3').textContent;
            const role = this.querySelector('.role').textContent;
            
            document.getElementById('singleManagerImg').src = imgSrc;
            document.getElementById('singleManagerName').textContent = name;
            document.getElementById('singleManagerRole').textContent = role;
            
            teamHierarchy.style.display = 'none';
            singleManagerView.classList.add('active');
        });
    });

    // Director card as drop zone
    directorCard.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('director-highlight');
    });

    directorCard.addEventListener('dragleave', function() {
        this.classList.remove('director-highlight');
    });

    directorCard.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('director-highlight');
        
        if (draggedCard) {
            // Show single manager view
            const imgSrc = draggedCard.querySelector('img').src;
            const name = draggedCard.querySelector('h3').textContent;
            const role = draggedCard.querySelector('.role').textContent;
            
            document.getElementById('singleManagerImg').src = imgSrc;
            document.getElementById('singleManagerName').textContent = name;
            document.getElementById('singleManagerRole').textContent = role;
            
            teamHierarchy.style.display = 'none';
            singleManagerView.classList.add('active');
        }
    });

    // Back button functionality
    backButton.addEventListener('click', function() {
        singleManagerView.classList.remove('active');
        teamHierarchy.style.display = 'flex';
    });
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
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
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // Form submission handling
    const callbackForm = document.getElementById('callbackForm');
    if (callbackForm) {
        callbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            
            if (!name || !email || !phone) {
                alert('Please fill in all required fields');
                return;
            }
            
            // In a real application, you would send this data to a server
            alert('Thank you for your request! We will contact you shortly.');
            callbackForm.reset();
        });
    }
    
    // Add animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.offering-card, .philosophy-content, .approach-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animated elements
    document.querySelectorAll('.offering-card, .philosophy-content, .approach-content').forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on load
    animateOnScroll();
});