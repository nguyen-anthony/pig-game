let rollResult = document.querySelector('#rollResult');
let turnTotal = document.querySelector('#turnTotal');
let playerCards = document.querySelectorAll('.playerCard');
let playerScores = document.querySelectorAll('.playerScore');

let roll = 0;


//Roll Die Feature
document.querySelector("#rollDie").addEventListener('click', () => {
    rollDie();
})

function rollDie() {
    var randomize = setInterval(() => {
        roll = Math.floor(Math.random() * (6 - 1 + 1) + 1);
        rollResult.textContent = roll;
        disableButtons();
    }, 10)
    setTimeout(() => {
        clearInterval(randomize);
        enableButtons();
        if(roll == 1) {
            resetTurnTotal();
            switchCurrentPlayer();
        } else {
            turnTotal.textContent = parseInt(turnTotal.textContent) + parseInt(rollResult.textContent);
        }
    }, 1000);
}


//Hold Feature
document.querySelector("#holdBtn").addEventListener('click', () => {
    addToCurrentPlayerScore();
    resetTurnTotal();
    switchCurrentPlayer();
    checkWinner()
})

function addToCurrentPlayerScore() {
    let currentPlayerScore = document.querySelector('.currentPlayer>p');
    currentPlayerScore.textContent = parseInt(currentPlayerScore.textContent) +  parseInt(turnTotal.textContent);
}

//Switch Current Player
function switchCurrentPlayer() {
    playerCards.forEach((card) => {
        card.classList.contains('currentPlayer') 
        ? card.classList.remove('currentPlayer') 
        : card.classList.add('currentPlayer');
    })
}

//Reset Roll Result
function resetTurnTotal() {
    turnTotal.textContent = 0;
}


//Check Winner
function checkWinner() {
    playerScores.forEach((score) => {
        if(parseInt(score.textContent) >= 100) {
            console.log("A player won!");
            disableButtons();
        }
    })
}


//disable buttons
function disableButtons() {
    document.querySelectorAll('button').forEach((button) => {
        button.disabled = true;
    });
}

//enable buttons
function enableButtons() {
    document.querySelectorAll('button').forEach((button) => {
        button.disabled = false;
    });
}