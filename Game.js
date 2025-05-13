const btnHit = document.querySelector(".hit");
const btnstp = document.querySelector(".stop");

class Game {
  constructor() {

    const playerCards = []; // seva value of player cards
    const dilerCards = []; // seva value of diler cards
    const gameStatus = 0; // ceep trak of fase of Game for differnt bords
    const deckId = null; // creating NEW deck for etch Game
    const turn = 0; // player - 0, diler - 1

    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
      .then((res) => res.json())
      .then((data) => {
        this.deckId = data.deck_id;
      });

  }

  //  יוצר את המשחק  - 2 קלפים ללקוח  ו 2 לדילר
  prepareGame() {
    gameStatus = 1;
    this.getOneCard(1);
    this.getOneCard(1);
    this.getOneCard(0);
    this.getOneCard(0);
    console.log(playerCards);
    console.log(dilerCards);
  }
  // הגדרה של תור של הלקוח
  playerTurn() {
    gameStatus = 2;
    if (this.sumOfPlayer() < 21 || this.sumOfPlayer != 21) {
      btnHit.addEventListener("click", this.getOneCard(0));
      btnstp.addEventListener("click", this.dilerTurn);
    } else {
      btnHit.disabled = true;
    }
  }
  dilerTurn() {
    gameStatus = 3;
    if(this.sumOfDiler() < 17  && this.sumOfDiler() < this.sumOfPlayer()){
        this.getOneCard(1)
    }
    if (this.sumOfDiler() >= 21  || this.sumOfDiler >= this.sumOfPlayer) {
        this.calculateWin()
    }
  }
  calculateWin() {
    const num = null;
    if(this.sumOfDiler > this.sumOfPlayer){
        num = 1;
        winOrLoseBord(num)
    }
    if(this.sumOfDiler < this.sumOfPlayer){
        num = 0;
        winOrLoseBord(num)
    }
    if(this.sumOfDiler == this.sumOfPlayer){
        num = 2;
        winOrLoseBord(num)
    }
  }
  winOrLoseBord(num) {
    const winLoseBord = document.createElement("div")
    gameStatus = 4;
    if(num == 0){
        winLoseBord.textContent = "player WIN"
    }
    if(num == 1){
        winLoseBord.textContent = "diler WIN"
        
    }
    if(num == 2){
        winLoseBord.textContent = "It Is a tai"
        
    }
  }

  getOneCard(turn) {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then((res) => res.json())
      .then((data) => {
        data.cards.forEach((v) => {
          const value = v.value;
        });
        if (value == "JACK" || value == "KING" || value == "QUEEN") {
          value = 10;
        }
        if (value == "ACE") {
          value = 11; //    צריך להוסיף כאן את האפשרות של לבחור אם זה 11 אן 1
        }
      })
      .then((t) => {
        if (turn == 0) {
          playerCards.push(value);
        } else {
          t.dilerCards.push(value);
        }
      });
  }
  sumOfPlayer() {
    const sumP = 0;
    for (let i = 0; i < playerCards.length; i++) {
      sumP += playerCards[i];
    }
  }
  sumOfDiler() {
    const sumD = 0;
    for (let i = 0; i < dilerCards.length; i++) {
      sumP += dilerCards[i];
    }
  }
}
