// Array of objects representing quiz questions and their respective answers
const questions = [
  {
    question: "In the UK, the abbreviation NHS stands for National what Service?",
    answers: [
      { text: "Humanity", correct: false },
      { text: "Honour", correct: false },
      { text: "Health", correct: true },
      { text: "Household", correct: false },
    ],
  },
  {
    question: "What does A.I. stand for?",
    answers: [
      { text: "Artificial information", correct: false },
      { text: "Artificial intelligence", correct: true },
      { text: "Anti intelligence", correct: false },
      { text: "Anti information", correct: false },
    ],
  },
  {
    question: "Obstetrics is a branch of medicine particularly concerned with what?",
    answers: [
      { text: "Childbirth", correct: true },
      { text: "Broken bones", correct: false },
      { text: "Heart conditions", correct: false },
      { text: "Old Age", correct: false },
    ],
    
  },
  {
    question: "Which Disney character famously leaves a glass slipper behind at a royal ball?",
    answers: [
      { text: "Pocahontas", correct: false },
      { text: "Cinderella", correct: true },
      { text: "Sleeping Beauty", correct: false },
      { text: "Elsa", correct: false },
    ],
  },
  {
    question: "What does the word loquacious mean?",
    answers: [
      { text: "Angry", correct: false },
      { text: "Shy", correct: false },
      { text: "Beautiful", correct: false },
      { text: "Chatty", correct: true },
    ],
  },
  {
    question: "World-wide, what language is used the most on the internet?",
    answers: [
      { text: "German", correct: false },
      { text: "English", correct: true },
      { text: "Spanish", correct: false },
      { text: "Chinese", correct: false },
    ],
  },
  {
    question: "Who is the most decorated player in Football history?",
    answers: [
      { text: "C. Ronaldo", correct: false },
      { text: "Dani Alves", correct: false },
      { text: "Lionel Messi", correct: true },
      { text: "Pele", correct: false },
    ],
  },
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hydro transport market leverage", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyper Textual making language", correct: false },
      { text: "Hyper Text Managing Land", correct: false },
    ],
  },
  {
    question: "The science of examining raw data with the purpose of drawing conclusions about that information.?",
    answers: [
      { text: "Data Analytics", correct: true },
      { text: "In-Memory Analytics", correct: false },
      { text: "Descriptive Analytics", correct: false },
      { text: "Predictive Analytics", correct: false },
    ],
  },
  {
    question: "The Smallest Country in the world is?",
    answers: [
      { text: "Mauritius", correct: false },
      { text: "Seychelles", correct: false },
      { text: "Nigeria", correct: false },
      { text: "Vatican City", correct: true },
    ],
  },
  {
    question: "Which Country won the last world cup?",
    answers: [
      { text: "France", correct: false },
      { text: "Argentina", correct: true },
      { text: "Spain", correct: false },
      { text: "England", correct: false },
    ],
  },
  {
    question: 'Which Football Club is Famously associated with the word "You\'ll never walk alone"?',
    answers: [
      { text: "Chelsea", correct: false },
      { text: "Arsenal", correct: false },
      { text: "Liverpool", correct: true },
      { text: "West Ham", correct: false },
    ],
  },
];

// DOM elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");

// Quiz state variables
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30; // Initial time in seconds

// Messages for different quiz outcomes
const congratulationsMessage = "Congratulations! You did a great job!";
const notGoodMessage = "Oops! Better luck next time.";

// Function to start the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 30; // Reset the timer
  nextButton.innerHTML = "Next";
  showQuestion();
  startTimer();
}

// Function to start the timer
function startTimer() {
  timer = setInterval(function () {
    if (timeLeft > 0) {
      timeLeft--;
      timerElement.textContent = `Time: ${timeLeft}s`;
    } else {
      clearInterval(timer);
      showScore();
    }
  }, 1000);
}

// Function to display the current question and its answer options
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

// Function to reset the state (clear answer buttons)
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// Function to handle the selection of an answer
function selectAnswer(e) {
  clearInterval(timer); // Stop the timer when an answer is selected
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  // Disable click after selecting one answer
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

// Function to display the final score
function showScore() {
  resetState();
  if (score >= questions.length / 2) {
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}. ${congratulationsMessage}`;
  } else {
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}. ${notGoodMessage}`;
  }
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
  timerElement.textContent = "Time's up!";
}

// Function to handle the next button click
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    startTimer();
  } else {
    showScore();
  }
}

// Event listener for the next button click
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

// Initial quiz start
startQuiz();