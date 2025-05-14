class Deck {
  constructor() {
    this.id = null;
    this.ready = fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=4"
    )
      .then((res) => res.json())
      .then((data) => {
        this.id = data.deck_id;
      });
  }

  async getOneCard() {
    await this.ready;
    let res = await fetch(
      `https://deckofcardsapi.com/api/deck/${this.id}/draw/?count=1`
    );
    const { cards } = await res.json();
    let v = cards[0].value;
    // המרת קלף למספר
    if (["JACK", "QUEEN", "KING"].includes(v)) return 10;
    if (v === "ACE") return 11;
    return Number(v);
  }

  // async getOneCard(turn) {
  //   await this.initDeck;
  //   let value = null;
  //   await fetch(
  //     `https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //         data.cards.forEach((v) => {
  //             value = Number(v.value);
  //       });

  //       if (value == "JACK" || value == "KING" || value == "QUEEN") {
  //           value = 10;
  //       }
  //       if (value == "ACE") {
  //         value = 11; //    צריך להוסיף כאן את האפשרות של לבחור אם זה 11 אן 1
  //       }
  //       return value;
  //     })
  //     .then((value) => {
  //         if (turn == 0) {
  //           this.playerCards.push(value);
  //       } else {
  //         this.dilerCards.push(value);
  //       }
  //     });
  //   }
}
