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

// Filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const accountCards = document.querySelectorAll('.account-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.dataset.filter;
        
        accountCards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                const cardCategory = card.querySelector('.account-badge').textContent.toLowerCase();
                if (cardCategory.includes(filterValue.toLowerCase())) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            }
        });
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

// FAQ functionality
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isActive = question.classList.contains('active');
        
        // Close all other answers
        faqQuestions.forEach(q => {
            if (q !== question) {
                q.classList.remove('active');
                q.nextElementSibling.style.display = 'none';
            }
        });
        
        // Toggle current answer
        question.classList.toggle('active');
        answer.style.display = isActive ? 'none' : 'block';
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
        
        console.log('Form submitted:', { name, email, message });
        
        alert('Thank you for your message! We will get back to you within 1 hour.');
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

document.querySelectorAll('.account-card, .feature-card, .testimonial-card').forEach(card => {
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

console.log('AccountHub website loaded successfully!');
