document.addEventListener("DOMContentLoaded", function() {
    const surahGrid = document.getElementById('surahGrid');
    const searchInput = document.getElementById('surahSearch');
    let allSurahs = [];

    // 1. Fetch All Surahs from API
    fetch("https://api.quran.com/api/v4/chapters", {
        headers: { "accept": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        allSurahs = data.chapters;
        renderSurahs(allSurahs);
    })
    .catch(error => {
        surahGrid.innerHTML = `<p class="error">Unable to load Surahs. Please try again later.</p>`;
    });

    // 2. Render Function
    function renderSurahs(chapters) {
        surahGrid.innerHTML = '';
        chapters.forEach(chapter => {
            const card = document.createElement('a');
            card.className = 'surah-card';
            card.href = `surahs/${chapter.id}.html`; // Links to surah files
            
            card.innerHTML = `
                <div class="surah-number">${chapter.id}</div>
                <div class="surah-info">
                    <h3>${chapter.name_simple}</h3>
                    <p>${chapter.translated_name.name} • ${chapter.verses_count} Verses</p>
                </div>
            `;
            surahGrid.appendChild(card);
        });
    }

    // 3. Search Filter Logic
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = allSurahs.filter(s => 
            s.name_simple.toLowerCase().includes(term) || 
            s.id.toString() === term
        );
        renderSurahs(filtered);
    });

    // 4. Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-section').forEach(s => observer.observe(s));
});

function toggleNav() {
    const nav = document.getElementById('navLinks');
    nav.style.display = (nav.style.display === 'flex') ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
}