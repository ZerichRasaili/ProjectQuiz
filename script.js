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
  resultDiv.innerHTML = `🎉 You scored <strong>${score}</strong> out of <strong>${questions.length}</strong>!`;
  resultDiv.style.color = score >= 8 ? "green" : score >= 5 ? "orange" : "red";
}