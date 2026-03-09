const yearNode = document.getElementById('year');
const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');
const menuGridNode = document.getElementById('menu-grid');
const menuSortNode = document.getElementById('menu-sort');
const menuMetaNode = document.getElementById('menu-meta');
const specialNode = document.getElementById('special-text');
const nextSpecialButton = document.getElementById('next-special');
const originTickerNode = document.getElementById('origin-ticker');
const rushRangeNode = document.getElementById('rush-range');
const rushLabelNode = document.getElementById('rush-label');

const specials = [
    'Honey Cinnamon Flat White + Almond Biscotti',
    'Maple Oat Cappuccino + Butter Croissant',
    'Cold Brew Tonic + Berry Tart'
];

const origins = [
    'Colombia - Huila, washed process',
    'Ethiopia - Guji, floral natural',
    'Kenya - Kirinyaga, bright citrus',
    'Brazil - Mogiana, chocolate body'
];

let specialIndex = 0;
let activeFilter = 'all';

function visibleMenuItems() {
    return Array.from(menuItems).filter((item) => {
        const type = item.dataset.type;
        return activeFilter === 'all' || type === activeFilter;
    });
}

function updateMenuMeta() {
    if (!menuMetaNode) return;
    const visible = visibleMenuItems().length;
    menuMetaNode.textContent = `${visible} items shown`;
}

function applyFilterState() {
    menuItems.forEach((item) => {
        const type = item.dataset.type;
        const shouldShow = activeFilter === 'all' || type === activeFilter;
        item.style.display = shouldShow ? 'block' : 'none';
    });

    updateMenuMeta();
}

function sortVisibleItems(direction) {
    if (!menuGridNode) return;

    const sorted = Array.from(menuItems).sort((a, b) => {
        const left = Number(a.dataset.price || '0');
        const right = Number(b.dataset.price || '0');

        if (direction === 'low') return left - right;
        if (direction === 'high') return right - left;

        return 0;
    });

    sorted.forEach((item) => {
        menuGridNode.appendChild(item);
    });
}

if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
}

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter || 'all';
        activeFilter = filter;

        filterButtons.forEach((otherButton) => otherButton.classList.remove('active'));
        button.classList.add('active');

        applyFilterState();
    });
});

if (menuSortNode) {
    menuSortNode.addEventListener('change', () => {
        sortVisibleItems(menuSortNode.value);
        applyFilterState();
    });
}

if (nextSpecialButton && specialNode) {
    nextSpecialButton.addEventListener('click', () => {
        specialIndex = (specialIndex + 1) % specials.length;
        specialNode.textContent = specials[specialIndex];
    });
}

if (originTickerNode) {
    let originIndex = 0;
    window.setInterval(() => {
        originIndex = (originIndex + 1) % origins.length;
        originTickerNode.textContent = origins[originIndex];
    }, 4200);
}

if (rushRangeNode && rushLabelNode) {
    const rushLabels = [
        'Calm pace · average wait 4 min',
        'Steady pace · average wait 7 min',
        'Busy rush · average wait 12 min'
    ];

    const updateRushLabel = () => {
        const level = Number(rushRangeNode.value);
        if (level <= 3) rushLabelNode.textContent = rushLabels[0];
        else if (level <= 7) rushLabelNode.textContent = rushLabels[1];
        else rushLabelNode.textContent = rushLabels[2];
    };

    rushRangeNode.addEventListener('input', updateRushLabel);
    updateRushLabel();
}

sortVisibleItems('featured');
applyFilterState();
