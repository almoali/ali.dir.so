document.addEventListener("DOMContentLoaded", function() {
    const surahContent = document.getElementById('surahContent');
    
    // Get surah ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const surahId = urlParams.get('id');

    if (!surahId) {
        surahContent.innerHTML = '<div class="error">No Surah selected. Please go back and select a Surah.</div>';
        return;
    }

    // Fetch surah chapter info and verses
    Promise.all([
        fetch(`https://api.quran.com/api/v4/chapters/${surahId}`, {
            headers: { "accept": "application/json" }
        }).then(r => r.json()),
        fetch(`https://api.quran.com/api/v4/verses?chapter_number=${surahId}&language=en`, {
            headers: { "accept": "application/json" }
        }).then(r => r.json())
    ])
    .then(([chapterData, versesData]) => {
        const chapter = chapterData.chapter;
        const verses = versesData.verses;
        
        // Fetch Arabic text for verses
        return fetch(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${surahId}`, {
            headers: { "accept": "application/json" }
        })
        .then(r => r.json())
        .then(arabicData => {
            renderSurah(chapter, verses, arabicData.verses);
        });
    })
    .catch(error => {
        surahContent.innerHTML = `<div class="error">Error loading Surah. Please try again later.</div>`;
        console.error('Error:', error);
    });

    function renderSurah(chapter, verses, arabicVerses) {
        let html = `
            <div class="surah-header">
                <p class="eyebrow">Surah ${chapter.id} of 114</p>
                <h1>${chapter.name_simple}</h1>
                <p>${chapter.translated_name.name}</p>
                <p>${chapter.verses_count} Verses • ${chapter.revelation_type === 'Meccan' ? 'Mecca' : 'Medina'}</p>
            </div>
            <div class="verses-container">
        `;

        verses.forEach(verse => {
            const arabicVerse = arabicVerses.find(v => v.verse_number === verse.verse_number);
            const arabicText = arabicVerse ? arabicVerse.text : '';
            
            html += `
                <div class="verse">
                    <div class="verse-number">Verse ${verse.verse_number}</div>
                    <div class="verse-text-arabic">${arabicText}</div>
                    <div class="verse-text-translation">${verse.text}</div>
                </div>
            `;
        });

        html += `</div>`;

        // Add navigation
        const prevSurah = parseInt(surahId) - 1;
        const nextSurah = parseInt(surahId) + 1;
        
        html += `
            <div class="surah-nav">
                <a href="${prevSurah > 0 ? `surah.html?id=${prevSurah}` : '#'}" class="nav-button" ${prevSurah <= 0 ? 'disabled' : ''}>← Previous Surah</a>
                <span style="color: #666;">Surah ${surahId} of 114</span>
                <a href="${nextSurah <= 114 ? `surah.html?id=${nextSurah}` : '#'}" class="nav-button" ${nextSurah > 114 ? 'disabled' : ''}>Next Surah →</a>
            </div>
        `;

        surahContent.innerHTML = html;
    }
});

function toggleNav() {
    const nav = document.getElementById('navLinks');
    nav.style.display = (nav.style.display === 'flex') ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
}
