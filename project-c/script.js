const yearNode = document.getElementById('year');
const faqItems = document.querySelectorAll('.faq-item');

if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
}

faqItems.forEach((item, index) => {
    if (index > 0) {
        item.classList.add('closed');
    }

    const button = item.querySelector('.faq-q');
    if (!button) return;

    button.addEventListener('click', () => {
        item.classList.toggle('closed');
    });
});
