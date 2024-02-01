document.getElementById("searchForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get the value of the input field
    var keyword = document.getElementById("searchInput").value.toLowerCase().trim();

    // Define the webpage URLs and associated keywords
    var pages = {
        "./aboutislam": ["islam", "muslim", "faith", "religion", "belief", "Allah", "prophet", "Quran", "worship", "prayer"],

        "./thepillars": ["pillar", "fasting", "charity", "pilgrimage", "belief", "divine", "faithful", "worshiper", "pious", "devout", "pillars"],

        "./theka3ba.html": ["kaaba", "Mecca", "pilgrimage", "hajj", "worship", "sacred", "spiritual", "devotion", "Muslims", "sacred site", "mecca"],

        "./aboutquran": ["quran", "revelation", "scripture", "recitation", "guidance", "inspiration", "divine", "truth", "spiritual"],

        "./seerah": ["Prophet", "Muhammad", "biography", "history", "revelation", "messenger", "Islamic leader", "seerah", "role model", "guidance"],

        "./feqh": ["fiqh", "jurisprudence", "scholar", "rulings", "Islamic law", "law", "Islamic rulings", "legal", "laws", "application"],

        "./quiz": ["test", "exam", "knowledge", "questions", "challenge", "understanding", "assessment", "evaluation", "assessment", "checkup"],

        "./contact": ["contact", "reach out", "message", "email", "phone", "support", "connect", "communication", "inquiry", "get in touch"]
    };

    var pageFound = false;
    // Check if the keyword matches any page
    for (var page in pages) {
        if (pages[page].includes(keyword)) {
            window.location.href = page;
            pageFound = true;
            break;
        }
    }

    if (!pageFound) {
        // Redirect to a page saying the content is not found
        window.location.href = "./notfound";
    }
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