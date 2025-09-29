// Enhanced JavaScript for complete functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const toggleBtn = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            navbar.classList.toggle('open');
            toggleBtn.setAttribute('aria-expanded', 
                navbar.classList.contains('open')
            );
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('open');
        });
    });

    // Enhanced scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate language progress bars when they come into view
                if (entry.target.classList.contains('language-item')) {
                    const progressFill = entry.target.querySelector('.progress-fill');
                    const percent = entry.target.getAttribute('data-percent');
                    if (progressFill) {
                        progressFill.style.width = percent + '%';
                    }
                }
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animatableElements = [
        '.company-card',
        '.education-item', 
        '.timeline-item',
        '.skill-category',
        '.language-item',
        '.hobby-item',
        'section'
    ];

    animatableElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            observer.observe(el);
        });
    });

    // Back to top button visibility
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced modal functionality
    const modal = document.getElementById('contactModal');
    
    window.showModal = function() {
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeModal = function() {
        if (modal) {
            modal.classList.add('closing');
            setTimeout(() => {
                modal.style.display = 'none';
                modal.classList.remove('closing');
                document.body.style.overflow = '';
            }, 300);
        }
    };

    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // Initialize language progress bars
    document.querySelectorAll('.language-item').forEach(item => {
        const percent = item.getAttribute('data-percent');
        const fill = item.querySelector('.progress-fill');
        if (fill) {
            // Don't animate immediately, wait for intersection observer
            fill.style.width = '0%';
        }
    });
});

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Biography expansion function
function expandBio() {
    const bioExcerpt = document.getElementById('bioExcerpt');
    const bioFull = document.getElementById('bioFull');
    const readMoreButton = document.querySelector('.read-more');
    
    if (bioFull.style.display === 'none' || bioFull.style.display === '') {
        bioFull.style.display = 'block';
        bioExcerpt.style.display = 'none';
        readMoreButton.textContent = 'Read Less';
        readMoreButton.classList.add('expanded');
    } else {
        bioFull.style.display = 'none';
        bioExcerpt.style.display = 'block';
        readMoreButton.textContent = 'Read More';
        readMoreButton.classList.remove('expanded');
    }
}