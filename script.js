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

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Handle CTA button click
document.querySelector('.cta-button').addEventListener('click', function() {
    const accountsSection = document.getElementById('accounts');
    accountsSection.scrollIntoView({ behavior: 'smooth' });
});

// Handle buy buttons
document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', function() {
        const accountCard = this.closest('.account-card');
        const accountName = accountCard.querySelector('h3').textContent;
        const accountPrice = accountCard.querySelector('.price').textContent;
        
        alert(`Thank you for your interest in: ${accountName}\n\nPrice: ${accountPrice}\n\nPlease proceed to checkout or contact us for more information.`);
    });
});

// Handle contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Here you would typically send this data to a server
        console.log('Form submitted:', { name, email, message });
        
        alert('Thank you for your message! We will get back to you within 24 hours.');
        this.reset();
    });
}

// Add scroll animation for cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideDown 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.account-card, .feature-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Add navbar styling on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    }
});

// Mobile menu toggle (if needed for smaller screens)
const mobileMenuToggle = () => {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
};

console.log('AccountHub website loaded successfully!');
