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
    fetch("https://api.quran.com/api/v4/quran/verses/uthmani_tajweed?chapter_number="+id, { headers: {
        "accept": "application/json"
    }})
    .then(response => response.json())
    .then(data => {
        document.getElementById("surahs").innerHTML = "";

        for(var i=0; i<=data.verses.length - 1;i++) { 
            var ayah = document.createElement("div");
            ayah.innerHTML = data.verses[i].text_uthmani_tajweed;

            document.getElementById("surahs").appendChild(ayah);

        }
    })
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
            for(var i=0; i<=data.chapters.length - 1;i++) { 
                var surahName = document.createElement("li");
                surahName.innerHTML = `<a href="aboutquran.html?surah=${data.chapters[i].id}" id="${data.chapters[i].id}">${data.chapters[i].name_simple}</a>`;

                document.getElementById("surahs").appendChild(surahName)
            }
        })
    }
});
