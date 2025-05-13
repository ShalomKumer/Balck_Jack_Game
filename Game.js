class Game{
    constructor(){
        const playerCards = [];
        const dilerCards = [];
        const gameStatus = 0;
        const deckId = fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(res => res.json())
        .then(deck => deck)
    }
    //  יוצר את המשחק  - 2 קלפים ללקוח  ו קלף אחד לדילר
    prepareGame(){
        gameStatus = 1
        fetch(``)
        .then(res => res.json())
        .then()
        .then()
        .then()
        .then()
        .then()

    }
    // הגדרה של תור של הלקוח 
    playerTurn(){
        gameStatus = 2
    }
    // ניצחון של הלקוח 
    playerWon(){

    }
    dilerTurn(){
        gameStatus = 3
    }
    calculateWin(){
        

    }
    winOrLoseBrd(){
        gameStatus = 4
    }


}