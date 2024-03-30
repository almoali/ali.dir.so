document.addEventListener("DOMContentLoaded", function () {
    // Define the webpage URLs and associated keywords
    var pages = {
        // Your page URLs and keywords here...
        "/About Islam/aboutislam": ["islam", "muslim", "faith", "religion", "belief", "Allah", "prophet", "Quran", "worship", "prayer"],
        "/The Pillars/thepillars": ["pillar", "fasting", "charity", "pilgrimage", "belief", "divine", "faithful", "worshiper", "pious", "devout", "pillars"],
        "/The Kaaba/theka3ba": ["Kaaba", "kaaba", "Mecca", "pilgrimage", "hajj", "worship", "sacred", "spiritual", "devotion", "Muslims", "sacred site"],
        "/About Quran/aboutquran": ["quran", "revelation", "scripture", "recitation", "guidance", "inspiration", "divine", "truth", "spiritual"],
        "/Seerah/seerah": ["Prophet", "seerah", "Muhammad", "biography", "history", "revelation", "messenger", "Islamic leader", "example", "role model", "guidance"],
        "/Fiqh/feqh": ["fiqh", "jurisprudence", "scholar", "rulings", "Islamic law", "law", "Islamic rulings", "legal", "laws", "application"],
        "/Quiz/quiz": ["test", "exam", "knowledge", "questions", "challenge", "understanding", "assessment", "evaluation", "assessment", "checkup"],
        "/Contact/contact": ["contact", "reach out", "message", "email", "phone", "support", "connect", "communication", "inquiry", "get in touch"],
        e
    };

    // Accessing the data
    console.log(pages["/About Quran/1.html"]); // Output: ["Al-Fatihah", "Surat Al-Fatihah", "Surah Al-Fatihah"]

    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('search-results');

    function performSearch(query) {
        var suggestions = [];

        // Check if the keyword matches any page
        for (var page in pages) {
            if (pages[page].includes(query)) {
                suggestions.push(page);
            }
        }
        return suggestions;
    }

    function updateSearchResults(results) {
        searchResults.innerHTML = '';
        if (results.length > 0) {
            results.forEach(result => {
                const li = document.createElement('li');
                li.textContent = result;
                searchResults.appendChild(li);
            });
            searchResults.style.display = 'block';
        } else {
            searchResults.style.display = 'none';
        }
    }

    searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase().trim();
        const results = performSearch(query);
        updateSearchResults(results);
    });

    searchInput.addEventListener('focus', function () {
        if (searchResults.innerHTML.trim() !== '') {
            searchResults.style.display = 'block';
        }
    });

    searchInput.addEventListener('blur', function () {
        setTimeout(() => {
            searchResults.style.display = 'none';
        }, 200);
    });

    // Event listener for form submission
    document.getElementById("searchForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get the value of the input field
        var keyword = searchInput.value.toLowerCase().trim();

        var suggestions = performSearch(keyword);

        if (suggestions.length > 0) {
            // Redirect to the first matching page
            window.location.href = suggestions[0];
        } else {
            // Redirect to a page saying the content is not found
            window.location.href = "/Not found/notfound.html";
        }
    });
});

// Function to open the side navigation menu
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

// Function to close the side navigation menu
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

// Function to toggle the side navigation menu
function toggleNav() {
    var sidenav = document.getElementById("mySidenav");
    if (sidenav.style.height === "100%" || sidenav.style.height === "") {
        sidenav.style.height = "0";
    } else {
        sidenav.style.height = "100%";
    }
}

// Function to highlight the current page in the side navigation menu
function highlightCurrentPage() {
    var currentPath = window.location.pathname;
    var links = document.querySelectorAll('.sidenav a');
    links.forEach(function (link) {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('current-page');
        } else {
            link.classList.remove('current-page');
        }
    });
}

// Function to close the side navigation menu when clicking outside of it
function closeNavOutside(event) {
    var sidenav = document.getElementById("mySidenav");
    // Check if the clicked element is not inside the side navigation
    if (!event.target.closest('.sidenav')) {
        sidenav.style.height = "0";
        document.body.removeEventListener('click', closeNavOutside);
    }
}

// Call the function to highlight the current page when the page loads
window.addEventListener('DOMContentLoaded', function () {
    highlightCurrentPage();
});

// hijri_date.js
document.addEventListener("DOMContentLoaded", function () {
    var currentDateElement = document.getElementById("currentDate");
    var hijriDateElement = document.getElementById("hijriDate");

    // Get today's Gregorian date
    var today = new Date();

    // Convert Gregorian date to Hijri date
    var hijriDate = gregorianToHijri(today);
    var hijriDateComponents = hijriDate.split(' ');

    // Display Gregorian date
    var gregorianDate = today.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    currentDateElement.textContent = "" + gregorianDate;

    // Display Hijri date
    hijriDateElement.textContent = "Today Islamic date: " + hijriDate;
});

// Function to convert Gregorian date to Hijri date
function gregorianToHijri(gregorianDate) {
    var utcDate = Date.UTC(gregorianDate.getFullYear(), gregorianDate.getMonth(), gregorianDate.getDate());
    var julianDay = Math.floor(utcDate / (1000 * 60 * 60 * 24) - 0.5) + 2440588;
    var hijriDay = Math.floor((julianDay - 1948440) / 29.530588853);
    var hijriDate = hijriDay + 1;
    var hijriMonth = (Math.floor((julianDay - 1948440 - Math.floor(hijriDay * 29.530588853)) / 29.530588853) + 1) % 12;
    var hijriYear = Math.floor((julianDay - 1948440 - Math.floor(hijriDay * 29.530588853)) / 354.36667) + 1;
    if (hijriYear <= 0) {
        hijriYear--;
    }

    var hijriMonths = [
        "Muharram", "Safar", "Rabi' al-awwal", "Rabi' al-thani", "Jumada al-awwal",
        "Jumada al-thani", "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
    ];

    var hijriMonthName = hijriMonths[hijriMonth];
    return hijriDate + ' ' + hijriMonthName + ' ' + hijriYear;
}
