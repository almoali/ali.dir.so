function countdown() {
    var targetDate = new Date("March 11, 2024 00:00:00").getTime();

    var x = setInterval(function () {
        var now = new Date().getTime();
        var distance = targetDate - now;

        if (distance <= 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "Ramadan Mubarak";
        } else {
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
        }
    }, 1000);
}

countdown();


const form = document.querySelector('form');

function sendEmail() {
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "admin@ali.dir.so",
        Password: "5039F8B9D8F87D94CD7A588CB3D0391E2C61,m",
        To: 'them@website.com',
        From: "you@isp.com",
        Subject: "This is the subject",
        Body: "And this is the body"
    }).then(
        message => alert(message)
    );
}



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
