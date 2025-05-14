class Game {
  constructor(deck) {
    this.deck = deck;
    this.playerCards = []; // save value of player cards
    this.dilerCards = []; // seva value of diler cards
    this.status = null; // ceep trak of fase of Game
  }

  static calcSum(hend) {
    let sum = hend.reduce((a, b) => a + b, 0);
    let aces = hend.filter((v) => v === 11).length;
    while (sum > 21 && aces > 0) {
      sum -= 10; // להפוך ACE מ-11 ל-1
      aces -= 1;
    }
    return sum;
  }
  //  יוצר את המשחק  - 2 קלפים ללקוח  ו 2 לדילר
  async prepareGame() {
    // this.gameStatus = 1;
    this.playerCards = [];
    this.dilerCards = [];
    for (let i = 0; i < 2; i++) {
      this.playerCards.push(await this.deck.getOneCard());
      this.dilerCards.push(await this.deck.getOneCard());
    }
  }

  // הגדרה של תור של הלקוח
  async playerTurn() {
    if (this.status !== "player") return; // stop the fun

    this.playerCards.push(await this.deck.getOneCard());
    if (Game.calcSum(this.playerCards) > 21) {
      this.status = "finished";
      return "bust";
    }
    return "continue";
  }
  async dilerTurn() {
    if (this.status !== "dealer") return;
    this.status = "dealer";
    while (Game.calcSum(this.dilerCards) < 17) {
      this.dilerCards.push(await this.deck.getOneCard());
    }
    if (Game.calcSum(this.dilerCards) > 21) {
      this.status = "finished";
      return "bust";
    }
    this.status = "finished";
  }
  calculateWin() {
    // this.gameStatus = 4;
    const p = Game.calcSum(this.playerCards);
    const d = Game.calcSum(this.dilerCards);
    if (p > 21) return "Dealer wins!";
    if (d > 21) return "Player wins!";
    if (p > d) return "Player wins!";
    if (d > p) return "Dealer wins!";
    return "Tie!";
  }
}

// const winLoseBord = document.createElement("div");
// if (p > 21) winLoseBord.textContent = "Dealer wins!";
// if (d > 21) winLoseBord.textContent = "Player wins!";
// if (p > d) winLoseBord.textContent = "Player wins!";
// if (d > p) winLoseBord.textContent = "Dealer wins!";
// else winLoseBord.textContent = "Tie!";
// inBord.appendChild(winLoseBord);
