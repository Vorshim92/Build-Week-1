const resetQuestions = () => {
  const body = document.body ;
  let percentuali = Math.round((correctAnswersContainer / usedQuestion.length) * 100 * 10) / 10;
  let message = "";
  if (percentuali >= 60) {
    message = '<h5 class="cong">Congratulations!</h5><h5 class="pass">You passed the exam.</h5>';
  } else {
    message = `<h5 class="cong">You failed.</h5><h5 class="pass">Better luck next time!</h5>`;
  }
  body.innerHTML = 
    `<header>
      <div class="logo-epicode">
        <img src="./assets/img/epicode_logo.png" alt="logo-epicode" />
      </div>
      <h1 class="title">Results</h1>
      <h2 class="summary">The summary of your answers:</h2>
    </header>
    <main>
      <section class="container">
        <div class="correct">
          <h3 class="cor-wro">Correct</h3>
          <h3 class="cor-wro percentuali">${percentuali}%</h3>
          <p class="domande">${correctAnswersContainer}/${usedQuestion.length} questions</p>
        </div>
        <div class="inblock-circle">
        ${message}
          <p class="send">
            We'll send you the certificate<br />
            in few minutes
          </p>
          <p class="send">
            Check your email (including<br />
            promotions/spam folder)
          </p>
        </div>
        <div class="wrong">
          <h3 class="cor-wro">Wrong</h3>
          <h3 class="cor-wro percentuali">${100 - percentuali}%</h3>
          <p class="domande"> ${usedQuestion.length - correctAnswersContainer}/${usedQuestion.length} questions</p>
        </div>
      </section>
      <div id="but" class="button"><button class="border-button">RATE US</button></div>
    </main>`

     const rateUs = document.getElementById("but");
  rateUs.addEventListener("click", () => {
    window.location.href = "feedback.html";
  });
}




















