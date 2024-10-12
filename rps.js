/* 
ROCK PAPER AND SCISSORS
little console game written for THE ODIN PROJECT assignment 
*/

const ROUNDS = 5; // How many rounds. For now as constant, later player may choose no of rounds..

function getComputerChoice() {
  return ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];
}

function getHumanChoice() {
  return prompt("\nWhat is your choice (rock, paper, scissors)? ").toLowerCase(); 
}

let humanScore = 0;
let computerScore = 0;

function playRound(humanChoice, computerChoice, round) {

  const result = fight(humanChoice, computerChoice);

  console.log(`Round No ${round}`);

  if (result == "win") {
	console.log(`You win! ${humanChoice} beats ${computerChoice}.`);
	humanScore++;
  } else if (result == "loose") {
	console.log(`You loose! ${computerChoice} beats ${humanChoice}.`);
	computerScore++;
  } else if (result == "tie") {
	console.log(`Tie! ${humanChoice} vs ${computerChoice}.`);
  } else {
	console.error("ERROR!! You have to choose between rock, paper or scissors!");
	humanScore--; // it is a penalty for a bad choice
  }
  console.log(`Player ~> ${humanScore} ::vs:: ${computerScore} <~ Computer`);
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

function playMatch(rounds) {

  for (let round = 1; round <= rounds; round++) {
	const humanSelection = getHumanChoice()
	const computerSelection = getComputerChoice();
	
	playRound(humanSelection, computerSelection, round);

	// if player or computer is unable to win or tie the match is over
	if (humanScore > (computerScore + rounds - round) ||
	  computerScore > (humanScore + rounds - round)) break;
  }
}

function whoWin() {
  console.log("\n");
  if (humanScore == computerScore) {
	console.log("\nHmmm.. It is a TIE.");
  } else if (humanScore > computerScore) {
	console.log("\nCongratulations! You WIN.");
  } else {
	console.log("\nHaha! You LOSE.");
  }
}

console.clear();
playMatch(ROUNDS);
whoWin();
