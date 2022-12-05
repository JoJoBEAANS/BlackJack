let player = {
    name: "Player",
    chips: 200,
    password: "Finger1234"
}

let ai = {
    num: 0
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let pool = 0
let poolEl = document.getElementById("pool-el")
let dealerEl = document.getElementById("dealer-el")

playerEl.textContent = player.name + ": $" + player.chips

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
    pool = 0
    poolEl.textContent = "Pool:" + pool
    ai.num = getRandomCard()
}

function renderGame() {
    dealerEl.textContent = "Dealers hand: "
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        player.chips += pool * 2
    } else {
        message = "You're out of the game!"
        player.chips -= pool
        isAlive = false
        dealerEl.textContent += ai.num
    }
    messageEl.textContent = message
    playerEl.textContent = player.name + ": $" + player.chips
    
    while(ai.num < 17){
        ai.num += getRandomCard()
    }
    
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}

function bet(){
    pool += 5
    poolEl.textContent = "Pool:" + pool
}

function stand(){
    
    
    
    if(ai.num < sum ) {
        player.chips += pool * 2
        playerEl.textContent = player.name + ": $" + player.chips
        message = "You win!!"
        messageEl.textContent = message
        dealerEl.textContent = "Dealers hand: " + ai.num
    } else if(ai.num > 21 && isAlive == true){
        message = "Dealer busted!"
        messageEl.textContent = message
        dealerEl.textContent = "Dealers hand: " + ai.num
        player.chips += pool * 2
        playerEl.textContent = player.name + ": $" + player.chips
    }

}
