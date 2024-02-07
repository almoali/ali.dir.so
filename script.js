document.addEventListener("DOMContentLoaded", function () {
    // Define the webpage URLs and associated keywords
    var pages = {
        "./aboutislam": ["islam", "muslim", "faith", "religion", "belief", "Allah", "prophet", "Quran", "worship", "prayer"],
        "./thepillars": ["pillar", "fasting", "charity", "pilgrimage", "belief", "divine", "faithful", "worshiper", "pious", "devout", "pillars"],
        "./theka3ba": ["Kaaba", "Mecca", "pilgrimage", "hajj", "worship", "sacred", "spiritual", "devotion", "Muslims", "sacred site"],
        "./aboutquran": ["quran", "revelation", "scripture", "recitation", "guidance", "inspiration", "divine", "truth", "spiritual"],
        "./seerah": ["Prophet", "Muhammad", "biography", "history", "revelation", "messenger", "Islamic leader", "example", "role model", "guidance"],
        "./feqh": ["fiqh", "jurisprudence", "scholar", "rulings", "Islamic law", "law", "Islamic rulings", "legal", "laws", "application"],
        "./quiz": ["test", "exam", "knowledge", "questions", "challenge", "understanding", "assessment", "evaluation", "assessment", "checkup"],
        "./contact": ["contact", "reach out", "message", "email", "phone", "support", "connect", "communication", "inquiry", "get in touch"]
    };

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
            window.location.href = "./notfound.html";
        }
    });
});

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "100";
    document.getElementById("main").style.marginLeft = "100";
}

function toggleNav() {
    var sidenav = document.getElementById("mySidenav");
    if (sidenav.style.height === "100%" || sidenav.style.height === "") {
        sidenav.style.height = "0";
    } else {
        sidenav.style.height = "100%";
    }
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

// Function to get Hijri date
function getHijriDate(gregorianDate) {
    let gregorianDateString = gregorianDate.toISOString().slice(0, 10);
    let url = `https://api.aladhan.com/gToH?date=${gregorianDateString}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let hijriDate = data.data.hijri;
            document.getElementById("hijriDate").textContent = "Hijri date: " + hijriDate.day + " " + hijriDate.month.en + " " + hijriDate.year;
        })
        .catch(error => console.error('Error fetching Hijri date:', error));
}

// Function to display current Gregorian date and fetch Hijri date
function displayDate() {
    let currentDate = new Date();
    document.getElementById("currentDate").textContent = " " + currentDate.toDateString();
    getHijriDate(currentDate);
}

// Call displayDate function when the page loads
window.onload = displayDate;
