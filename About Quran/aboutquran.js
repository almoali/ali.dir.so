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
    links.forEach(function(link) {
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
function showsurah(id) {
    // This function can remain unchanged since it's responsible for displaying surah content
}

// Function to handle surah link click event
function handleSurahClick(event) {
    event.preventDefault(); // Prevent the default link behavior (i.e., navigating to the href)

    // Extract the surah ID from the clicked link's href attribute
    var surahId = event.target.href.split('/').pop().split('.').shift();

    // Redirect the user to the corresponding HTML page for that surah
    window.location.href = `${surahId}.html`;
}

// Call the function to highlight the current page when the page loads
window.addEventListener('DOMContentLoaded', function() {
    highlightCurrentPage();
    let params = (new URL(document.location)).searchParams;
    let surah = params.get("surah");
    if (surah >= 1 && surah <=114) {
        showsurah(surah);
    } else {
        fetch("https://api.quran.com/api/v4/chapters", { headers: {
            "accept": "application/json"
        }})
        .then(response => response.json())
        .then(data => {
            for(var i=0; i<data.chapters.length; i++) { 
                var surahName = document.createElement("li");
                var surahId = data.chapters[i].id;
                var surahTitle = data.chapters[i].name_simple;
                
                var surahLink = document.createElement("a");
                surahLink.href = `${surahId}.html`; // Link to individual HTML pages for each surah
                surahLink.textContent = surahTitle;
                
                // Add event listener to surah link
                surahLink.addEventListener('click', handleSurahClick);

                surahName.appendChild(surahLink);
                document.getElementById("surahs").appendChild(surahName);
            }
        })
    }
});
