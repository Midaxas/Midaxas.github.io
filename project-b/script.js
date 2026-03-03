const yearNode = document.getElementById('year');
const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
}

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((otherButton) => otherButton.classList.remove('active'));
        button.classList.add('active');

        menuItems.forEach((item) => {
            const shouldShow = filter === 'all' || item.dataset.type === filter;
            item.style.display = shouldShow ? 'block' : 'none';
        });
    });
});
