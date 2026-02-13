// Moowre Website JavaScript

// Add some interactivity
document.addEventListener('DOMContentLoaded', function() {
    console.log('🐮 Moowre says: Moo!');
    
    // Add click event to feature cards
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    // Add cow sounds on logo click (visual feedback)
    const cowIcon = document.querySelector('.cow-icon');
    if (cowIcon) {
        cowIcon.addEventListener('click', function() {
            console.log('Moooo! 🐮');
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
        });
    }
});
