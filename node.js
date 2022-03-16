// challenge 1: your age in days

function ageInDays() {
    let birthYear = prompt('what year were you born.... Babe?');
    let ageInDayss = (2021- birthYear) * 365;
    let h4 = document.createElement('h4');
    let textAnswer = document.createTextNode('you are '  + ageInDayss +  ' days old bitch');
    h4.setAttribute('id', 'ageInDays');
    h4.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h4);
}

function reset(){
    document.getElementById('ageInDays').remove();
}

function generateCat() {
    let image = document.createElement('img');
    let div = document.getElementById('flex-cat-gen');
    image.src = "https://cdn2.thecatapi.com/images/4cs.gif";
    div.appendChild(image);
} 



function rpsGame(yourChoice) {
    // console.log(yourChoice);

    let humanChoice, botChoice;
    humanChoice = yourChoice.id;

    botChoice = numberToChoice(randToRpsInt());
    // console.log(botChoice);
    console.log('computerChoice:' , botChoice);

    results = decideWinner(humanChoice, botChoice);    // [0,1]
    console.log(results);

    message = finalMessage(results);
    console.log(message);

    rpsFrontEnd(yourChoice.id, botChoice, message);
}
function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
    return['rock', 'paper', 'scissors'] [number];
}
function decideWinner(yourChoice, computerChoice) {
 let rpsDataBase = {
     'rock': {'scissors': 1, 'paper': 0, 'rock': 0.5},
     'paper': {'scissors': 0, 'paper': 0.5, 'rock': 1},
     'scissors': {'scissors': 0.5, 'paper': 1, 'rock': 0}
 };
  let yourScore = rpsDataBase[yourChoice][computerChoice];
  let computerScore = rpsDataBase[computerChoice][yourChoice];

  return [yourScore, computerScore];
}
function finalMessage([yourScore, computerScore]) {
 if (yourScore === 0) {
     return {'message': 'you lost!', 'color': 'red'};
 } else if (yourScore === 0.5) {
     return {'message': 'you tied!', 'color': 'yellow'};
 } else {
     return {'message': 'you won', 'color': 'green'};
 }
}
 function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
     let imagesDataBase = {
          'rock': document.getElementById('rock').src,
          'paper': document.getElementById('paper').src,
          'scissors': document.getElementById('scissors').src
     }
    
//     //  to remove all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    let humanDiv = document.createElement('div');
    let botDiv = document.createElement('div');
    let messageDiv = document.createElement('div');

    
    humanDiv.innerHTML = "<img src='" + imagesDataBase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);' >"
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage ['color'] + ";  font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imagesDataBase[botImageChoice] + "'  height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);' >"
  
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
    
 }

//  style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1)

// challenge 4 change color of buttons

let all_buttons = document.getElementsByTagName('button');


let copyAllButtons = [];
for (let i=0; i < all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy) {
    if (buttonThingy.value === 'red') {
        buttonsRed();
    } else if (buttonThingy.value === 'green') {
        buttonsGreen();
} else if (buttonThingy.value === 'reset') {
    buttonColorReset();
} else if (buttonThingy.value === 'random') {
    randomColor();
}
}

function buttonsRed() {
    for (let i =0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
        
    }
}

function buttonsGreen() {
    for (let i =0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}
 
function buttonColorReset () {
    for (let i =0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
} 

function randomColor() {
    let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning' ]

    for (let i=0; i < all_buttons.length; i++) {
        let randomNumber = Math.floor(Math.random() * 4 )
        all_buttons[i].classList.remove(all_buttons[i].classList[1])
        all_buttons[i].classList.add(choices[randomNumber])
    }
}


// challenge 5 begins here

let blackJackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score':0},

    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score':0},

    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', 'K', 'J', 'Q', 'A'],

    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11]}, 
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackJackGame['you']
const DEALER = blackJackGame['dealer']
const  hitSound = new Audio('swish.m4a')
const winSound = new Audio('static/sounds/cash.mp3')
const lossSound = new Audio('static/sounds/aww.mp3')

document.querySelector('#blackjack-hit-button').addEventListener('click', blackJackHit)

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic)

document.querySelector('#blackjack-deal-button').addEventListener('click', blackJackDeal)

function blackJackHit() {
    if (blackJackGame['isStand'] === false) {
     let card = randomCard();
    showCard(card, YOU)
    updateScore(card, YOU)
    showScore(YOU)
    }
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13)
    return blackJackGame['cards'][randomIndex]
}


function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
    let cardImage = document.createElement('img')
    // cardImage.src = 'static/images/Q.png'
    cardImage.src = `static/images/${card}.png`
    // cardImage.src =`card/${card}.png`
    document.querySelector(activePlayer['div']).appendChild(cardImage)
    hitSound.play();
}
} 

function blackJackDeal() {
 if (blackJackGame['turnsOver'] === true) {

    blackJackGame['isStand'] = false

    
    let yourImages = document.querySelector('#your-box').querySelectorAll('img')
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img')
 

    for (i=0; i < yourImages.length; i++) {
        yourImages[i].remove()
    }

    for (i=0; i < dealerImages.length; i++) {
        dealerImages[i].remove()
    }
    YOU['score'] = 0
    DEALER['score'] = 0

    document.querySelector('#your-blackjack-result ').textContent = 0
    document.querySelector('#dealer-blackjack-result ').textContent = 0
    document.querySelector('#your-blackjack-result ').style.color  = 'white'
    document.querySelector('#dealer-blackjack-result ').style.color  = 'white'
    document.querySelector('#blackjack-result').textContent = "Let's play"      
    document.querySelector('#blackjack-result').style.color = "black"

    blackJackGame['turnsOver'] = true 
  }
}


function updateScore(card, activePlayer) {
    if (card === 'A') {
        if (activePlayer['score'] + blackJackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackJackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackJackGame['cardsMap'][card][0];
        }
    } else {
        activePlayer['score'] += blackJackGame['cardsMap'][card];
    }
}


   

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BURST'
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red'
    } else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']
}
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
 async function dealerLogic() {
    blackJackGame['isStand'] = true

    while (DEALER['score'] < 16 && blackJackGame['isStand'] === true) {

    let card = randomCard()
    showCard(card, DEALER)
    updateScore(card, DEALER)
    showScore(DEALER)
    await sleep(1000)
    }
        blackJackGame['turnsOver'] = true
        let winner = computeWinner()
        showResult(winner)

}
 
// compute winner and return winner 

function computeWinner() {
    let winner; 

    if (YOU['score'] <= 21) {
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            blackJackGame['wins']++;
            winner = YOU

        } else if (YOU['score'] < DEALER['score']) {
            blackJackGame['losses']++;
            winner = DEALER

        } else  if (YOU['score'] === DEALER['score']) {
            blackJackGame['draws']++;
            
        }
   
    } else if (YOU['score'] > 21  && DEALER['score'] <= 21) {
        blackJackGame['losses']++;
        winner = DEALER
    
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackJackGame['draws']++;
    }

    console.log('Winner is' , winner) 
    return winner
}
    
function showResult(winner) {
    let message, messagecolor

    if (blackJackGame['turnsOver'] === true) {


        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackJackGame['wins']
            message = 'You Won'
            messageColor = 'green'
            winSound.play()

        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackJackGame['losses']
            message = 'You Lost'
            messageColor = 'red'
            lossSound.play()

        } else {
            document.querySelector('#draws').textContent = blackJackGame['draws']
            message = 'You drew'
            messageColor = 'black'
        }
        document.querySelector('#blackjack-result').textContent = message
        document.querySelector('#blackjack-result').style.color = messageColor
    }
}