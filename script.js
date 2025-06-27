const questions = [
  {
    question: "The capital city of Kosovo is:",
    options: ["Maseru", "Pristina", "Funafuti", "Tunis"],
    answer: "Pristina"
  },
  {
    question: "The capital city of Switzerland is:",
    options: ["Bern", "Stockholm", "Helsinki", "Warsaw"],
    answer: "Bern"
  },
  {
    question: "The capital city of Fiji is:",
    options: ["Moroni", "Tallin", "Dakar", "Suva"],
    answer: "Suva"
  },
  {
    question: "The capital city of Slovakia is:",
    options: ["Bratislava", "Ljubljana", "Apia", "Tbilisi"],
    answer: "Bratislava"
  },
  {
    question: "The capital city of Burundi is:",
    options: ["Yerevan", "Gitega", "Majuro", "Gaborone"],
    answer: "Gitega"
  },
  {
    question: "The capital city of Lithuania is:",
    options: ["Bissau", "Vilnius", "Madrid", "Dodoma"],
    answer: "Vilnius"
  },
  {
    question: "The capital city of Kyrgyzstan is:",
    options: ["Seoul", "Paris", "Bishkek", "Libreville"],
    answer: "Bishkek"
  },
  {
    question: "The capital city of Hungary is:",
    options: ["Budapest", "Victoria", "Pyongyang", "Belgrade"],
    answer: "Budapest"
  },
  {
    question: "The capital city of Vietnam is:",
    options: ["Lomé", "Tegucigalpa", "Dili", "Hanoi"],
    answer: "Hanoi"
  },
  {
    question: "The capital city of Ireland is:",
    options: ["Accra", "London", "Amman", "Dublin"],
    answer: "Dublin"
  }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

const startBtn = document.getElementById("start");
const nextBtn = document.getElementById("next");
const quizBox = document.querySelector(".quizbox");
const questionBox = document.getElementById("question-box");
const quizContainer = document.getElementById("quiz-container");
const resultDiv = document.getElementById("result");

startBtn.addEventListener("click", () => {
  quizBox.style.display = "none";
  quizContainer.style.display = "block";
  showQuestion();
});

nextBtn.addEventListener("click", () => {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert("Please select an answer before continuing.");
    return;
  }

  userAnswers.push(selected.value);

  if (selected.value === questions[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showQuestion() {
  const q = questions[currentQuestion];
  questionBox.innerHTML = `
    <h2>Question ${currentQuestion + 1} of ${questions.length}</h2>
    <p>${q.question}</p>
    ${q.options
      .map(
        (option, index) => `
      <label>
        <input type="radio" name="option" value="${option}"> ${option}
      </label><br>`
      )
      .join("")}
  `;
  nextBtn.style.display = "inline-block";
}

function showResult() {
  quizContainer.style.display = "none";
  resultDiv.style.display = "block"; 
  document.getElementById("score-text").innerHTML = `🎉 You scored <strong>${score}</strong> out of <strong>${questions.length}</strong>!`;
  resultDiv.style.color = score >= 8 ? "green" : score >= 5 ? "orange" : "red";
  showAnswersBtn.style.display = "inline-block";
}

const showAnswersBtn = document.getElementById("show-answers");
const answerReview = document.getElementById("answer-review");

showAnswersBtn.addEventListener("click", () => {
  if (answerReview.innerHTML === "") {
    let reviewHTML = "<h3>Your Answers:</h3><ul style='text-align:left;'>";

    questions.forEach((q, index) => {
      const userAnswer = userAnswers[index];
      const isCorrect = userAnswer === q.answer;

      reviewHTML += `
        <li>
          <strong>Q${index + 1}:</strong> ${q.question}<br>
          <span style="color:${isCorrect ? 'green' : 'red'};">
            Your answer: ${userAnswer || "No answer selected"}
          </span><br>
          <span style="color:#3E5B5E;">Correct answer: ${q.answer}</span>
        </li><br>
      `;
    });

    reviewHTML += "</ul>";
    answerReview.innerHTML = reviewHTML;
    showAnswersBtn.textContent = "Hide Answers";

  } else {
    answerReview.innerHTML = "";
    showAnswersBtn.textContent = "Show Answers";
  }
});

const tryAgainBtn = document.getElementById("try-again");

tryAgainBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  userAnswers = [];

  resultDiv.style.display = "none";
  answerReview.innerHTML = "";
  showAnswersBtn.textContent = "Show Answers";
  showAnswersBtn.style.display = "none";

  quizContainer.style.display = "block";

  showQuestion();
});
