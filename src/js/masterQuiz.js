let questions = [];
let currentQuestion = 0;
let score = 0;
let timer;
let countdown;

let shuffleQuestions = false;
let shuffleAnswerChoices = false;

function shuffleQuestionsArray() {
  if (shuffleQuestions) {
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
  }
}

function shuffleCurrentQuestionChoices() {
  if (shuffleAnswerChoices) {
    for (let i = questions[currentQuestion].choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [
        questions[currentQuestion].choices[i],
        questions[currentQuestion].choices[j],
      ] = [
          questions[currentQuestion].choices[j],
          questions[currentQuestion].choices[i],
        ];
    }
  }
}

function displayQuestion() {
  clearTimeout(timer);
  clearInterval(countdown);

  let timeLeft = 15; //Time per question
  document.getElementById("timer").innerText = timeLeft;

  countdown = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(countdown);
      timeUp();
    }
  }, 1500);

  shuffleQuestionsArray();

  let question = questions[currentQuestion];
  document.getElementById("question").innerText = question.q;

  let choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  shuffleCurrentQuestionChoices();

  question.choices.forEach((choice) => {
    let choiceDiv = document.createElement("div");
    choiceDiv.className = "choice";
    choiceDiv.innerText = choice;
    choiceDiv.onclick = () => {
      document
        .querySelectorAll(".choice")
        .forEach((el) => el.classList.remove("selected"));
      choiceDiv.classList.add("selected");
    };
    choicesDiv.appendChild(choiceDiv);
  });
}

function timeUp() {
  clearInterval(countdown);
  revealAnswer();
  showMessage("Time's up! Moving to the next question.");
  setTimeout(() => selectChoice(null), 2000);
}

function revealAnswer() {
  let correctAnswer = questions[currentQuestion].a;
  document.querySelectorAll(".choice").forEach((el) => {
    if (el.innerText === correctAnswer) {
      el.classList.add("correct");
    }
  });
}

function selectChoice(choice) {
  clearInterval(countdown);

  if (choice === questions[currentQuestion].a) {
    score++;
  }

  revealAnswer();

  setTimeout(() => {
    if (currentQuestion >= questions.length - 1) {
      endGame();
    } else {
      currentQuestion++;
      document
        .querySelectorAll(".choice")
        .forEach((el) => el.classList.remove("selected", "correct"));
      displayQuestion();
    }
  }, 1000);
}

document.getElementById("next").onclick = () => {
  if (document.querySelector(".choice.selected")) {
    selectChoice(document.querySelector(".choice.selected").innerText);
  } else {
    showMessage("Please select an answer.");
  }
};

function showMessage(message) {
  const messageDisplay = document.getElementById("message-display");
  messageDisplay.innerText = message;

  setTimeout(() => {
    messageDisplay.innerText = "";
  }, 1500);
}

function startGame() {
  startGameCountdown();
}

function startGameCountdown() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("next").style.display = "none";

  let count = 3;
  let countdownElement = document.createElement("div");
  countdownElement.id = "start-countdown";
  document.body.appendChild(countdownElement);

  let interval = setInterval(() => {
    countdownElement.innerText = count === 0 ? "Go!" : count;
    if (count < 0) {
      clearInterval(interval);
      document.body.removeChild(countdownElement);

      document.getElementById("quiz-container").style.display = "block";
      document.getElementById("next").style.display = "block";

      currentQuestion = 0;
      score = 0;
      displayQuestion();
    }
    count--;
  }, 1000);
}

startGame();

function endGame() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("score").style.display = "none";
  document.getElementById("thirty").style.display = "none";

  let scoreElement = document.createElement("div");
  scoreElement.id = "end-score";
  scoreElement.style.fontSize = "5em";
  scoreElement.style.color = "#4b4b4c";
  scoreElement.style.position = "fixed";
  scoreElement.style.top = "40%";
  scoreElement.style.left = "50%";
  scoreElement.style.transform = "translate(-50%, -50%)";
  scoreElement.style.zIndex = "1001";

  let isWin = false;
  if (
    (questions.length === 3 && score >= 3) ||
    (questions.length === 4 && score >= 4) ||
    (questions.length === 5 && score >= 5)
  ) {
    isWin = true;
  }

  if (isWin) {
    // scoreElement.innerText = "You're a Winner!";
    // scoreElement.innerHTML = `<span style='color: #50b948; font-size: 1.6em; font-weight: bold;'>Winner!</span> <br> <span style='font-size: .8em;'>${score} out of ${questions.length}</span>`;
    scoreElement.innerHTML = `
    <div class="win-container">
    <span style='color: #50b948; font-size: 10vw; font-weight: bold;'>Winner!</span> 
    <br> 
    <span style='font-size: .8em;'>${score} out of ${questions.length}</span>
    <br>
    <img src="../assets/images/winner.png" alt="Winner Image" style="max-width: auto; height: 40vh; padding-top: 40px;" class="zoom-in-animation bounce-zoom-in-animation wiggle-animation">
    </div>
    `;

    // scoreElement.innerHTML = `<div style="background-image: url('../assets/images/winner.png'); background-size: cover; background-repeat: no-repeat; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;"><span style='color: #50b948; font-size: 1.6em; font-weight: bold;'>Winner!</span> <br> <span style='font-size: .8em;'>${score} out of ${questions.length}</span></div>`;

    // Add confetti
    const confetti = new ConfettiGenerator({ target: "confetti-canvas" });
    confetti.render();

    // Add a delay to go back to the "nec selector" page after 5 seconds
    setTimeout(() => {
      // Redirect to the "wheel" page (replace 'wheel.html' with the actual URL)
      // window.location.href = "/html/wheel.html";
      window.location.href = "https://content.republictt.com/AGLA-Financial-Day.html";
    }, 5000); // 5000 milliseconds (5 seconds)

  } else {
    // scoreElement.innerText = `Your Score: ${score} out of ${questions.length}`;
    scoreElement.innerHTML = `<span style='color: #Fbaf33; font-size: 1.2em; font-weight: bold;'>Try Again</span> <br> <span style='font-size: .8em;'>${score} out of ${questions.length}</span>`;
    // Add a delay to go back to the "nec selector" page after 5 seconds
    setTimeout(() => {
      // Redirect to the "wheel" page (replace 'wheel.html' with the actual URL)
      // window.location.href = "/html/wheel.html";
      window.location.href = "https://content.republictt.com/AGLA-Financial-Day.html";
    }, 3000); // 5000 milliseconds (5 seconds)
  }

  document.body.appendChild(scoreElement);
}
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  setTimeout(() => {
    preloader.style.display = "none";
  }, 1000);
});
