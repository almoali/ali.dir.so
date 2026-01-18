document.addEventListener("DOMContentLoaded", function() {
    // 1. Scroll Reveal Observer
    const sections = document.querySelectorAll('.fade-in-section');
    
    const options = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // 2. Mobile Menu Logic
    window.toggleMenu = function() {
        const links = document.getElementById('navLinks');
        if (links.style.display === 'flex') {
            links.style.display = 'none';
        } else {
            links.style.display = 'flex';
            links.style.flexDirection = 'column';
            links.style.position = 'absolute';
            links.style.top = '70px';
            links.style.left = '0';
            links.style.width = '100%';
            links.style.background = 'white';
            links.style.padding = '1.5rem';
            links.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        }
    };
});