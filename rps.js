/* 
ROCK PAPER AND SCISSORS
little console game written for THE ODIN PROJECT assignment 
*/

const ROUNDS = 5; // How many rounds. For now as constant, later player may choose no of rounds..
const humanButton = Array.from(document.querySelectorAll(".human-button"));
const playButton = document.querySelector("#computer");
const statusPanel = document.querySelector(".status-panel");
const infoRound = document.querySelector(".info-round");
const result = document.querySelector(".result");

let humanSelection = "";
let computerSelection = "";
let humanScore = 0;
let computerScore = 0;
let round = 0;
let newGame = true;

function getComputerChoice() {
  return ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];
}

function unselectButtons() {
  humanButton.forEach(btn => btn.classList.remove("active"));
}

humanButton.forEach(btn => btn.addEventListener("click", function(e) {
  if (newGame) {
	playNewGame();
	  }
  humanSelection = e.target.id;
  unselectButtons();
  btn.classList.add("active");
  }));

playButton.addEventListener("click", function() {
  if (newGame) {
	playNewGame();
	unselectButtons();
  }

  computerSelection = getComputerChoice();
  playButton.innerText = computerSelection;
  if (humanSelection) {
	playRound(humanSelection, computerSelection, ++round)
	result.innerText = `${humanScore} : ${computerScore}`;
  } else {
	statusPanel.innerText = "Please choose the option";
	playButton.innerText = "press me";
  }
  if (round == ROUNDS) whoWin();
  if (humanScore > (computerScore + ROUNDS - round) ||
	  computerScore > (humanScore + ROUNDS - round)) whoWin();

});
  
function playNewGame() {
humanSelection = "";
	computerSelection = "";
	humanScore = 0;
	computerScore = 0;
	round = 0;
	playButton.innerText = "press me";
	infoRound.innerText = 0;
	result.innerText = "0 : 0";
	statusPanel.innerText = "Let start a game!";
	newGame = false;
}


function playRound(humanChoice, computerChoice, round) {

  const result = fight(humanChoice, computerChoice);

  infoRound.innerText = round;

  if (result == "win") {
	statusPanel.innerText = `You win! ${humanChoice} beats ${computerChoice}.`;
	humanScore++;
  } else if (result == "loose") {
	statusPanel.innerText = `You loose! ${computerChoice} beats ${humanChoice}.`;
	computerScore++;
  } else if (result == "tie") {
	statusPanel.innerText = `Tie! ${humanChoice} vs ${computerChoice}.`;
  }
}

function fight(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) return "tie";

  switch (humanChoice) {
	case "rock":
	  return (computerChoice == "scissors") ? "win" : "loose";
	case "paper":
	  return (computerChoice == "stone") ? "win" : "loose";
	case "scissors":
	  return (computerChoice == "paper") ? "win" : "loose";
	default:
	  return "error"; // if player writes something different than rock, paper or scissors
  }
}

function whoWin() {
  console.log("\n");
  if (humanScore == computerScore) {
	statusPanel.innerText = "Hmmm.. It is a TIE.";
  } else if (humanScore > computerScore) {
	statusPanel.innerText = "Congratulations! You WIN.";
  } else {
	statusPanel.innerText = "Haha! You LOSE.";
  }
  newGame = true;
}
