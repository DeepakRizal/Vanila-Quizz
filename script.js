const quizzBox = document.querySelector(".quizz-box");
const questionEle = document.querySelector(".question");
const optionEle = document.querySelector(".options");
const timerEle = document.querySelector(".timer");
const next = document.querySelector(".next");
const start = document.querySelector(".start");

const quizQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Rome", "Berlin"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Southern Ocean",
      "Pacific Ocean",
    ],
    answer: "Pacific Ocean",
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: [
      "Harper Lee",
      "Mark Twain",
      "Ernest Hemingway",
      "F. Scott Fitzgerald",
    ],
    answer: "Harper Lee",
  },
  {
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    answer: "2",
  },
  {
    question: "In which year did the Titanic sink?",
    options: ["1912", "1905", "1898", "1923"],
    answer: "1912",
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Pt", "Pb"],
    answer: "Au",
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "Thailand", "South Korea"],
    answer: "Japan",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Claude Monet",
      "Leonardo da Vinci",
      "Pablo Picasso",
    ],
    answer: "Leonardo da Vinci",
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    answer: "Diamond",
  },
];

let time = 30;
let currentIndex = 0;
let question;
let score = 0;
let timing;

function startTimer() {
  clearInterval(timing);

  timing = setInterval(() => {
    if (time >= 1) {
      timerEle.textContent = --time;
    }
    if (time <= 0) {
      clearInterval(timing);

      timerEle.textContent = time;
      for (let i = 0; i < optionEle.childElementCount; i++) {
        const childElement = optionEle.children[i];
        if (childElement.innerText === question.answer) {
          childElement.style.backgroundColor = "green";
          childElement.style.color = "white";
          next.removeAttribute("disabled");
        }
      }
    }
  }, 1000);
}

function showScore() {
  quizzBox.innerHTML = "";
  const scoreEle = document.createElement("p");
  scoreEle.classList.add("score");
  scoreEle.innerText = `score: ${score}`;
  const restartButton = document.createElement("button");
  restartButton.classList.add("restart");
  restartButton.innerText = "Restart";

  quizzBox.appendChild(scoreEle);
  quizzBox.appendChild(restartButton);
}

function loadQuestion() {
  if (currentIndex < quizQuestions.length) {
    question = quizQuestions[currentIndex];
    questionEle.innerText = question.question;
    let options = question.options.map(
      (option) => `<li class="option">${option}</li>`
    );
    optionEle.innerHTML = options.join("");
    startTimer();
  } else {
    showScore();
  }
}

function startTheQuizz() {
  timerEle.classList.remove("none");
  next.classList.remove("none");
  loadQuestion();
}

function moveToNextQuestion() {
  next.setAttribute("disabled", true);
  time = 30;
  timerEle.innerText = time;
  currentIndex++;
  loadQuestion();
}

function checkCorrectAnswer(ele) {
  ele.style.backgroundColor = "green";
  ele.style.color = "white";
  next.removeAttribute("disabled");
  score++;
}

function ifWrongAnswer(ele) {
  ele.style.backgroundColor = "red";
  ele.style.color = "white";
  for (let i = 0; i < optionEle.childElementCount; i++) {
    const childElement = optionEle.children[i];
    if (childElement.innerText === question.answer) {
      childElement.style.backgroundColor = "green";
      childElement.style.color = "white";
      next.removeAttribute("disabled");
    }
  }
}

function restartGame(event) {
  if (event.target.closest(".restart")) {
    location.reload();
  }
}

start.addEventListener("click", startTheQuizz);

next.addEventListener("click", moveToNextQuestion);

optionEle.addEventListener("click", (e) => {
  if (e.target.closest(".option")) {
    let currentEle = e.target;
    if (currentEle.innerText === question.answer) {
      checkCorrectAnswer(currentEle);
    } else {
      ifWrongAnswer(currentEle);
    }
  }
});

quizzBox.addEventListener("click", restartGame);
