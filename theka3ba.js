document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll('.fade-in-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(section => observer.observe(section));
});

function toggleNav() {
    const nav = document.getElementById('navLinks');
    nav.classList.toggle('active');
    // Basic toggle for smaller screens
    nav.style.display = (nav.style.display === 'flex') ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
}