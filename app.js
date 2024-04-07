const choiceValues = ['rock','paper','scissors'];//initializing in global context to avoid repetition.
let gameStart = document.querySelector('#playGame');
let inputDiv = document.querySelector("#inputDiv");
let playerName = document.querySelector("#playerName");
let playerInfo = document.querySelectorAll(".playerName");
let gameInfo = document.querySelector('.gameInfo');
let userSelection = document.querySelectorAll('.userchoice');
let userRock = document.querySelector('.rock');
let userPaper = document.querySelector('.paper');
let userScissor = document.querySelector('.scissor');
let compRock = document.querySelector('.compRock');
let compPaper = document.querySelector('.compPaper');
let compScissor = document.querySelector('.compScissors');
let roundVal = document.querySelector('.roundVal');
let pScore = document.querySelector('.pScore');
let cScore = document.querySelector('.cScore');
let playAgain = document.querySelector('.newGame');
let retry = document.querySelector('.retry');
let gameBody = document.querySelector('.gameBody');
let winnerMsg = document.querySelector('.winner');
let gameResult = document.querySelector('.gameResult');
let gameLogo = document.querySelector('.gameLogo');
let userValue = '';
if (!localStorage.getItem('userScore')){
    localStorage.setItem('userScore',0);
}
if(!localStorage.getItem('compScore')){
    localStorage.setItem('compScore',0);
}
if(!localStorage.getItem('round')){
    localStorage.setItem('round',1);
}
function getRandomInt(max,min){
    return Math.floor(Math.random() * (max-min) + min);
}
function getComputerChoice (){
    let compChoice = choiceValues[getRandomInt(0,3)];
    console.log("The random value is > ",compChoice);
    if (compChoice == 'rock'){
        compPaper.classList.toggle('hidden');
        compScissor.classList.toggle('hidden');
    } else if (compChoice == 'paper'){
        compRock.classList.toggle('hidden');
        compScissor.classList.toggle('hidden');
    } else if (compChoice == 'scissors'){
        compRock.classList.toggle('hidden');
        compPaper.classList.toggle('hidden');
    }
    return compChoice;
}
function getUserChoice(userChoice1){
    if(userChoice1=='Rock'){
        userPaper.classList.toggle('hidden');
        userScissor.classList.toggle('hidden');
    } else if(userChoice1=='Paper'){
        userRock.classList.toggle('hidden');
        userScissor.classList.toggle('hidden');
    } else if(userChoice1=='Scissors'){
        userRock.classList.toggle('hidden');
        userPaper.classList.toggle('hidden');
    }
}

function playRound(uChoice){
    let userScore = 0;
    let compScore = 0;
    let compChoice = getComputerChoice();
    let userChoice = uChoice;
    let result = "";
    if(userChoice){
        if (userChoice == 'rock'){
            if(compChoice == 'rock'){
                result = 'tie between computer and user';
            }else if(compChoice == 'paper'){
                result = 'user loses and computer wins';
                ++compScore;
            }else if(compChoice == 'scissors'){
                result = 'user wins and computer loses'
                ++userScore;
            }
        } else if (userChoice == 'paper'){
            if(compChoice == 'rock'){
                result = 'user wins and computer loses';
                ++userScore
            }else if(compChoice == 'paper'){
                result = 'tie between computer and user';
            }else if(compChoice == 'scissors'){
                result = 'user loses and computer wins'
                ++compScore
            }
        } else if (userChoice == 'scissors'){
            if(compChoice == 'rock'){
                result = 'user loses and computer wins';
                ++compScore
            }else if(compChoice == 'paper'){
                result = 'user wins and computer loses';
                ++userScore;
            }else if(compChoice == 'scissors'){
                result = 'tie between computer and user'
            }
        }
    } else{
        result = "Invalid choice by the user!"
    }
    return [userScore,compScore,result,userChoice,compChoice];
}

function resetGame(){
    compPaper.classList.remove('hidden');
    compRock.classList.remove('hidden');
    compScissor.classList.remove('hidden');
    userPaper.classList.remove('hidden');
    userRock.classList.remove('hidden');
    userScissor.classList.remove('hidden');
    gameBody.classList.toggle('hidden');
    inputDiv.classList.toggle('hidden');
    gameInfo.classList.toggle('hidden');
    winnerMsg.classList.toggle('hidden');
    gameResult.classList.toggle('hidden');
    localStorage.setItem('userScore',0);
    localStorage.setItem('compScore',0);
    localStorage.setItem('round',1);
    playerName.value = '';
    userScore = parseInt(localStorage.getItem('userScore'));
    compScore = parseInt(localStorage.getItem('compScore'));
    rounds = parseInt(localStorage.getItem('round'));
    gameLogo.classList.toggle('hidden');

}

let userScore = parseInt(localStorage.getItem('userScore'));
let compScore = parseInt(localStorage.getItem('compScore'));
let result = "";
let rounds = parseInt(localStorage.getItem('round'));
console.log(playerInfo)
gameStart.addEventListener('click',(e)=>{
    e.stopPropagation();
    if(playerName.value != ""){
        console.log(playerName.value);
        playerInfo.forEach(function (currentValue) {
            currentValue.innerText = playerName.value;
          });
        inputDiv.classList.toggle('hidden');
        gameInfo.classList.toggle('hidden');
        roundVal.innerText = rounds;
        pScore.innerText = userScore;
        cScore.innerText = compScore;
        gameBody.classList.toggle('hidden');
        gameLogo.classList.toggle('hidden');
    };
})
console.log(userSelection)
userSelection.forEach(function(currentValue){
    console.log(currentValue)
    currentValue.addEventListener('click',(e)=>{
        console.log('>>>user selected: ',currentValue.getAttribute("data-choice"));
        getUserChoice(currentValue.getAttribute("data-choice"))
        userValue = currentValue.getAttribute("data-choice");
        let roundValues = playRound(userValue.toLowerCase());
        console.log(">>>>>>>roundValues: ",roundValues)
        let userChoice = roundValues[3];
        let compChoice = roundValues[4];
        result = roundValues[2];
        userScore += roundValues[0];
        compScore += roundValues[1];
        console.log('>>>>userScore',userScore,roundValues[0])
        console.log('>>>>compScore',compScore,roundValues[1])
        localStorage.setItem('userScore',userScore);
        localStorage.setItem('compScore',compScore);
        pScore.innerText = userScore;
        cScore.innerText = compScore;
        console.log(`You have selected ${userChoice} and computer has selected ${compChoice}`)
        if(userScore >= 5 || compScore >= 5){
            playAgain.classList.toggle('hidden');
            let winner = userScore > compScore ? "user wins":"computer wins"
            if (userScore === compScore){
                winner = "It's a tie"
            }
            let msg = `Game over: The result is ${playerName.value}: ${userScore}, Computer: ${compScore} ${winner}!`
            winnerMsg.innerText = msg;
            winnerMsg.classList.toggle('hidden');
            gameResult.classList.toggle('hidden');
        } else{
            retry.classList.toggle('hidden');
        }
        
    })
});

retry.addEventListener('click',(e)=>{
    compPaper.classList.remove('hidden');
    compRock.classList.remove('hidden');
    compScissor.classList.remove('hidden');
    userPaper.classList.remove('hidden');
    userRock.classList.remove('hidden');
    userScissor.classList.remove('hidden');
    ++rounds;
    roundVal.innerText = rounds;
    localStorage.setItem('round',rounds);
    retry.classList.toggle('hidden');
})

playAgain.addEventListener('click',(e)=>{
    resetGame();
    playAgain.classList.toggle('hidden')
})