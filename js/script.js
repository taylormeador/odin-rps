const CHOICES = ['rock', 'paper', 'scissors'];
const WINNING_SCORE = 5;

//init game
let game = {
    playerScore: 0,
    cpuScore: 0,
    rounds: 0,
    playerChoice: '',
    cpuChoice: '',
    winner: '',
}

// doc elements and setting listeners
const weaponSelectors = document.querySelector('.select-weapon');
weaponSelectors.addEventListener('click', handleWeaponClick);

const currentScore = document.querySelector('#current-score');
const announcement = document.querySelector('#announcement');

// cpu player funcs
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getComputerChoice() {
    return CHOICES[getRandomInt(3)]
}

// text manipulations
function getAnnouncement(a, b, score) {
    if (score[0] == score[1]) {
        return `Tie! You both chose ${a}`;
    } else if (score[0]) {
        a = capitalize(a);
        return `You Win! ${a} beats ${b}`;
    } else {
        b = capitalize(b);
        return `You Lose! ${b} beats ${a}`;
    }  
}

function capitalize(s) {
    return s[0].toUpperCase() + s.substring(1);
}

// game logic
function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        handleResult([0, 0]);
        return;
    } else if (getWinner(playerSelection, computerSelection)) {
        handleResult([1, 0]);
        return;
    } else {
        handleResult([0, 1]);
        return;
    }
}

function getWinner(a, b) {
    switch (a) {
        case 'rock':
            if (b === 'paper') {
                return false;
            }
            return true;
        
        case 'paper':
            if (b === 'scissors') {
                return false;
            }
            return true;

        case 'scissors':
            if (b === 'rock') {
                return false;
            }
            return true;
    }
}

function gameOver() {
    game.playerScore >= 5 ? game.winner = 'You' : game.winner = 'Computer';
    currentScore.textContent = `Game over! ${game.winner} won this round`;
    announcement.textContent = 'Choose a weapon to start a new game!'
    if (game.winner === 'You') {
        startConfetti();
    }
    // init new game
    game = {
        playerScore: 0,
        cpuScore: 0,
        rounds: 0,
        playerChoice: '',
        cpuChoice: '',
        winner: '',
    }
}

// event handling
function handleWeaponClick(e) {
    stopConfetti();
    const isButton = e.target.nodeName === 'INPUT';
    if (!isButton) {
        return;
    }
    let weapon = e.target.id.split('-')[0];
    let cpuWeapon = getComputerChoice();
    game.playerChoice = weapon;
    game.cpuChoice = cpuWeapon;
    playRound(weapon, cpuWeapon);
}

function handleResult(result) {
    game.playerScore += result[0];
    game.cpuScore += result[1];
    game.rounds += 1;
    announcement.textContent = getAnnouncement(game.playerChoice, game.cpuChoice, result);
    if (game.playerScore >= WINNING_SCORE || game.cpuScore >= WINNING_SCORE) {
        gameOver();
    } else {
        currentScore.textContent = `Player score: ${game.playerScore} | Computer score: ${game.cpuScore}`
    }
}


