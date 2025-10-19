// Initialize AOS Animation
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Counter Animation
function animateCounters() {
    const counters = [
        { id: 'counter1', target: 20, suffix: '+' },
        { id: 'counter2', target: 20000, suffix: '+' },
        { id: 'counter3', target: 1000, suffix: '+' },
        { id: 'counter4', target: 4.9, suffix: '' }
    ];
    
    counters.forEach(counter => {
        const element = document.getElementById(counter.id);
        if (element) {
            let current = 0;
            const increment = counter.target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= counter.target) {
                    current = counter.target;
                    clearInterval(timer);
                }
                element.textContent = (counter.id === 'counter4' ? current.toFixed(1) : Math.floor(current)) + counter.suffix;
            }, 50);
        }
    });
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
});

const heroSection = document.getElementById('home');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNavbar');
    if (navbar && window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else if (navbar) {
        navbar.classList.remove('scrolled');
    }
});

// Course filter functionality
document.querySelectorAll('.course-filter').forEach(button => {
    button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        // Update active button
        document.querySelectorAll('.course-filter').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Filter courses
        document.querySelectorAll('.course-item').forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Course modal content loader
document.querySelectorAll('[data-course]').forEach(button => {
    button.addEventListener('click', function() {
        const course = this.getAttribute('data-course');
        const modalContent = document.getElementById('courseModalContent');
        
        const courseData = {
            'ielts': {
                title: 'IELTS - International English Language Testing System',
                description: 'Comprehensive IELTS preparation for Academic & General modules',
                features: [
                    'Four skills training (Reading, Writing, Listening, Speaking)',
                    'Regular mock tests with detailed feedback',
                    'Complete study materials and practice tests',
                    'Individual attention and doubt clearing sessions',
                    'Flexible batch timings including weekends'
                ],
                duration: '6-8 weeks',
                batchSize: '8-12 students',
                successRate: '96%',
                targetScore: 'Band 7-9'
            }
        };
        
        const data = courseData[course];
        if (data && modalContent) {
            modalContent.innerHTML = `
                <h4 class="fw-bold mb-3" style="color: var(--primary-dark-blue);">${data.title}</h4>
                <p class="mb-4">${data.description}</p>
                
                <div class="row g-3 mb-4">
                    <div class="col-md-3">
                        <div class="text-center p-3 rounded" style="background: var(--background-light);">
                            <div class="fw-bold" style="color: var(--primary-dark-blue);">${data.duration}</div>
                            <small class="text-muted">Duration</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="text-center p-3 rounded" style="background: var(--background-light);">
                            <div class="fw-bold" style="color: var(--primary-dark-blue);">${data.batchSize}</div>
                            <small class="text-muted">Batch Size</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="text-center p-3 rounded" style="background: var(--background-light);">
                            <div class="fw-bold" style="color: var(--primary-green);">N/A</div>
                            <small class="text-muted">Course Fee</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="text-center p-3 rounded" style="background: var(--background-light);">
                            <div class="fw-bold text-success">${data.successRate}</div>
                            <small class="text-muted">Success Rate</small>
                        </div>
                    </div>
                </div>
                
                <h5 class="fw-bold mb-3" style="color: var(--primary-dark-blue);">Course Features:</h5>
                <ul class="list-unstyled">
                    ${data.features.map(feature => `
                        <li class="mb-2">
                            <i class="fas fa-check text-success me-2"></i>${feature}
                        </li>
                    `).join('')}
                </ul>
                
                <div class="mt-4 text-center">
                    <button class="btn btn-primary-custom me-2" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#bookingModal">
                        <i class="fas fa-calendar-alt me-2"></i>Book Free Demo
                    </button>
                    <a href="tel:+919705454000" class="btn btn-gold-custom">
                        <i class="fas fa-phone me-2"></i>Call for Details
                    </a>
                </div>
            `;
        }
    });
});

// Form submissions
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
    });
}

const demoBookingForm = document.getElementById('demoBookingForm');
if (demoBookingForm) {
    demoBookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Your demo class has been booked! We will contact you soon.');
        const modalElement = document.getElementById('bookingModal');
        if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) modalInstance.hide();
        }
    });
}

const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for subscribing! Welcome to The English Tree family.');
        const modalElement = document.getElementById('newsletterModal');
        if (modalElement) {
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) modalInstance.hide();
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const icon = this.querySelector('i');
        if (icon) {
            if (document.body.classList.contains('dark-mode')) {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        }
    });
}