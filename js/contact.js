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

document.getElementById("callbackForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    message: document.getElementById("message").value
  };

  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    const msg = document.getElementById("responseMessage");

    msg.style.display = "block";
    msg.style.color = result.success ? "green" : "red";
    msg.innerText = result.message;

    if (result.success) document.getElementById("callbackForm").reset();
  } catch (err) {
    console.error(err);
    alert("⚠️ Error connecting to server.");
  }
});
