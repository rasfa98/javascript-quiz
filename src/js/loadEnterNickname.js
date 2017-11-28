const Game = require('./Game')
const checkForError = require('./checkForError')
const localStorage = require('./localStorage')

function loadEnterNickname () {
  let game = new Game()

  let templateEnterNickname = document.querySelector('#nickname')
  let template = document.importNode(templateEnterNickname.content, true)
  document.body.appendChild(template)

  let button = document.querySelector('button')
  let input = document.querySelector('input')

  button.addEventListener('click', event => {
    checkForError.checkForError(input)
    localStorage.localStorage()
    game.startNewGame()
  })
}

// Exports
module.exports.loadEnterNickname = loadEnterNickname
