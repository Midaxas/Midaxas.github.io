const yearNode = document.getElementById('year');
const navAnchors = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));

if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
}

if (navAnchors.length) {
    const sections = navAnchors
        .map((anchor) => {
            const sectionId = anchor.getAttribute('href');
            if (!sectionId) return null;
            return document.querySelector(sectionId);
        })
        .filter(Boolean);

    const updateActiveLink = () => {
        const offset = window.scrollY + window.innerHeight * 0.28;
        let currentSectionId = '#top';

        sections.forEach((section) => {
            if (section.offsetTop <= offset) {
                currentSectionId = `#${section.id}`;
            }
        });

        navAnchors.forEach((anchor) => {
            const isActive = anchor.getAttribute('href') === currentSectionId;
            anchor.style.color = isActive ? '#f4f6ff' : '#c4c7ea';
        });
    };

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
}
