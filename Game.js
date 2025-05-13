const btnHit = document.querySelector(".hit");
const btnstp = document.querySelector(".stop");
const inBord = document.querySelector(".inBord")
// this.states = {
//   SHUFFLING:  "shuffling",
//   DEALING:    "dealing",
//   PLAYER_TURN:"player-turn",
//   DEALER_TURN:"dealer-turn",
//   FINISHED:   "finished"
// };
class Game {
  constructor() {
    this.playerCards = []; // seva value of player cards
    this.dilerCards = []; // seva value of diler cards
    this.gameStatus = 0; // ceep trak of fase of Game for differnt bords
    this.deckId = null; // creating NEW deck for etch Game
    this.turn = 0; // player - 0, diler - 1

    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6")
      .then((res) => res.json())
      .then((data) => {
        this.deckId = data.deck_id;
      });
  }

  //  יוצר את המשחק  - 2 קלפים ללקוח  ו 2 לדילר
  prepareGame() {
    this.gameStatus = 1;
    this.getOneCard(1);
    this.getOneCard(1);
    this.getOneCard(0);
    this.getOneCard(0);
  }
  // הגדרה של תור של הלקוח
  playerTurn() {
    this.gameStatus = 2;
    if (this.sumOfPlayer() < 21 && this.sumOfPlayer() != 21) {
      btnHit.addEventListener("click", ()=>{this.getOneCard(0)});
      btnstp.addEventListener("click", ()=>{this.dilerTurn()});
    } else {
      btnHit.disabled = true;
    }
  }
  dilerTurn() {
    this.gameStatus = 3;
    if (this.sumOfDiler() < 17 && this.sumOfDiler() < this.sumOfPlayer()) {
      this.getOneCard(1);
    }
    if (this.sumOfDiler() >= 21 || this.sumOfDiler()>= this.sumOfPlayer()) {
      this.calculateWin();
    }
  }
  calculateWin() {
    let num = null;
    if (this.sumOfDiler() > this.sumOfPlayer()) {
      num = 1;
      this.winOrLoseBord(num);
    }
    if (this.sumOfDiler() < this.sumOfPlayer()) {
      num = 0;
      this.winOrLoseBord(num);
    }
    if (this.sumOfDiler() == this.sumOfPlayer()) {
      num = 2;
      this.winOrLoseBord(num);
    }
  }
  winOrLoseBord(num) {
    const winLoseBord = document.createElement("div");
    this.gameStatus = 4;
    if (num == 0) {
      winLoseBord.textContent = "player WIN";
    }
    if (num == 1) {
      winLoseBord.textContent = "diler WIN";
    }
    if (num == 2) {
      winLoseBord.textContent = "It Is a tai";
    }
    inBord.appendChild(winLoseBord)
  }

  async getOneCard(turn) {
    await this.initDeck;
    let value = null;
    await fetch(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`)
      .then((res) => res.json())
      .then((data) => {
        data.cards.forEach((v) => {
            
          value = Number(v.value);
        });

        if (value == "JACK" || value == "KING" || value == "QUEEN") {
          value = 10;
        }
        if (value == "ACE") {
          value = 11; //    צריך להוסיף כאן את האפשרות של לבחור אם זה 11 אן 1
        }
        return value;   
      })
      .then((value) => {
        if (turn == 0) {
          this.playerCards.push(value);
        } else {
          this.dilerCards.push(value);
        }
      });
  }
  sumOfPlayer() {
    let sumP = 0;
    for (let i = 0; i < this.playerCards.length; i++) {
      sumP += this.playerCards[i];
    }
    return sumP
}
sumOfDiler() {
    let sumD = 0;
    for (let i = 0; i < this.dilerCards.length; i++) {
        sumD += this.dilerCards[i];
    }
    return sumD
  }
}
