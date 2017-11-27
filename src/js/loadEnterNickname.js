const Game = require('./Game')

function loadEnterNickname () {
  let game = new Game()

  let templateEnterNickname = document.querySelector('#nickname')
  let template = document.importNode(templateEnterNickname.content, true)
  document.body.appendChild(template)

  let button = document.querySelector('button')
  let input = document.querySelector('input')
  let nicknameDiv = document.querySelector('div')
  let warningText = document.createElement('p')

  warningText.textContent = 'Please enter a nickname...'

  button.addEventListener('click', event => {
    if (input.value.trim().length === 0) {
      nicknameDiv.appendChild(warningText).classList.add('alert')
      input.value = ''
    } else {
      let player = {name: input.value, time: 0}
      window.localStorage.setItem('player', JSON.stringify(player))
      game.startNewGame()
    }
  })
}

// Exports
module.exports.loadEnterNickname = loadEnterNickname
