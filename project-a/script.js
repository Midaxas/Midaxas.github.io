const yearNode = document.getElementById('year');
const quoteNode = document.getElementById('quote');
const nextQuoteButton = document.getElementById('next-quote');

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
