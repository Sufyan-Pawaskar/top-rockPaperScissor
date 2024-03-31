const choiceValues = ['rock','paper','scissors'];//initializing in global context to avoid repetition.
function getRandomInt(max,min){
    return Math.floor(Math.random() * (max-min) + min);
}
function getComputerChoice (){
    let compChoice = choiceValues[getRandomInt(0,3)];
    console.log("The random value is > ",compChoice);
    return compChoice;
}
function getUserChoice(){
    let maxRetry = 0;
    let userChoice = "";
    while (maxRetry < 3){
        let userInput = prompt("Please select your choice from rock, paper & scissors!");
        let valid = choiceValues.includes(userInput.toLowerCase());
        if (valid){
            userChoice = userInput.toLowerCase();
            break;
        } else{
            userChoice = 0;
        }
        maxRetry++;
    }
    return userChoice;
}

function playRound(){
    let userScore = 0;
    let compScore = 0;
    let compChoice = getComputerChoice();
    let userChoice = getUserChoice();
    let result = "";
    if(userChoice){
        if (userChoice == 'rock'){
            if(compChoice == 'rock'){
                result = 'tie between computer and user';
            }else if(compChoice == 'paper'){
                result = 'user loses and computer wins';
                compScore++;
            }else if(compChoice == 'scissors'){
                result = 'user wins and computer loses'
                userScore++;
            }
        } else if (userChoice == 'paper'){
            if(compChoice == 'rock'){
                result = 'user wins and computer loses';
                userScore++
            }else if(compChoice == 'paper'){
                result = 'tie between computer and user';
            }else if(compChoice == 'scissors'){
                result = 'user loses and computer wins'
                compScore++
            }
        } else if (userChoice == 'scissors'){
            if(compChoice == 'rock'){
                result = 'user loses and computer wins';
                compScore++
            }else if(compChoice == 'paper'){
                result = 'user wins and computer loses';
                userScore++;
            }else if(compChoice == 'scissors'){
                result = 'tie between computer and user'
            }
        }
    } else{
        result = "Invalid choice by the user!"
    }
    return [userScore,compScore,result,userChoice,compChoice];
}

let userScore = 0;
let compScore = 0;
let result = "";
let rounds = 5;
console.log("The game of rock paper scissors is initialized!")
for (let i = 0; i < 5; i++){
    let roundValues = playRound();
    let userChoice = roundValues[3];
    let compChoice = roundValues[4];
    result = roundValues[2];
    userScore += roundValues[0];
    compScore += roundValues[1];
    console.log(`You have selected ${userChoice} and computer has selected ${compChoice}`)
    let currRoundResult = `The result of round ${i+1} is ${result}`
    console.log(currRoundResult)
}
let winner = userScore > compScore ? "user wins":"computer wins"
if (userScore === compScore){
    winner = "It's a tie"
}
console.log(`Game over: The result is User: ${userScore}, Computer: ${compScore} ${winner}!`)
