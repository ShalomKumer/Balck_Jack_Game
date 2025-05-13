class Game{
    constructor(){
        const playerCards = [];
        const dilerCards = [];
        const gameStatus = 0;
    }
    //  יוצר את המשחק  - 2 קלפים ללקוח  ו קלף אחד לדילר
    prepareGame(){
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(res => res.json())
        .then()
        .then()
        .then()
        .then()
        .then()

    }
    // הגדרה של תור של הלקוח 
    playerTurn(){

    }
    // ניצחון של הלקוח 
    playerWon(){

    }
    dilerTurn(){

    }
    calculateWin(){

    }
    winOrLoseBrd(){

    }


}