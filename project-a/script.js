const yearNode = document.getElementById('year');
const quoteNode = document.getElementById('quote');
const nextQuoteButton = document.getElementById('next-quote');
const filterButtons = document.querySelectorAll('.filter-btn');
const shots = document.querySelectorAll('.shot');

const quotes = [
    '“The photos felt timeless and emotional — exactly what we wanted.”',
    '“Our brand images finally look premium and consistent across platforms.”',
    '“Fast turnaround, beautiful direction, and a very easy process.”'
];

let quoteIndex = 0;

if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
}

if (nextQuoteButton && quoteNode) {
    nextQuoteButton.addEventListener('click', () => {
        quoteIndex = (quoteIndex + 1) % quotes.length;
        quoteNode.textContent = quotes[quoteIndex];
    });
}

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((otherButton) => otherButton.classList.remove('active'));
        button.classList.add('active');

        shots.forEach((shot) => {
            const shouldShow = filter === 'all' || shot.dataset.type === filter;
            shot.style.display = shouldShow ? 'grid' : 'none';
        });
    });
});
