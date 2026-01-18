document.addEventListener("DOMContentLoaded", function () {

    /* --- 1. Date Logic (Hijri & Gregorian) --- */
    function updateDates() {
        const today = new Date();
        const gregorianOptions = { day: 'numeric', month: 'long', year: 'numeric' };

        const dateContainer = document.querySelector('.date-container');
        if (!dateContainer) return;

        const gDate = today.toLocaleDateString('en-US', gregorianOptions);

        // Force English locale for Islamic calendar
        // 'en-u-ca-islamic-uma' is the Umm al-Qura calendar in English
        const hijriOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        const hijriFormatter = new Intl.DateTimeFormat('en-u-ca-islamic-uma-nu-latn', hijriOptions);
        let hDate = hijriFormatter.format(today);

        // Fallback: If the system doesn't refuse to translate month names (e.g. some Windows versions stay in Gregorian if locale data missing)
        // We can't do much without a heavy library, but we ensure at least consistent English text.
        // If the output is identical to Gregorian, it means Hijri isn't supported in English on this device.
        // But we won't fallback to Arabic as requested.

        if (gDate.trim() === hDate.trim()) {
            dateContainer.innerHTML = `<span id="currentDate">${gDate}</span>`;
        } else {
            dateContainer.innerHTML = `<span id="currentDate">${gDate}</span> • <span id="hijriDate">${hDate}</span>`;
        }
    }
    updateDates();

    /* --- 2. Scroll Animations (Intersection Observer) --- */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animatedElements = document.querySelectorAll('.topic-card, .search-box, .hero h1, .hero-subtitle');

    animatedElements.forEach((el, index) => {
        // Set initial state via JS to ensure graceful degradation if JS fails
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';

        // Stagger animations slightly
        if (el.classList.contains('topic-card')) {
            el.style.transitionDelay = `${index * 100}ms`;
        }

        observer.observe(el);
    });

    /* --- 3. Search Functionality --- */
    const pages = {
        "aboutislam": ["islam", "muslim", "faith", "religion", "belief", "allah", "prophet"],
        "thepillars": ["pillar", "fasting", "charity", "hajj", "zakat", "prayer", "faith"],
        "theka3ba": ["kaaba", "mecca", "hajj", "makkah", "pilgrimage"],
        "aboutquran": ["quran", "revelation", "scripture", "surah"],
        "seerah": ["prophet", "muhammad", "biography", "messenger"],
        "fiqh": ["fiqh", "law", "rulings", "jurisprudence"],
        "quiz": ["test", "exam", "knowledge", "quiz"]
    };

    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.toLowerCase().trim();

            if (!query) return;

            let found = false;
            for (let path in pages) {
                if (pages[path].some(keyword => keyword.includes(query))) {
                    window.location.href = path;
                    found = true;
                    return;
                }
            }

            if (!found) {
                // Optional: Show a visual feedback instead of redirecting
                alert("No specific page found. Try searching for 'Islam', 'Quran', or 'Pillars'.");
            }
        });
    }

    /* --- 4. Mobile Menu & Header Effects --- */
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';

            // Apply mobile styles dynamically if needed, 
            // though CSS media queries are preferred for layout.
            if (window.innerWidth <= 768) {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'white';
                navLinks.style.padding = '1rem';
                navLinks.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)';
            }
        });
    }
    /* --- 5. Contact Form Handling --- */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Add Web3Forms Access Key
            data.access_key = "0f83027f-b956-409c-8e00-b9ec3c60ce1d";

            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success === "false") {
                        throw new Error(data.message || "Submission failed");
                    }
                    alert("Message sent successfully! We will get back to you soon.");
                    contactForm.reset();
                })
                .catch(error => {
                    alert("There was an error sending your message. Please check your connection and try again.");
                    console.error('Error:', error);
                })
                .finally(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                });
        });
    }
});