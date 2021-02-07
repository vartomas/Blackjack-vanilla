import { cards } from './cards.js'
import u from './utilities.js'

class Game {
    constructor() {
      this.drawCount = 0
      this.shuffledCards = []
      this.bet = 0
      this.credits = 1000
      this.playerValue = 0
      this.dealerValue = 0
      this.gameInProgress = false
      this.playerCards = []
      this.dealerCards = []
      this.gameEnd = false
    }
  
    shuffleCards() {
      let arr = [...cards]
      for (let i = 0; i < 1000; i++) {
        arr = arr.sort(() => Math.random() - 0.5)
      }
      this.shuffledCards = [...arr]
    }
  
    placeBet(amount) {
      this.gameEnd ? this.restart() : null
      if (this.credits === 0) {
        let restart = window.confirm('Out of money! Start over?')
        if (restart) window.location.reload()
      }
      if (this.credits < amount || this.bet) return
      this.gameInProgress = true
      this.showHitStandBtns()
      this.bet = amount
      this.credits = this.credits - amount
      document.querySelector('#playerCredits').innerText = this.credits
      this.start()
    }
  
    drawCard(target) {
      if (!this.gameInProgress) return
      const cardTarget = document.querySelector(`.${target}Cards`)
      const randomCard = this.shuffledCards[this.drawCount]
      this.drawCount++
      const newImgDiv = document.createElement('div')
      newImgDiv.innerHTML = `<img src='${randomCard.url}' alt='card'>`
      newImgDiv.classList.add('cardWrapper')
      cardTarget.appendChild(newImgDiv)
      setTimeout(() => {
        newImgDiv.style.transform = 'rotate3d(0, 1, 0, 0deg)'
      }, 1)
      if (target === 'player') {
        this.playerCards.push(randomCard.value)
        this.calculateValue()
        if (this.playerValue > 21) {
          this.showWinner()
        }
      } else {
        this.dealerCards.push(randomCard.value)
        this.calculateValue()
      }
    }
  
    stand() {
      if (!this.gameInProgress) return
      while (this.dealerValue < 17) {
        this.drawCard('dealer')
      }
      this.showWinner()
    }
  
    calculateValue() {
      this.playerValue = 0
      this.dealerValue = 0
      let playerAces = 0
      let dealerAces = 0
      this.playerCards.forEach(e => {
        if (e !== 11) {
          this.playerValue += e
        } else {
          playerAces += 1
        }
      })
      this.dealerCards.forEach(e => {
        if (e !== 11) {
          this.dealerValue += e
        } else {
          dealerAces += 1
        }
      })
      for (let i = 0; i < playerAces; i++) {
        this.playerValue < 11 ? (this.playerValue += 11) : (this.playerValue += 1)
      }
      for (let i = 0; i < dealerAces; i++) {
        this.dealerValue < 11 ? (this.dealerValue += 11) : (this.dealerValue += 1)
      }
      document.querySelector('#playerValue').innerText = this.playerValue
      document.querySelector('#dealerValue').innerText = this.dealerValue
    }
  
    showWinner() {
      this.gameInProgress = false
      if (this.playerValue > 21) {
        this.lose()
        this.gameEnd = true
        this.showBetBtns()
        return
      }
      if (this.dealerValue > 21) {
        this.win()
      } else if (this.dealerValue === this.playerValue) {
        this.draw()
      } else if (this.dealerValue < this.playerValue) {
        this.win()
      } else this.lose()
      this.showBetBtns()
      this.gameEnd = true
    }
  
    restart() {
      this.clearTable()
      this.shuffleCards()
      this.playerValue = 0
      this.dealerValue = 0
      this.drawCount = 0
      this.bet = 0
      this.playerCards = []
      this.dealerCards = []
      this.gameEnd = false
      u.displayNone(
        document.querySelector('.youLost'),
        document.querySelector('.youWon'),
        document.querySelector('.draw'),
        document.querySelector('#playerValue'),
        document.querySelector('#dealerValue')
      )
    }
  
    start() {
      u.displayNone(document.querySelector('.pleaseBet'))
      this.shuffleCards()
      this.drawCard('dealer')
      this.drawCard('player')
      this.drawCard('player')
      u.displayBlock(
        document.querySelector('#playerValue'),
        document.querySelector('#dealerValue')
      )
    }
  
    lose() {
      u.displayBlock(document.querySelector('.youLost'))
    }
  
    win() {
      u.displayBlock(document.querySelector('.youWon'))
      this.credits += this.bet * 2
      document.querySelector('#playerCredits').innerText = this.credits
    }
  
    draw() {
      u.displayBlock(document.querySelector('.draw'))
      this.credits += this.bet
      document.querySelector('#playerCredits').innerText = this.credits
    }
  
    clearTable() {
      document.querySelector('.playerCards').innerHTML = ''
      document.querySelector('.dealerCards').innerHTML = ''
    }
  
    showBetBtns() {
      u.displayBlock(document.querySelector('.pleaseBet'))
      document.querySelector('.standHitBtns').style.transform = 'scaleX(0)'
      setTimeout(() => {
        u.displayNone(document.querySelector('.standHitBtns'))
        u.displayFlex(document.querySelector('.bets'))
      }, 300)
      setTimeout(() => {
        document.querySelector('.bets').style.transform = 'scaleX(1)'
      }, 310)
    }
  
    showHitStandBtns() {
      document.querySelector('.bets').style.transform = 'scaleX(0)'
      setTimeout(() => {
        u.displayNone(document.querySelector('.bets'))
        u.displayFlex(document.querySelector('.standHitBtns'))
      }, 300)
      setTimeout(() => {
        document.querySelector('.standHitBtns').style.transform = 'scaleX(1)'
      }, 310)
    }
}

export default Game