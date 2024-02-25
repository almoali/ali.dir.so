function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    // This line seems unnecessary unless you have a "main" element that you want to adjust
    // document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0"; // Change width to 0 to close
    // Similarly, remove this line if there's no "main" element to adjust
    // document.getElementById("main").style.marginLeft = "0";
}

function toggleNav() {
    var sidenav = document.getElementById("mySidenav");
    // This function doesn't seem to be used in your HTML, but you can modify it if needed
    if (sidenav.style.width === "0px" || sidenav.style.width === "") {
        sidenav.style.width = "250px";
    } else {
        sidenav.style.width = "0";
    }
}

// This function is to close the side navigation menu when clicking outside of it
function closeNavOutside(event) {
    var sidenav = document.getElementById("mySidenav");
    // Check if the clicked element is not inside the side navigation
    if (!event.target.closest('.sidenav')) {
        sidenav.style.width = "0";
        document.body.removeEventListener('click', closeNavOutside);
    }
}
