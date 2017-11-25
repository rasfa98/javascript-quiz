class Game {
  constructor () {
    this.nicknameDiv = document.querySelector('#nickname')
  }

  setNickname () {
    let input = document.querySelector('input')
    let button = document.querySelector('button')
    let warningText = document.createElement('p')

    warningText.textContent = 'Please enter a nickname...'

    button.addEventListener('click', event => {
      if (input.value.trim().length === 0) {
        this.nicknameDiv.appendChild(warningText).classList.add('alert')
        input.value = ''
      } else {
        window.localStorage.setItem('nickname', input.value)
        this.startGame()
      }
    })
  }

  startGame () {
    document.body.removeChild(this.nicknameDiv)
  }
}

// Exports
module.exports = Game
