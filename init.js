const con = document.querySelector(".con");
const bord = document.querySelector(".bord");
const diler = document.querySelector(".diler");
const player = document.querySelector(".player");
const inBord = document.querySelector(".inBord");
const buttons = document.querySelector(".buttons");
const btnHit = document.querySelector(".hit");
const btnStop = document.querySelector(".stop");

async function renderHand(div, hand) {
  div.innerHTML = "";
  for (let v of hand) {
    // אם placeholder (לעומת הדגמה)
    if (v === null) v = await deck.drawOne();
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = v;
    div.append(card);
  }
}
const deck = new Deck();
const game = new Game(deck);

