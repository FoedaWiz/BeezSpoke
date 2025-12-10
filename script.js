// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Scroll Effect and Active Navigation Links (optimized scroll handler)
let lastScroll = 0;
const navbar = document.querySelector('.navbar');
let isScrolling = false;

window.addEventListener('scroll', () => {
    // Use requestAnimationFrame for better performance
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset;
            
            // Update navbar shadow
            if (currentScroll > 100) {
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
            
            // Update active navigation link
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
            
            lastScroll = currentScroll;
            isScrolling = false;
        });
        
        isScrolling = true;
    }
});

// Form Submission Handler
const contactForm = document.getElementById('contactForm');

// Create and add success message element
const successMessage = document.createElement('div');
successMessage.style.cssText = `
    display: none;
    padding: 15px;
    margin-top: 15px;
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
    border-radius: 8px;
    text-align: center;
`;
contactForm.appendChild(successMessage);

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Simple validation
    if (name && email && message) {
        // Sanitize user input to prevent XSS
        const safeName = name.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const safeEmail = email.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        
        // Show success message
        successMessage.textContent = `Thank you, ${safeName}! Your message has been received. We'll get back to you at ${safeEmail} soon.`;
        successMessage.style.display = 'block';
        
        // Reset form
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    } else {
        // Show inline error message
        successMessage.style.backgroundColor = '#f8d7da';
        successMessage.style.color = '#721c24';
        successMessage.style.borderColor = '#f5c6cb';
        successMessage.textContent = 'Please fill in all fields.';
        successMessage.style.display = 'block';
        
        // Hide error message after 3 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
            // Reset colors for next use
            successMessage.style.backgroundColor = '#d4edda';
            successMessage.style.color = '#155724';
            successMessage.style.borderColor = '#c3e6cb';
        }, 3000);
    }
});

// Add animation on scroll for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

// Observe all product cards, benefit items, and feature cards
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .benefit-item, .feature-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});

// Active Navigation Link is now handled in the optimized scroll handler above
