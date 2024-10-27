/* 
ROCK PAPER AND SCISSORS
little console game written for THE ODIN PROJECT assignment 
*/

const ROUNDS = 5; // How many rounds. For now as constant, later player may choose no of rounds..
const humanButton = Array.from(document.querySelectorAll(".human-button"));
const playButton = document.querySelector("#computer");
const statusText1 = document.querySelector("#text1");
const statusText2 = document.querySelector("#text2");
const statusText3 = document.querySelector("#text3");
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
	updateStatus("Please choose the option");
	playButton.innerText = "press me";
  }
  if (humanScore > (computerScore + ROUNDS - round) ||
	  computerScore > (humanScore + ROUNDS - round) ||
	  round == ROUNDS) whoWin();

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
	statusText1.style.color = "black";
	newGame = false;
}

function updateStatus(newText) {
  [statusText1.innerText, statusText2.innerText, statusText3.innerText] = [newText, statusText1.innerText, statusText2.innerText];
}

function playRound(humanChoice, computerChoice, round) {

  const result = fight(humanChoice, computerChoice);

  infoRound.innerText = round;

  if (result == "win") {
	updateStatus(`You win! ${humanChoice} beats ${computerChoice}.`);
	humanScore++;
  } else if (result == "loose") {
	updateStatus(`You loose! ${computerChoice} beats ${humanChoice}.`);
	computerScore++;
  } else if (result == "tie") {
	updateStatus(`Tie! ${humanChoice} vs ${computerChoice}.`);
  }
}

function fight(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) return "tie";

  switch (humanChoice) {
	case "rock":
	  return (computerChoice == "scissors") ? "win" : "loose";
	case "paper":
	  return (computerChoice == "rock") ? "win" : "loose";
	case "scissors":
	  return (computerChoice == "paper") ? "win" : "loose";
	default:
	  return "error"; // if player writes something different than rock, paper or scissors
  }
}

function whoWin() {
  console.log("\n");
  if (humanScore == computerScore) {
	updateStatus("Hmmm.. It is a TIE.");
	statusText1.style.color = "yellow";
  } else if (humanScore > computerScore) {
	updateStatus("Congratulations! You WIN.");
	statusText1.style.color = "green";
  } else {
	updateStatus("Haha! You LOSE.");
	statusText1.style.color = "red";
  }
  newGame = true;
}
