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
      let stored = window.localStorage.getItem('counter')
      window.localStorage.setItem('counter', parseInt(stored) + 1)
    } else {
      window.localStorage.setItem('counter', 0)
    }

    if (window.localStorage.getItem('players')) {
      let storedJSON = window.localStorage.getItem('players')
      let storedObj = JSON.parse(storedJSON)

      storedObj.push({name: input.value, time: 0})
      window.localStorage.setItem('players', JSON.stringify(storedObj))
    } else {
      let players = [{name: input.value, time: 0}]
      window.localStorage.setItem('players', JSON.stringify(players))
    }

    game.startNewGame()
  })
}

// Exports
module.exports.loadEnterNickname = loadEnterNickname
