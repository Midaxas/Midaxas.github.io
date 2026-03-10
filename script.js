const yearNode = document.getElementById("year");
const siteHeader = document.querySelector(".site-header");
const navLinks = Array.from(document.querySelectorAll(".nav-links a[href^='#']"));
const revealTargets = Array.from(document.querySelectorAll(".reveal"));
const tiltCard = document.querySelector(".tilt-card");

if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
}

const onScrollHeader = () => {
    if (!siteHeader) return;
    const hasScrolled = window.scrollY > 12;
    siteHeader.classList.toggle("scrolled", hasScrolled);
};

window.addEventListener("scroll", onScrollHeader, { passive: true });
onScrollHeader();

if (revealTargets.length) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.2,
            rootMargin: "0px 0px -6% 0px"
        }
    );

    revealTargets.forEach((target) => revealObserver.observe(target));
}

if (navLinks.length) {
    const sections = navLinks
        .map((anchor) => {
            const id = anchor.getAttribute("href");
            if (!id) return null;
            return document.querySelector(id);
        })
        .filter(Boolean);

    const updateActiveNav = () => {
        const currentOffset = window.scrollY + window.innerHeight * 0.25;
        let currentId = navLinks[0].getAttribute("href") || "#work";

        sections.forEach((section) => {
            if (section.offsetTop <= currentOffset) {
                currentId = `#${section.id}`;
            }
        });

        navLinks.forEach((link) => {
            const active = link.getAttribute("href") === currentId;
            link.classList.toggle("active", active);
            link.setAttribute("aria-current", active ? "page" : "false");
        });
    };

    window.addEventListener("scroll", updateActiveNav, { passive: true });
    updateActiveNav();
}

const anchorLinks = Array.from(document.querySelectorAll("a[href^='#']"));
anchorLinks.forEach((anchor) => {
    anchor.addEventListener("click", () => {
        const targetId = anchor.getAttribute("href");
        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);
        if (!target) return;

        // Focus target after smooth scroll for keyboard and assistive tech support.
        window.requestAnimationFrame(() => {
            target.setAttribute("tabindex", "-1");
            target.focus({ preventScroll: true });
        });
    });
});

if (tiltCard && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    const maxTilt = 6;

    tiltCard.addEventListener("pointermove", (event) => {
        const box = tiltCard.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width;
        const y = (event.clientY - box.top) / box.height;

        const rotateY = (x - 0.5) * maxTilt;
        const rotateX = (0.5 - y) * maxTilt;

        tiltCard.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    });

    tiltCard.addEventListener("pointerleave", () => {
        tiltCard.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    });
}
