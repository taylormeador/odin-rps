const CHOICES = ['rock', 'paper', 'scissors']

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function getComputerChoice() {
    return CHOICES[getRandomInt(3)]
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

function getAnnouncement(a, b, score) {
    if (score[0] == score[1]) {
        return `Tie! You both chose ${a}`;
    } else if (score[0]) {
        return `You Win! ${a} beats ${b}`;
    } else {
        return `You Lose! ${b} beats ${a}`;
    }  
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return [0, 0];
    } else if (getWinner(playerSelection, computerSelection)) {
        return [1, 0];
    } else {
        return [0, 1];
    }
}

function game(rounds) {
    let playerScore = 0;
    let cpuScore = 0;
    for (let i = 0; i < rounds; i++) {
        let playerChoice = prompt('Choose your weapon!');
        let cpuChoice = getComputerChoice();
        let result = playRound(playerChoice, cpuChoice);

        playerScore += result[0];
        cpuScore += result[1];
        console.log(getAnnouncement(playerChoice, cpuChoice, result))
        console.log(`Player score: ${playerScore} Computer score: ${cpuScore}`)
    }
}

game(3)