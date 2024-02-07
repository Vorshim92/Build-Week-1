const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: ["Central Process Unit", "Computer Personal Unit", "Central Processor Unit"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: ["Counter Strike: Source", "Corrective Style Sheet", "Computer Style Sheet"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

// variabili globali
let correctAnswersContainer = [];
let usedQuestion = [];
let newChart;
let timeCounter = 0;

const questionFromArray = () => {
  const h1Question = document.querySelector(".question-style");

  h1Question.innerText = "";
  let randQuest;
  do {
    randQuest = Math.floor(Math.random() * questions.length);
  } while (usedQuestion.includes(randQuest));
  usedQuestion.push(randQuest);

  h1Question.innerText = questions[randQuest].question;
  const buttons = document.querySelector(".answers-container");
  // ARRAY delle Risposte Totali, l'ultima è quella CORRETTA
  let totalAnswers = questions[randQuest].incorrect_answers.concat(questions[randQuest].correct_answer);

  // parte della funzione che aggiunge il numero di pulsanti corrispondente al numero di risposte totali
  buttons.innerHTML = "";
  for (let i = 0; i < totalAnswers.length; i++) {
    buttons.innerHTML += `<button class="answer"></button>`;
  }

  // parte della funzione che aggiunge randomicamente le risposte nei pulsanti
  const answers = document.querySelectorAll(".answers-container > button");
  let usedAnswer = [];
  let randAnswer;
  answers.forEach((button) => {
    do {
      randAnswer = Math.floor(Math.random() * totalAnswers.length);
    } while (usedAnswer.includes(randAnswer));
    usedAnswer.push(randAnswer);
    button.innerText = totalAnswers[randAnswer];
    if (randAnswer === totalAnswers.length - 1) {
      button.setAttribute("id", "correct");
    }
  });
  buttonClick();
  variableNumOfPage();
};

// const handleResize = (chart) => {
//   chart.resize();
// };
function drawPieChart(value, maxValue) {
  const ctx = document.getElementById("chart").getContext("2d");

  newChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [value, maxValue - value],
          backgroundColor: ["rgba(0, 255, 255, 1)", "rgba(151, 105, 156, 0.7)"],
        },
      ],
    },
    options: {
      cutout: "75%",
      borderWidth: 0,
      hoverBorderWidth: 2,
      // responsive: true,
      // onResize: handleResize,
      // maintainAspectRatio: false,
      tooltips: {
        enabled: false,
      },
      plugins: {
        datalabels: {
          backgroundColor: function (context) {
            return context.dataset.backgroundColor;
          },
          display: function (context) {
            var dataset = context.dataset;
            var value = dataset.data[context.dataIndex];
            return value > 0;
          },
          color: "white",
        },
      },
    },
  });
}

function updateChart(chart) {
  chart.data.datasets[0].data[0] = timeCounter;
  chart.data.datasets[0].data[1] = 60 - timeCounter;
  chart.update();
  // Reimposta il contatore del grafico
}

const init = () => {
  drawPieChart(0, 60);
  countdownTimer();
};

const countdownTimer = () => {
  timeCounter = 0;
  interval = setInterval(() => {
    if (usedQuestion.length === 10 && timeCounter === 60) {
      lastQuestion();
    } else if (timeCounter === 60) {
      questionFromArray();
      restartTimer();
    }
    timeCounter += 1;
    updateChart(newChart);
    let secondi = document.getElementById("seconds-remaining");
    secondi.innerText = 60 - timeCounter;
  }, 1000);
};

function restartTimer() {
  clearInterval(interval);
  countdownTimer();
}
function lastQuestion() {
  if (usedQuestion.length === 10) {
    resultPage();
    clearInterval(interval);
  }
}

const buttonClick = () => {
  const buttons = document.querySelectorAll(".answers-container > button");
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      if (this.id === "correct") {
        correctAnswersContainer.push(questions[usedQuestion[length]]);
        lastQuestion();
      } else {
        lastQuestion();
      }
      if (usedQuestion.length !== 10) {
        questionFromArray();
        restartTimer();
      }
      console.log(correctAnswersContainer);
      console.log(correctAnswersContainer.length);
    });
  });
};

// FUNZIONE PER IL NUMERO DI PAGINA/DOMANDA
const variableNumOfPage = function () {
  const numOfPageContainer = document.querySelector(`.question-number`);
  numOfPageContainer.innerText = usedQuestion.length;
};

const resultPage = function () {
  newChart.destroy();
  const head = document.getElementById("newHead");
  head.innerHTML = "";
  head.innerHTML = `<meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>RESULT</title>

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&family=Outfit:wght@300;400;700&display=swap"
    rel="stylesheet"
  />

  <link rel="stylesheet" href="./assets/css/style-result.css" />`;

  let percentuali = Math.round((correctAnswersContainer.length / usedQuestion.length) * 1000) / 10;
  let message = "";
  if (percentuali >= 60) {
    message = '<h5 class="cong">Congratulations!</h5><h5 class="pass">You passed the exam.</h5>';
  } else {
    message = `<h5 class="cong">You failed.</h5><h5 class="pass">Better luck next time!</h5>`;
  }

  const body = document.body;
  body.innerHTML = "";
  body.innerHTML = `<header>
  <div class="logo-epicode">
    <img src="./assets/img/epicode_logo.png" alt="logo-epicode" />
  </div>
  <h1 class="title">Results</h1>
  <h2 class="summary">The summary of your answers:</h2>
</header>
<main>
  <section class="container">
    <div class="correct">
      <h3 class="cor-wro1">Correct</h3>
      <h3 class="cor-wro2">${percentuali}%</h3>
      <p class="domande">${correctAnswersContainer.length}/${usedQuestion.length} questions</p>
    </div>
    <div class="inblock-circle">
    <canvas id="chart"></canvas>
    <div id="inchart">
    ${message}
      <p class="send">
        We'll send you the certificate<br />
        in few minutes
        Check your email (including<br />
        promotions/spam folder)
      </p>
      </div>
    
    </div>
    <div class="wrong">
      <h3 class="cor-wro1">Wrong</h3>
      <h3 class="cor-wro2">${100 - percentuali}%</h3>
      <p class="domande"> ${usedQuestion.length - correctAnswersContainer.length}/${usedQuestion.length} questions</p>
    </div>
  </section>
  <div class="button"><button id="but" class="border-button">RATE US</button></div>
</main>
<script src="
https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js
"></script>
    <script src="./assets/js/index.js"></script>`;
  rateUs();
  drawPieChart(correctAnswersContainer.length, 10);
  newChart.data.datasets[0].backgroundColor[0] = "rgba(194, 18, 141, 1)";
  newChart.data.datasets[0].backgroundColor[1] = "rgba(0, 255, 255, 1)";
};

const rateUs = () => {
  const btnRateUs = document.getElementById("but");
  btnRateUs.addEventListener("click", () => {
    window.location.href = "../../feedback.html";
  });
};

window.onload = function () {
  questionFromArray();
  init();
  // TIPS:
  // SE MOSTRI TUTTE LE RISPOSTE ASSIEME IN FORMATO LISTA:
  // Per ogni domanda, crea un container e incorporale tutte all'interno.
  // Crea poi dei radio button
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio
  // con le risposte corrette e incorrette come opzioni
  // (dovrai probabilmente cercare su un motore di ricerca come ottenere un valore da un radio button in JS per ottenere il punteggio finale)
  //
  // SE MOSTRI UNA DOMANDA ALLA VOLTA:
  // Mostra la prima domanda con il testo e i radio button.
  // Quando l'utente seleziona una risposta, passa alla domanda successiva dell'array e sostituisci quella precedentemente visualizzata con quella corrente,
  // salvando le risposte dell'utente in una variabile
};

// Come calcolare il risultato? Hai due strade:
// Se stai mostrando tutte le domande nello stesso momento, controlla semplicemente se i radio button selezionati sono === correct_answer
// Se stai mostrando una domanda alla volta, aggiungi semplicemente un punto alla variabile del punteggio che hai precedentemente creato SE la risposta selezionata è === correct_answer

// BUON LAVORO 💪🚀
