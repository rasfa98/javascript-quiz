const Game = require('./Game')
const checkForError = require('./checkForError')

function loadEnterNickname () {
  let game = new Game()

  let templateEnterNickname = document.querySelector('#nickname')
  let template = document.importNode(templateEnterNickname.content, true)
  document.body.appendChild(template)

  let button = document.querySelector('button')
  let input = document.querySelector('input')

  button.addEventListener('click', event => {
    checkForError.checkForError(input)

    let player = {name: input.value, time: 0}
    window.localStorage.setItem('player', JSON.stringify(player))
    game.startNewGame()
  })
}

// Exports
module.exports.loadEnterNickname = loadEnterNickname
