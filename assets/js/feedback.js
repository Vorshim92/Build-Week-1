// variabili globali
let feedback = [];
let rating = 0;
// FUNZIONE PER GENERARE I DIV CON DENTRO LE STELLE .SVG
const starsRating = () => {
  const divStar = document.querySelector(".stars");
  for (let i = 0; i < 10; i++) {
    divStar.innerHTML += `<div class="div-star"><svg class="star" viewBox="0 0 47 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M22.2044 1.55551C22.6143 0.569963 24.0104 0.569964 24.4203 1.55552L29.9874 14.9402C30.1602 15.3557 30.5509 15.6396 30.9994 15.6756L45.4494 16.834C46.5134 16.9193 46.9448 18.2471 46.1341 18.9415L35.1248 28.3722C34.7831 28.6649 34.6338 29.1242 34.7382 29.5619L38.1018 43.6626C38.3494 44.7009 37.2199 45.5215 36.309 44.9651L23.9379 37.4089C23.5538 37.1743 23.0709 37.1743 22.6868 37.4089L10.3157 44.9651C9.40478 45.5215 8.27528 44.7009 8.52295 43.6626L11.8865 29.5619C11.9909 29.1242 11.8416 28.6649 11.4999 28.3722L0.490575 18.9415C-0.320069 18.2471 0.111362 16.9193 1.17535 16.834L15.6253 15.6756C16.0738 15.6396 16.4645 15.3557 16.6374 14.9402L22.2044 1.55551Z"
          fill="#080c29"
        />
      </svg></div>`;
  }
  clickStar(); // richiamo la funzione immediatamente dopo la creazione delle stelle per potergli aggiungere i vari eventListener
};

const clickStar = () => {
  const allStar = document.querySelectorAll(".div-star");
  rating = 0;
  allStar.forEach((star, index) => {
    star.addEventListener("mouseenter", function (e) {
      for (let i = 0; i <= index - 1; i++) {
        allStar[i].querySelector("svg > path").setAttribute("fill", "#395c5c");
        allStar[index].querySelector("svg > path").setAttribute("fill", "#00ffff");
      }
    });
    star.addEventListener("mouseleave", function (e) {
      for (let i = 0; i <= index - 1; i++) {
        allStar[i].querySelector("svg > path").setAttribute("fill", "#080c29");
        allStar[index].querySelector("svg > path").setAttribute("fill", "#080c29");
      }
    });
    star.addEventListener("click", function (e) {
      for (let i = 0; i <= index; i++) {
        allStar[i].querySelector("svg").setAttribute("id", "stars");
        for (let j = index + 1; j < allStar.length; j++) {
          allStar[j].querySelector("svg").removeAttribute("id");
        }
      }

      rating = index + 1;
    });
  });
};

const submitRating = () => {
  const formRating = document.getElementById("form-rating");
  const comment = document.getElementById("input-text");
  formRating.addEventListener("submit", function (e) {
    e.preventDefault();
    // pushare nell'array feedback un oggetto contenente , rating, commento
    let obj = { rate: `${rating}`, comment: `${comment.value}` };

    feedback.push(obj);

    feedbackResult(rating);
  });
};

const feedbackResult = (feedbackSubmitted) => {
  const body = document.body;
  body.innerHTML = "";
  body.innerHTML = `<header>
  <div class="logo"><a href="https://epicode.com/"><img src="./assets/img/epicode_logo.png" alt="Epicode logo" /></a></div>
</header>
<main>
  <div id="fb-container">
    
    
  </div>
</main>
<footer>
  <a href="https://epicode.com/"><button id="more">MORE INFO</button></a>
  <p>&copy; EPICODE School</p>
</footer>
<!-- BEGIN_SCRIPT -->

<script src="./assets/js/feedback.js"></script>
<!-- END_SCRIPT -->`;
  const containerFb = document.getElementById("fb-container");

  if (feedbackSubmitted >= 6) {
    containerFb.innerHTML = `<div id="positive-fb">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="currentColor"
      class="bi bi-emoji-smile"
      viewBox="0 0 16 16"
    >
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
      <path
        d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5"
      />
    </svg>
    <p>Siamo felici che la tua esperienza sia stata positiva e non vediamo l'ora di rivederti.</p>
  </div>`;
  } else
    containerFb.innerHTML = `<div id="negative-fb">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    fill="currentColor"
    class="bi bi-emoji-frown"
    viewBox="0 0 16 16"
  >
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
    <path
      d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.5 3.5 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.5 4.5 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5"
    />
  </svg>
  <p>
    Ci dispiace che la tua esperienza non sia stata del tutto positiva! Non vediamo comunque l'ora di rivederti
    per farti cambiare idea.
  </p>
</div>`;
};

window.onload = function () {
  starsRating();
  submitRating();
};
