const yearNode = document.getElementById('year');
const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');
const specialNode = document.getElementById('special-text');
const nextSpecialButton = document.getElementById('next-special');

const specials = [
    'Honey Cinnamon Flat White + Almond Biscotti',
    'Maple Oat Cappuccino + Butter Croissant',
    'Cold Brew Tonic + Berry Tart'
];

let specialIndex = 0;

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

if (nextSpecialButton && specialNode) {
    nextSpecialButton.addEventListener('click', () => {
        specialIndex = (specialIndex + 1) % specials.length;
        specialNode.textContent = specials[specialIndex];
    });
}
