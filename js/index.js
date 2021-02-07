import u from './utilities.js'
import { register, login } from './userAuth.js'
import Game from './Game.js'

// blinking 'Please bet notification'
const pleaseBet = document.querySelector('.pleaseBet')
let pleaseBetToggle = false
setInterval(() => {
  if (!pleaseBetToggle) {
    pleaseBet.style.opacity = '0'
    pleaseBetToggle = !pleaseBetToggle
  } else {
    pleaseBet.style.opacity = '1'
    pleaseBetToggle = !pleaseBetToggle
  }
}, 500)

// starting new game
const play = new Game()

// display credits
document.querySelector('#playerCredits').innerText = play.credits

// player button events
document.querySelector('#hitBtn').addEventListener('click', () => play.drawCard('player'))
document.querySelector('#standBtn').addEventListener('click', () => play.stand())
document.querySelector('.bet50').addEventListener('click', () => play.placeBet(50))
document.querySelector('.bet100').addEventListener('click', () => play.placeBet(100))
document.querySelector('.bet200').addEventListener('click', () => play.placeBet(200))

// login, register events
document.querySelector('#loginRegisterBtn').addEventListener('click', () => {
  u.toggleHidden(document.querySelector('.loginForm'))
})
document.querySelector('#sign-up-btn').addEventListener('click', () => {
  u.toggleHidden(
    document.querySelector('.register-form'),
    document.querySelector('.loginForm')
  )
})
document.querySelector('#exit-register').addEventListener('click', () => {
  u.toggleHidden(document.querySelector('.register-form'))
})

const signUpBtn = document.querySelector('#sign-up-submit')
signUpBtn.addEventListener('click', register)

const loginBtn = document.querySelector('#login-btn')
loginBtn.addEventListener('click', login)
