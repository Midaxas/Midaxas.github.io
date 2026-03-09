const yearNode = document.getElementById('year');
const quoteNode = document.getElementById('quote');
const quoteCreditNode = document.getElementById('quote-credit');
const nextQuoteButton = document.getElementById('next-quote');
const filterButtons = document.querySelectorAll('.filter-btn');
const shots = document.querySelectorAll('.shot');
const galleryMetaNode = document.getElementById('gallery-meta');
const sessionTypeNode = document.getElementById('session-type');
const sessionHoursNode = document.getElementById('session-hours');
const hoursLabelNode = document.getElementById('hours-label');
const deliverySpeedNode = document.getElementById('delivery-speed');
const estimateValueNode = document.getElementById('estimate-value');
const moodLabelNode = document.getElementById('mood-label');

const quoteDeck = [
    {
        text: '“We asked for elegant and honest photos. We got exactly that, with zero awkward posing.”',
        credit: '- Lina & Dovydas, sunset wedding session'
    },
    {
        text: '“The brand portraits looked expensive without looking artificial. That balance is rare.”',
        credit: '- Ruta, creative director at Ember Lab'
    },
    {
        text: '“Moodboard in, art direction out, final gallery in 48 hours. Super smooth.”',
        credit: '- Jonas, magazine producer'
    }
];

const moods = [
    'Soft Grain · Warm Neutrals',
    'Clean Editorial · Cool Whites',
    'Low Contrast · Filmic Skin Tones'
];

const baseRates = {
    wedding: 220,
    brand: 170,
    editorial: 190
};

let quoteIndex = 0;
let filterMode = 'all';

if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
}

if (nextQuoteButton && quoteNode && quoteCreditNode) {
    nextQuoteButton.addEventListener('click', () => {
        quoteIndex = (quoteIndex + 1) % quoteDeck.length;
        quoteNode.textContent = quoteDeck[quoteIndex].text;
        quoteCreditNode.textContent = quoteDeck[quoteIndex].credit;

        if (moodLabelNode) {
            moodLabelNode.textContent = moods[quoteIndex % moods.length];
        }
    });
}

function updateGalleryMeta() {
    if (!galleryMetaNode) return;

    const visible = Array.from(shots).filter((shot) => shot.style.display !== 'none').length;
    const label = filterMode === 'all' ? 'All collections' : `${filterMode[0].toUpperCase()}${filterMode.slice(1)} collection`;
    galleryMetaNode.textContent = `Showing ${visible} of ${shots.length} frames · ${label}`;
}

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        filterMode = filter || 'all';

        filterButtons.forEach((otherButton) => otherButton.classList.remove('active'));
        button.classList.add('active');

        shots.forEach((shot) => {
            const shouldShow = filter === 'all' || shot.dataset.type === filter;
            shot.style.display = shouldShow ? 'grid' : 'none';
        });

        updateGalleryMeta();
    });
});

function updateEstimate() {
    if (!sessionTypeNode || !sessionHoursNode || !deliverySpeedNode || !estimateValueNode || !hoursLabelNode) return;

    const sessionType = sessionTypeNode.value;
    const hours = Number(sessionHoursNode.value);
    const priorityFee = deliverySpeedNode.value === 'priority' ? 120 : 0;
    const goldenHourFee = hours >= 6 ? 80 : 0;
    const subtotal = baseRates[sessionType] + hours * 80 + priorityFee + goldenHourFee;

    hoursLabelNode.textContent = String(hours);
    estimateValueNode.textContent = `EUR${subtotal}`;
}

if (sessionTypeNode && sessionHoursNode && deliverySpeedNode) {
    sessionTypeNode.addEventListener('change', updateEstimate);
    sessionHoursNode.addEventListener('input', updateEstimate);
    deliverySpeedNode.addEventListener('change', updateEstimate);
    updateEstimate();
}

updateGalleryMeta();
