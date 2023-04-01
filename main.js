// The fist day of ramadan

let countDownDate = new Date("Apr 20, 2023 00:00:00").getTime();


let counter = setInterval(() => {

let dateNow = new Date().getTime();

let dateDiff = countDownDate - dateNow;

//let days = Math.floor(dateDiff / 1000 / 60 / 60 / 24);

let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
let hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
let seconds = Math.floor((dateDiff % (1000 * 60 )) / 1000);

document.querySelector(".days").innerHTML = days;
document.querySelector(".hours").innerHTML = hours;
document.querySelector(".minutes").innerHTML = minutes;
document.querySelector(".seconds").innerHTML = seconds;

if (dateDiff < 0 ) {
    clearInterval(counter);
}

}, 1000);


function alertfullname() {
    var firstname = document.getElementById("firstname").value;
    var firstname = document.getElementById("lastname").value;
    alert("Welcome " + firstname + "" + lastname)
  }
