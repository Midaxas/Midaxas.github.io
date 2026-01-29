// ============ INITIALIZATION ============
let cart = [];
let wishlist = [];
let recentlyViewed = [];
const PROMO_CODES = {
    'SAVE30': 0.30,
    'WELCOME20': 0.20,
    'SAVE10': 0.10
};

document.addEventListener('DOMContentLoaded', function() {
    initializeAll();
});

function initializeAll() {
    setupNavigation();
    setupSearch();
    setupFilters();
    setupWishlist();
    setupBackToTop();
    setupDarkMode();
    setupModals();
    setupChat();
    setupFAQ();
    setupNewsletter();
    setupCoupon();
    setupAccountCards();
    loadFromStorage();
}

// ============ DARK MODE ============
function setupDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    }
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const enabled = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', enabled ? 'enabled' : 'disabled');
        darkModeToggle.textContent = enabled ? '☀️' : '🌙';
    });
}

// ============ NAVIGATION ============
function setupNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
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

    document.querySelector('.cta-button').addEventListener('click', function() {
        document.getElementById('accounts').scrollIntoView({ behavior: 'smooth' });
    });

    const closeBanner = document.querySelector('.close-banner');
    if (closeBanner) {
        closeBanner.addEventListener('click', function() {
            this.parentElement.style.display = 'none';
        });
    }
}

// ============ SEARCH ============
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    function performSearch() {
        const query = searchInput.value.toLowerCase();
        const cards = document.querySelectorAll('.account-card');
        let found = 0;
        
        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const desc = card.querySelector('.account-description').textContent.toLowerCase();
            
            if (title.includes(query) || desc.includes(query)) {
                card.style.display = 'block';
                found++;
            } else {
                card.style.display = 'none';
            }
        });
        
        if (found === 0 && query.length > 0) {
            alert('No accounts found matching: ' + query);
        }
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') performSearch();
    });
}

// ============ FILTERS & SORTING ============
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sortBy = document.getElementById('sortBy');
    const priceMin = document.getElementById('priceMin');
    const priceMax = document.getElementById('priceMax');
    
    function applyFilters() {
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        const minPrice = parseFloat(priceMin.value) || 0;
        const maxPrice = parseFloat(priceMax.value) || Infinity;
        const sortValue = sortBy.value;
        
        let cards = Array.from(document.querySelectorAll('.account-card'));
        
        // Filter by category
        if (activeFilter !== 'all') {
            cards = cards.filter(card => {
                const category = card.querySelector('.account-badge').textContent.toLowerCase();
                return category.includes(activeFilter.toLowerCase());
            });
        }
        
        // Filter by price
        cards = cards.filter(card => {
            const price = parseFloat(card.dataset.price);
            return price >= minPrice && price <= maxPrice;
        });
        
        // Sort
        cards.sort((a, b) => {
            switch(sortValue) {
                case 'price-low':
                    return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
                case 'price-high':
                    return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
                case 'rating':
                    return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
                default:
                    return 0;
            }
        });
        
        // Show filtered cards
        const grid = document.querySelector('.accounts-grid');
        grid.innerHTML = '';
        cards.forEach(card => {
            grid.appendChild(card.cloneNode(true));
            setupCardEventListeners(grid.lastChild);
        });
        
        if (cards.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No accounts match your criteria</p>';
        }
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            applyFilters();
        });
    });
    
    [sortBy, priceMin, priceMax].forEach(el => {
        el.addEventListener('change', applyFilters);
    });
}

// ============ ACCOUNT CARDS ============
function setupAccountCards() {
    document.querySelectorAll('.account-card').forEach(card => {
        setupCardEventListeners(card);
    });
}

function setupCardEventListeners(card) {
    const buyBtn = card.querySelector('.buy-button');
    const wishlistBtn = card.querySelector('.wishlist-icon');
    const compareCheckbox = card.querySelector('.compare-checkbox');
    
    // Buy button - open detail modal
    if (buyBtn) {
        buyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openAccountDetail(card);
        });
    }
    
    // Wishlist
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function(e) {
            e.preventDefault();
            addToWishlist(card);
        });
    }
    
    // Recently viewed
    card.addEventListener('click', function() {
        addToRecentlyViewed(card);
    });
}

// ============ ACCOUNT DETAIL MODAL ============
function openAccountDetail(card) {
    const modal = document.getElementById('accountModal');
    const modalBody = document.getElementById('modalBody');
    
    const accountName = card.querySelector('h3').textContent;
    const price = card.querySelector('.price').textContent;
    const rating = card.querySelector('.account-rating').textContent;
    const description = card.querySelector('.account-description').textContent;
    const details = Array.from(card.querySelectorAll('.detail')).map(d => d.textContent).join(', ');
    
    modalBody.innerHTML = `
        <h2>${accountName}</h2>
        <p>${description}</p>
        <p><strong>Details:</strong> ${details}</p>
        <p>${rating}</p>
        <p style="font-size: 2rem; color: #e74c3c; margin: 1rem 0;">${price}</p>
        <div style="display: flex; gap: 1rem;">
            <button class="buy-button" style="flex: 1;" onclick="purchaseAccount('${accountName}', '${price}')">Buy Now</button>
            <button class="buy-button" style="flex: 1; background: #f39c12;" onclick="addToCart('${accountName}', '${price}')">Add to Cart</button>
        </div>
    `;
    
    modal.classList.add('show');
}

function purchaseAccount(name, price) {
    alert(`Processing purchase of ${name} for ${price}!\n\nYou will be redirected to payment.`);
    document.getElementById('accountModal').classList.remove('show');
}

function addToCart(name, price) {
    cart.push({name, price: parseFloat(price)});
    updateCartBadge();
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
    document.getElementById('accountModal').classList.remove('show');
}

// ============ WISHLIST ============
function setupWishlist() {
    const wishlistBtn = document.getElementById('wishlistBtn');
    wishlistBtn.addEventListener('click', function() {
        if (wishlist.length === 0) {
            alert('Your wishlist is empty');
            return;
        }
        alert(`You have ${wishlist.length} items in your wishlist:\n${wishlist.join('\n')}`);
    });
}

function addToWishlist(card) {
    const accountName = card.querySelector('h3').textContent;
    const wishlistIcon = card.querySelector('.wishlist-icon');
    
    if (wishlist.includes(accountName)) {
        wishlist = wishlist.filter(item => item !== accountName);
        wishlistIcon.classList.remove('active');
    } else {
        wishlist.push(accountName);
        wishlistIcon.classList.add('active');
    }
    
    updateWishlistBadge();
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function updateWishlistBadge() {
    document.querySelector('.wishlist-badge').textContent = wishlist.length;
}

function updateCartBadge() {
    document.querySelector('.cart-badge').textContent = cart.length;
}

// ============ COMPARISON ============
document.addEventListener('DOMContentLoaded', function() {
    const compareBtn = document.querySelector('.compare-btn');
    if (compareBtn) {
        compareBtn.addEventListener('click', function() {
            const selected = document.querySelectorAll('.compare-checkbox:checked');
            if (selected.length < 2) {
                alert('Please select at least 2 accounts to compare');
                return;
            }
            
            const comparisons = Array.from(selected).map(cb => cb.closest('.account-card')).map(card => {
                return {
                    name: card.querySelector('h3').textContent,
                    price: card.querySelector('.price').textContent,
                    rating: card.querySelector('.account-rating').textContent,
                    details: Array.from(card.querySelectorAll('.detail')).map(d => d.textContent).join(', ')
                };
            });
            
            showComparisonModal(comparisons);
        });
    }
});

function showComparisonModal(accounts) {
    const modal = document.getElementById('comparisonModal');
    const tableDiv = document.getElementById('comparisonTable');
    
    let tableHTML = `
        <table>
            <tr>
                <th>Feature</th>
                ${accounts.map(a => `<th>${a.name}</th>`).join('')}
            </tr>
            <tr>
                <td>Price</td>
                ${accounts.map(a => `<td>${a.price}</td>`).join('')}
            </tr>
            <tr>
                <td>Rating</td>
                ${accounts.map(a => `<td>${a.rating}</td>`).join('')}
            </tr>
            <tr>
                <td>Details</td>
                ${accounts.map(a => `<td>${a.details}</td>`).join('')}
            </tr>
        </table>
    `;
    
    tableDiv.innerHTML = tableHTML;
    modal.classList.add('show');
}

// ============ BACK TO TOP ============
function setupBackToTop() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============ MODALS ============
function setupModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('show');
        });
    });
    
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
            }
        });
    });
}

// ============ FAQ ============
function setupFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const isActive = question.classList.contains('active');
            
            faqQuestions.forEach(q => {
                const item = q.parentElement;
                const ans = item.querySelector('.faq-answer');
                q.classList.remove('active');
                ans.style.display = 'none';
            });
            
            if (!isActive) {
                question.classList.add('active');
                answer.style.display = 'block';
            }
        });
    });
}

// ============ LIVE CHAT ============
function setupChat() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendChat');
    const closeChat = document.getElementById('closeChat');
    const chatWidget = document.getElementById('chatWidget');
    const chatMessages = document.getElementById('chatMessages');
    
    const responses = [
        'Thanks for your message! How can I help?',
        'Our team will respond shortly!',
        'Do you have any other questions about our accounts?',
        'All our accounts are 100% verified and secure!',
        'You can purchase any account and get instant delivery!'
    ];
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-message user';
        userMsg.innerHTML = `<p>${message}</p>`;
        chatMessages.appendChild(userMsg);
        
        chatInput.value = '';
        
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'chat-message bot';
            botMsg.innerHTML = `<p>${responses[Math.floor(Math.random() * responses.length)]}</p>`;
            chatMessages.appendChild(botMsg);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 500);
    }
    
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    closeChat.addEventListener('click', () => {
        chatWidget.style.display = 'none';
    });
}

// ============ NEWSLETTER ============
function setupNewsletter() {
    const form = document.getElementById('newsletterForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing with ${email}!\nYou'll receive exclusive deals soon!`);
        this.reset();
    });
}

// ============ COUPON CODES ============
function setupCoupon() {
    const applyBtn = document.getElementById('applyCouponBtn');
    const couponInput = document.getElementById('couponInput');
    const couponMessage = document.getElementById('couponMessage');
    
    applyBtn.addEventListener('click', () => {
        const code = couponInput.value.toUpperCase().trim();
        
        if (PROMO_CODES[code]) {
            const discount = Math.round(PROMO_CODES[code] * 100);
            couponMessage.textContent = `✓ Coupon applied! ${discount}% discount`;
            couponMessage.classList.add('success');
            couponMessage.classList.remove('error');
        } else if (code === '') {
            couponMessage.textContent = 'Please enter a code';
            couponMessage.classList.remove('success');
            couponMessage.classList.add('error');
        } else {
            couponMessage.textContent = '✗ Invalid coupon code';
            couponMessage.classList.add('error');
            couponMessage.classList.remove('success');
        }
    });
}

// ============ RECENTLY VIEWED ============
function addToRecentlyViewed(card) {
    const accountName = card.querySelector('h3').textContent;
    
    if (!recentlyViewed.includes(accountName)) {
        recentlyViewed.unshift(accountName);
        if (recentlyViewed.length > 5) {
            recentlyViewed.pop();
        }
        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
    }
}

// ============ STORAGE ============
function loadFromStorage() {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    
    if (savedCart) cart = JSON.parse(savedCart);
    if (savedWishlist) wishlist = JSON.parse(savedWishlist);
    
    updateCartBadge();
    updateWishlistBadge();
}

console.log('✅ AccountHub Pro loaded with 35+ features!');
