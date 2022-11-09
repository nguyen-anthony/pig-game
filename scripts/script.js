let rollResult = document.querySelector('#rollResult');
let turnTotalLabel = document.querySelector('#turnTotal');
let playerCards = document.querySelectorAll('.playerCard');
let playerScoreLabels = document.querySelectorAll('.playerScore');
let currentPlayerName = document.querySelector('#currentPlayerLabel').textContent;

let playerScoreMap = new Map();
playerScoreMap.set("Player 1", 99);
playerScoreMap.set("Player 2", 0);


let roll = 0;
let turnTotal = 0;


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
            turnTotal += roll;
            turnTotalLabel.textContent = turnTotal;
        }
    }, 1000);
}


//Hold Feature
document.querySelector("#holdBtn").addEventListener('click', () => {
    addToCurrentPlayerScore();
    checkWinner();
    resetTurnTotal();
    switchCurrentPlayer();
})

function addToCurrentPlayerScore() {
    let currentPlayerScore = document.querySelector('.currentPlayer>p');
    playerScoreMap.set(currentPlayerName, playerScoreMap.get(currentPlayerName) + turnTotal);

    currentPlayerScore.textContent = playerScoreMap.get(currentPlayerName);
}

//Switch Current Player
function switchCurrentPlayer() {
    playerCards.forEach((card) => {
        if(card.classList.contains('currentPlayer')){
            card.classList.remove('currentPlayer');
        } else {
            card.classList.add('currentPlayer');
            currentPlayerName = card.children[0].textContent;
            document.querySelector('#currentPlayerLabel').textContent = currentPlayerName;
        }
    })
}

//Reset Roll Result
function resetTurnTotal() {
    turnTotal = 0;
    turnTotalLabel.textContent = 0;
}


//Check Winner
function checkWinner() {
    if(playerScoreMap.get(currentPlayerName) >= 100){
        document.querySelector('#winnerNotification').textContent = `${currentPlayerName} won!`;
        disableButtons(false);
    }
}


//disable buttons
function disableButtons(all = true) {
    if(all) {
        document.querySelectorAll('button').forEach((button) => {
            button.disabled = true;
        });
    } else {
        document.querySelectorAll('.gameControl').forEach((button) => {
            button.disabled = true;
        });
    }
}

//enable buttons
function enableButtons(all = true) {
    if(all) {
        document.querySelectorAll('button').forEach((button) => {
            button.disabled = false;
        });
    } else {
        document.querySelectorAll('.gameControl').forEach((button) => {
            button.disabled = false;
        });
    }
}

//Reset Game Feature
document.querySelector('#resetBtn').addEventListener('click', () => {
    enableButtons();
    resetTurnTotal();
    document.querySelector('#winnerNotification').textContent = "";
    playerScoreMap.forEach((score) => {
        score = 0;
    });
    playerScoreLabels.forEach((label) => {
        label.textContent = 0;
    });
    if(!playerCards[0].classList.contains('currentPlayer')){
        playerCards[0].classList.add('currentPlayer');
        playerCards[1].classList.remove('currentPlayer');
    }
    rollResult.textContent = 1;
    alert("Game reset!");
})