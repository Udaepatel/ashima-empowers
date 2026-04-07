// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function () {
    var faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var item = btn.parentElement;
            var isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(function (el) {
                el.classList.remove('active');
            });
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// Utility Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Navbar Functionality
let isScrolled = false;

function updateNavbar() {
    const navbar = document.getElementById('navbar');
    const shouldBeScrolled = window.scrollY > 50;
    
    if (shouldBeScrolled !== isScrolled) {
        isScrolled = shouldBeScrolled;
        if (isScrolled) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}

// Mobile Menu
let mobileMenuOpen = false;

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    mobileMenuOpen = !mobileMenuOpen;
    
    if (mobileMenuOpen) {
        mobileMenu.classList.add('active');
        hamburgerIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    } else {
        mobileMenu.classList.remove('active');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
}

function closeMobileMenu() {
    if (mobileMenuOpen) {
        toggleMobileMenu();
    }
}

// Intersection Observer for animations
function createObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach((section) => {
        observer.observe(section);
    });

    // Observe individual cards and elements
    document.querySelectorAll('.service-card, .stat-card, .testimonial-card, .pricing-card').forEach((card) => {
        observer.observe(card);
    });
}

// Form handling
function handleContactForm(event) {
    event.preventDefault();
    
    const submitButton = document.querySelector('.contact-form button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = `
        <div class="loading-spinner"></div>
        <span>Sending Request<span class="loading-dots">...</span></span>
    `;
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        const formContainer = document.querySelector('.contact-form-container');
        formContainer.innerHTML = `
            <div class="success-message">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/>
                </svg>
                <p>Thank you! Your reading request has been received. Ashima will contact you within 24 hours to schedule your session. ✨</p>
            </div>
        `;
    }, 2000);
}

// Testimonials carousel (if needed)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Parallax effects
function handleParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    parallaxElements.forEach((element) => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Loading animations
function addLoadingDots() {
    const dots = document.querySelectorAll('.loading-dots');
    dots.forEach(dot => {
        let count = 0;
        setInterval(() => {
            count = (count + 1) % 4;
            dot.textContent = '.'.repeat(count);
        }, 500);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navbar functionality
    updateNavbar();
    window.addEventListener('scroll', updateNavbar);
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize intersection observer for animations
    createObserver();
    
    // Initialize parallax effects
    window.addEventListener('scroll', handleParallax);
    
    // Initialize loading dots
    addLoadingDots();
    
    // Initialize form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const navbar = document.getElementById('navbar');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuOpen && !navbar.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && mobileMenuOpen) {
            closeMobileMenu();
        }
    });
    
    // Initialize testimonial carousel if exists
    if (testimonials.length > 0) {
        showTestimonial(0);
        
        // Auto-rotate testimonials
        setInterval(nextTestimonial, 5000);
    }
    
    console.log('Ashima Empowers website initialized successfully! ✨');
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    /* Animation styles */
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    section.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .service-card,
    .stat-card,
    .testimonial-card,
    .pricing-card {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.6s ease;
    }
    
    .service-card.animate-in,
    .stat-card.animate-in,
    .testimonial-card.animate-in,
    .pricing-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .loading-spinner {
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top: 2px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        display: inline-block;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .success-message {
        background: rgba(164, 189, 132, 0.1);
        border: 1px solid rgba(164, 189, 132, 0.3);
        border-radius: 1rem;
        padding: 2rem;
        text-align: center;
    }
    
    .success-message svg {
        width: 3rem;
        height: 3rem;
        color: var(--color-a4bd84);
        margin-bottom: 1rem;
    }
    
    .success-message p {
        color: var(--color-a4bd84);
        font-weight: 500;
    }
    
    /* Responsive adjustments */
    @media (max-width: 640px) {
        .hero-content {
            max-width: none;
        }
        
        .hero-description {
            max-width: none;
        }
        
        .container {
            max-width: none;
        }
    }
`;

document.head.appendChild(style);


// Show button after a small scroll (e.g., 80px)
(function(){
    const btn = document.querySelector('.back-to-top');
    const SHOW_AT = 80;
  
    // If you don't have scrollToSection('hero'), fallback to smooth scroll to top
    btn?.addEventListener('click', function(e){
      // If your scrollToSection exists, your inline onclick will handle it.
      // This is just a safety net if you remove onclick later:
      if (typeof scrollToSection !== 'function') {
        e.preventDefault();
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
      }
    });
  
    const onScroll = () => {
      if (window.scrollY > SHOW_AT) btn.classList.add('show');
      else btn.classList.remove('show');
    };
  
    // Passive listener for performance
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // set initial state
  })();
  