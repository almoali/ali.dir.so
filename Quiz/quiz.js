    function submitQuiz() {
  const incorrectAnswers = findIncorrectAnswers();
  const score = 5 - incorrectAnswers.length;

  if (score === 5) {
    document.getElementById('displayResult').innerHTML = "Congratulations! You passed the quiz!";
  } else {
    let message = `Sorry, you did not pass the quiz. You got ${score} out of 5 questions correct.<br><br>`;
    message += "You answered the following questions incorrectly:<br>";

    incorrectAnswers.forEach((questionNumber) => {
      message += `- Question ${questionNumber}<br>`;
    });

    document.getElementById('displayResult').innerHTML = message;
  }
}


    // Function to find the incorrect answers
    function findIncorrectAnswers() {
      const incorrectAnswers = [];

      const selectedAnswers = [
        document.querySelector('input[name="answer1"]:checked'),
        document.querySelector('input[name="answer2"]:checked'),
        document.querySelector('input[name="answer3"]:checked'),
        document.querySelector('input[name="answer4"]:checked'),
        document.querySelector('input[name="answer5"]:checked')
      ];

      selectedAnswers.forEach((answer, index) => {
        const questionNumber = index + 1;
        const correctAnswer = getCorrectAnswer(questionNumber);

        if (!answer || answer.value !== correctAnswer) {
          incorrectAnswers.push(questionNumber);
        }
      });

      return incorrectAnswers;
    }

    // Function to get the correct answer for a question
    function getCorrectAnswer(questionNumber) {
      let correctAnswer;

      switch (questionNumber) {
        case 1:
          correctAnswer = "Muhammad";
          break;
        case 2:
          correctAnswer = "Quran";
          break;
        case 3:
          correctAnswer = "Hajj";
          break;
        case 4:
          correctAnswer = "5";
          break;
        case 5:
          correctAnswer = "Ramadan";
          break;
        default:
          break;
      }

      return correctAnswer;
    }

    function submitQuiz() {
        // Check if all questions are answered
        const allQuestionsAnswered = validateQuiz();
      
        if (allQuestionsAnswered) {
          const incorrectAnswers = findIncorrectAnswers();
          const score = 5 - incorrectAnswers.length;
      
          if (score === 5) {
            document.getElementById('displayResult').innerHTML = "Congratulations! You passed the quiz!";
          } else {
            let message = `Sorry, you did not pass the quiz. You got ${score} out of 5 questions correct.<br><br>`;
            message += "You answered the following questions incorrectly:<br>";
      
            incorrectAnswers.forEach((questionNumber) => {
              message += `- Question ${questionNumber}<br>`;
            });
      
            document.getElementById('displayResult').innerHTML = message;
          }
        } else {
          alert("Please select all the answers to submit.");
        }
      }
      
      function validateQuiz() {
        const questions = document.querySelectorAll('.question');
      
        // Loop through each question
        for (let i = 0; i < questions.length; i++) {
          const question = questions[i];
          const radios = question.querySelectorAll('input[type="radio"]');
          let answerSelected = false;
      
          // Loop through radio buttons for each question
          for (let j = 0; j < radios.length; j++) {
            if (radios[j].checked) {
              answerSelected = true;
              break; // Break loop if an answer is selected
            }
          }
      
          // If no answer is selected for any question, return false
          if (!answerSelected) {
            return false;
          }
        }
      
        // If an answer is selected for each question, return true
        return true;
      }
      

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

// Call the function to highlight the current page when the page loads
window.addEventListener('DOMContentLoaded', function() {
  highlightCurrentPage();
});
