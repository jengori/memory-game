const numCards = 20
const cards = document.getElementsByClassName("card");
const cardBacks = document.getElementsByClassName("back");

let gameStarted = false;
let moves;
let iconsFound;
let cardsPicked = []

// icons used as images on cards

const icons = ['<i class="fa-solid fa-worm"></i>', '<i class="fa-solid fa-spider"></i>', '<i class="fa-solid fa-fish"></i>', '<i class="fa-solid fa-mosquito"></i>', '<i class="fa-solid fa-cow"></i>', '<i class="fa-solid fa-frog"></i>', '<i class="fa-solid fa-cat"></i>', '<i class="fa-solid fa-crow"></i>', '<i class="fa-solid fa-dog"></i>', '<i class="fa-solid fa-horse"></i>', '<i class="fa-solid fa-ghost"></i>', '<i class="fa-solid fa-snowflake"></i>', '<i class="fa-solid fa-umbrella"></i>', '<i class="fa-solid fa-anchor"></i>', '<i class="fa-solid fa-rocket"></i>', '<i class="fa-solid fa-robot"></i>', '<i class="fa-solid fa-puzzle-piece"></i>', '<i class="fa-solid fa-dice"></i>', '<i class="fa-solid fa-glasses"></i>', '<i class="fa-solid fa-taxi"></i>', '<i class="fa-solid fa-snowman"></i>', '<i class="fa-solid fa-spaghetti-monster-flying"></i>', '<i class="fa-solid fa-face-grimace"></i>', '<i class="fa-solid fa-city"></i>']

// add event listener - start game on key press

title = document.getElementsByTagName("h1")[0];
console.log(title.innerHTML);
title.addEventListener("click", startGame);

// define function to start game

function startGame() {
  
    if (gameStarted === false) {
        gameStarted = true;
        
        moves = 0
        iconsFound = 0
        title.innerHTML = "Moves: 0";
        
        // flip all cards to face down        
        
        for (i=0; i<cards.length; i++) {
            cards[i].classList.remove("flipCard");
        }
        
        // shuffle the cards       
        
        let cardNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
        shuffle(cardNumbers);

        // select icons to be used in game

        iconsUsedInGame = selectIcons()

        // randomly assign an icon to the back of each card

        for (i=0; i<numCards/2; i++) {
        const icon = iconsUsedInGame[i];
        cardBacks[cardNumbers[i]].innerHTML = "<p>"+icon+"</p>";
        cardBacks[cardNumbers[i+numCards/2]].innerHTML = "<p>"+icon+"</p>";
        }
    }
}

// function to select icons to be used in game 

function selectIcons() {
    let selectedIcons = []

    while (selectedIcons.length < numCards/2) {
        const icon = icons[Math.floor(Math.random()*icons.length)];
        if (!(selectedIcons.includes(icon))){
            selectedIcons.push(icon);
        }
    }
    return selectedIcons;
}

//  function to shuffle an array

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

// add event listener to cards

for (i=0; i<cards.length; i++){
    cards[i].addEventListener("click", pickCard);
    }


// this function allows player to pick two cards and checks if they match

function pickCard() {
    if (gameStarted && cardsPicked.length<2){   
        if (!(this.classList.contains("flipCard"))) {
        this.classList.toggle("flipCard");
        cardsPicked.push(this);
        }
    
        if (cardsPicked.length === 2) {
            for (i=0; i<cards.length; i++){
            if (cardsPicked[0].innerHTML !== cardsPicked[1].innerHTML){
                setTimeout(flipCards, 1500);
                }
            else {
                iconsFound++     
                cardsPicked = []; 
                if (iconsFound === 10) {
                    setTimeout(function(){
                        gameStarted = false;
                        title.innerHTML = "You won in " + moves + " moves!<br>Click here to play again."; 
                    }, 1500);   
                    }   
                }
            }           
        }
        else {
            moves++;
            document.getElementById("moves").innerHTML = "Moves: " + moves;
        }
    }
}

// this function flips over the two cards picked if they don't match

function flipCards() {
    for (i=0; i<cards.length; i++){
        for (j=0; j < cardsPicked.length; j++){
            if (cards[i].innerHTML === cardsPicked[j].innerHTML){
        cards[i].classList.remove("flipCard");
            }}}
        cardsPicked = [];   
}