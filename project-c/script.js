const yearNode = document.getElementById('year');
const coachSearchInput = document.getElementById('coach-search');
const coachGridNode = document.getElementById('coach-grid');
const sortRatingButton = document.getElementById('sort-rating');
const showMoreButton = document.getElementById('show-more');
const coachCards = Array.from(document.querySelectorAll('.coach-card'));

let showingAllCards = false;
let isSortedByTopRating = false;

if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
}

function textBlob(card) {
    return (card.textContent || '').toLowerCase();
}

function updateVisibilityByLimit() {
    coachCards.forEach((card, index) => {
        if (showingAllCards) {
            card.dataset.hiddenByLimit = 'false';
            return;
        }

        card.dataset.hiddenByLimit = index > 2 ? 'true' : 'false';
    });
}

function updateSearchFilter() {
    const query = (coachSearchInput?.value || '').trim().toLowerCase();

    coachCards.forEach((card) => {
        const match = !query || textBlob(card).includes(query);
        card.dataset.hiddenBySearch = match ? 'false' : 'true';

        const hideBySearch = card.dataset.hiddenBySearch === 'true';
        const hideByLimit = card.dataset.hiddenByLimit === 'true';
        card.style.display = hideBySearch || hideByLimit ? 'none' : 'grid';
    });
}

function sortByRating() {
    if (!coachGridNode) return;

    const sortedCards = coachCards.slice().sort((a, b) => {
        const left = Number(a.dataset.rate || '0');
        const right = Number(b.dataset.rate || '0');
        return right - left;
    });

    sortedCards.forEach((card) => {
        coachGridNode.appendChild(card);
    });

    coachCards.length = 0;
    sortedCards.forEach((card) => coachCards.push(card));
}

if (coachSearchInput) {
    coachSearchInput.addEventListener('input', updateSearchFilter);
}

if (showMoreButton) {
    showMoreButton.addEventListener('click', () => {
        showingAllCards = !showingAllCards;
        showMoreButton.textContent = showingAllCards ? 'Show fewer coaches' : 'View more coaches';
        updateVisibilityByLimit();
        updateSearchFilter();
    });
}

if (sortRatingButton) {
    sortRatingButton.addEventListener('click', () => {
        if (isSortedByTopRating) return;
        sortByRating();
        isSortedByTopRating = true;
        sortRatingButton.textContent = 'Sorted by top rating';
    });
}

updateVisibilityByLimit();
updateSearchFilter();
