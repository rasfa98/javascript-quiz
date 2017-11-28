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

    if (window.localStorage.getItem('counter')) {
      console.log('uppdatera')
      let stored = window.localStorage.getItem('counter')
      window.localStorage.setItem('counter', parseInt(stored) + 1)
    } else {
      console.log('ny')
      window.localStorage.setItem('counter', 1)
    }

    game.startNewGame()
  })
}

// Exports
module.exports.loadEnterNickname = loadEnterNickname
