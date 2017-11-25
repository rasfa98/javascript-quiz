const ajax = require('./ajax')

class Game {
  constructor () {
    this.prop = undefined
  }

  setNickname () {
    let input = document.querySelector('input')
    let button = document.querySelector('button')
    let nicknameDiv = document.querySelector('#nickname')
    let warningText = document.createElement('p')

    warningText.textContent = 'Please enter a nickname...'

    button.addEventListener('click', event => {
      if (input.value.trim().length === 0) {
        nicknameDiv.appendChild(warningText).classList.add('alert')
        input.value = ''
      } else {
        window.localStorage.setItem('nickname', input.value)
        document.body.removeChild(nicknameDiv)
        this.startGame()
      }
    })
  }

  startGame () {
    ajax.request()
  }
}

// Exports
module.exports = Game
