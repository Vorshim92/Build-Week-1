// variabili globali:
let newChart;
let arrayQuestions = [];
let usedQuestion = [];
let timeCounter = 0;
let correctAnswersContainer = [];
let incorrectAnswerContainer = [];

const formQuestions = () => {
  const questionForm = document.getElementById("pre-questionary");
  questionForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let indexDifficulty = document.querySelector("#diff-container > div > input:checked").value;
    let amountQuestions = document.querySelector("#numQuest-container > div > input:checked").value;
    fetchQuestions(amountQuestions, indexDifficulty);
  });

  //get Data from Form
};

async function fetchQuestions(amount, index) {
  let difficulty = ["easy", "medium", "hard"];
  const response = await fetch(
    `https://opentdb.com/api.php?amount=${amount}&category=18&difficulty=${difficulty[index]}`
  );
  const data = await response.json();
  const questions = data.results;

  // Push dell'array di domande all'interno dell'array vuoto
  arrayQuestions.push(...questions);
  benchmarkPage();
  init();
  // Stampa dell'array con le domande aggiunte
}

const benchmarkPage = function () {
  const body = document.body;
  body.innerHTML = ""; // reset del contenuto del body e successivo innerHTML con la nuova struttura.
  body.innerHTML = `<!-- BEGIN_HEADER -->
  <header>
    <div>
      <img src="./assets/img/epicode_logo.png" alt="" />
    </div>
    <div class="time-container">
      <div class="c-countdown-wrapper">
        <canvas id="chart"></canvas>
      </div>
      <div class="time">
        <p>SECONDS</p>
        <div id="seconds-remaining">60</div>
        <p>REMAINING</p>
      </div>
    </div>
  </header>
  <!-- END_HEADER -->

  <!-- BEGIN_MAIN -->
  <main>
    <div class="question-container">
      <h1 class="question-style"></h1>
    </div>
    <div class="answers-container"></div>
  </main>
  <!-- END_MAIN -->

  <!-- BEGIN_FOOTER -->
  <footer>
    <div class="question-counter-container">
    </div>
  </footer>
  <!-- END_FOOTER -->

  <!-- BEGIN_SCRIPT -->
  <script src="
https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js
"></script>
  <script src="./assets/js/index.js"></script>
  <!-- END_SCRIPT -->`;
  questionFromArray();
};

// FUNZIONE CHE GENERA AD OGNI GIRO UNA DOMANDA CASUALE E LE RELATIVE RISPOSTE NEI PULSANTI
const questionFromArray = () => {
  const h1Question = document.querySelector(".question-style");

  // randomizzazione dell'array delle domande
  let randQuest;
  do {
    randQuest = Math.floor(Math.random() * arrayQuestions.length); // genero un numero casuale da usare come index casuale per l'array delle domande
  } while (usedQuestion.some((usedquestion) => arrayQuestions[randQuest].question === usedquestion.question)); // il controllo per la condizione del while lo faccio tra le stringhe dei paramentri question degli oggetti dei due array
  usedQuestion.push(arrayQuestions[randQuest]); // pusho dentro l'array di controllo per le domande usate la domanda uscita

  h1Question.innerText = "";
  // inserimento della question con fix CARATTERI HTML
  h1Question.innerText = arrayQuestions[randQuest].question
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, `"`)
    .replace(/&gt;/g, `>`)
    .replace(/&lt;/g, `<`);

  const buttons = document.querySelector(".answers-container");
  // let totalAnswers = arrayQuestions[randQuest].incorrect_answers.concat(arrayQuestions[randQuest].correct_answer); // creo un ARRAY unico con le Risposte Totali, sia incorrect che correct
  let totalAnswers = arrayQuestions[randQuest].incorrect_answers
    .concat(arrayQuestions[randQuest].correct_answer)
    .map((answer) =>
      answer
        .replace(/&#039;/g, "'")
        .replace(/&quot;/g, `"`)
        .replace(/&gt;/g, `>`)
        .replace(/&lt;/g, `<`)
    ); // creo un ARRAY unico con le Risposte Totali, sia incorrect che correct

  buttons.innerHTML = ""; // resetto per sicurezza i pulsanti ad ogni iterazione
  for (let i = 0; i < totalAnswers.length; i++) {
    // parte della funzione che aggiunge il numero di pulsanti corrispondente al numero di risposte totali
    buttons.innerHTML += `<button class="answer"></button>`;
  }

  // parte della funzione che aggiunge randomicamente le risposte nei pulsanti
  const answers = document.querySelectorAll(".answers-container > button");
  let usedAnswer = [];
  let randAnswer;
  // stesso sistema di controllo simile a quello della creazione randomica delle domande, con un forEach però
  answers.forEach((button) => {
    do {
      randAnswer = Math.floor(Math.random() * totalAnswers.length);
    } while (usedAnswer.includes(randAnswer));
    usedAnswer.push(randAnswer);
    button.innerText = totalAnswers[randAnswer];
  });

  buttonClick(); // richiamo la funzione alla riga 212 per aggiungere ai pulsati l'Event Listener del click
  variableNumOfPage(); // richiamo la funzione alla riga 231 ad ogni giro di domanda per aggiornare il numero della question nel footer
};

// costante commentata per eventualmente lavorare sul resize del grafico in modo responsive. da implementare in futuro
// const handleResize = (chart) => {
//   chart.resize();
// };

// esperimento testo integrato nel chart da rivedere
// const doughnutLabel = {
//   id: "doughnutLabel",
//   beforeDatasetsDraw(chart, args, pluginOptions) {
//     const { ctx, data } = chart;
//     ctx.save();
//     const xCoor = chart.getDatasetMeta(0).data[0].x;
//     const yCoor = chart.getDatasetMeta(0).data[0].y;
//     ctx.font = "bold 30px sans-serif";
//     ctx.fillStyle = "rgba(0, 255, 255, 1)";
//     ctx.textBaseline = middle;
//     ctx.textAlign = "center";
//     ctx.fillText("texttexttexttexttexttexttexttexttext", xCoor, yCoor);
//   },
// };

//funzione per creare il grafico doughnut
function drawPieChart(value, maxValue) {
  const ctx = document.getElementById("chart").getContext("2d");

  newChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [value, maxValue - value],
          backgroundColor: ["rgba(151, 105, 156, 0.7)", "rgba(0, 255, 255, 1)"],
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
      // plugins: [doughnutLabel],

      // datalabels: {
      //   backgroundColor: function (context) {
      //     return context.dataset.backgroundColor;
      //   },
      //   display: function (context) {
      //     var dataset = context.dataset;
      //     var value = dataset.data[context.dataIndex];
      //     return value > 0;
      //   },
      //   color: "white",
      // },
    },
  });
}

// Funzione per reimposta il contatore del grafico ad ogni giro di counter
function updateChart() {
  newChart.data.datasets[0].data[0] = 60 - timeCounter;
  newChart.data.datasets[0].data[1] = timeCounter;

  newChart.update();
}
// funzione per inizializzare il grafico a torta all'avvio, compreso del setInterval
const init = () => {
  drawPieChart(0, 0);
  countdownTimer();
};

// funzione che gestisce il timer del grafico. ogni volta che viene richiamato resetta il timer a 0 (visto che il grafico lavora sul Maxvalue - value)
const countdownTimer = () => {
  timeCounter = 0;
  interval = setInterval(() => {
    if (usedQuestion.length === arrayQuestions.length && timeCounter === 60) {
      clearInterval(interval);
      resultPage();
      return;
    } else if (timeCounter === 60) {
      clearInterval(interval);
      questionFromArray();
      countdownTimer();
      return;
    }
    timeCounter += 1;
    updateChart(newChart);
    let secondi = document.getElementById("seconds-remaining");
    secondi.innerText = 60 - timeCounter;
  }, 1000);
};

// funzione per restartare il timer

// funzione importante che si attiva solo quando siamo all'ultima domanda, ferma l'intervallo e richiama la funzione che ci porta alla pagina nuova Result

// funzione che aggiunge gli eventlistener ai pulsanti delle risposte e fa diversi controlli e richiama alcune funzioni in base a determinate condizioni
const buttonClick = () => {
  const buttons = document.querySelectorAll(".answers-container > button");

  const handleClick = function (e) {
    //FUNZIONE DI CALLBACK PER EVENT LISTENER
    clearInterval(interval);
    if (this.innerText === usedQuestion[usedQuestion.length - 1].correct_answer) {
      correctAnswersContainer.push(usedQuestion[usedQuestion.length - 1]);
      this.setAttribute("id", "correct");
    } else {
      this.setAttribute("id", "incorrect");
    }
    setTimeout(() => {
      if (usedQuestion.length === arrayQuestions.length) {
        resultPage();
      } else {
        questionFromArray();
        countdownTimer();
      }
    }, 1000);

    // Rimuovi l'event listener da tutti i pulsanti
    buttons.forEach((button) => {
      button.removeEventListener("click", handleClick);
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", handleClick);
  });
};

// FUNZIONE PER IL NUMERO DI PAGINA/DOMANDA NEL FOOTER
const variableNumOfPage = function () {
  // const numOfPageContainer = document.querySelector(`.question-number`);
  // numOfPageContainer.innerText = usedQuestion.length + " / " + arrayQuestions.length;

  const numOfPageContainer = document.querySelector(`.question-counter-container`);
  numOfPageContainer.innerHTML = "";
  numOfPageContainer.innerHTML = `<p>QUESTION</p>
  <p class="question-number">${usedQuestion.length} </p>
  <p> / ${arrayQuestions.length}</p>`;
};

//SUPER RESET DELLA PAGINA PER PASSARE A QUELLA DEI RISULTATI
const resultPage = function () {
  // newChart.destroy(); // distruggo il vecchio newChart (grafico del timer) per poterlo ricreare successivamente per altro utilizzo

  // CREAZIONE ARRAY CON LE DOMANDE SBAGLIATE, FACENDO UN ARRAY CONFRONTANDO QUELLE CORRETTE E l'ARRAY MADRE DELLE DOMANDE
  incorrectAnswerContainer = arrayQuestions.filter(
    (obj2) => !correctAnswersContainer.some((obj1) => obj1.question === obj2.question)
  );

  const head = document.getElementById("newHead");
  head.innerHTML = ""; // reset dell'head e successivo innerHTML con la nuova struttura, tra cui il nuovo foglio di stile css.
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
  body.innerHTML = ""; // reset del contenuto del body e successivo innerHTML con la nuova struttura.
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
      <p class="domande"> ${incorrectAnswerContainer.length}/${usedQuestion.length} questions</p>
    </div>
  </section>
  <div class="button"><button id="but" class="border-button">RATE US</button></div>
</main>
<script src="
https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js
"></script>
    <script src="./assets/js/index.js"></script>`;
  rateUs(); // richiamo la funzione per il pulsante Rate US
  drawPieChart(incorrectAnswerContainer.length, arrayQuestions.length); // nuovo Chart grafico per visualizzare i risultati, con nuovi valori e colori
  newChart.data.datasets[0].backgroundColor[0] = "rgba(194, 18, 141, 1)";
  newChart.data.datasets[0].backgroundColor[1] = "rgba(0, 255, 255, 1)";
};

// funzione redirect pulsante Rate US
const rateUs = () => {
  const btnRateUs = document.getElementById("but");
  btnRateUs.addEventListener("click", () => {
    window.location.href = "../../feedback.html";
  });
};

window.onload = function () {
  formQuestions();
};
