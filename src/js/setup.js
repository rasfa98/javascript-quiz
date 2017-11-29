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

function loadGameOver () {
  _addTemplate('#gameOver')

  _removePlayerTimes()

  let button = document.querySelector('button')

  button.addEventListener('click', event => {
    document.body.removeChild(document.querySelector('div'))
    loadEnterNickname()
  })
}

function _removePlayerTimes () {
  let nonFilteredPlayers = JSON.parse(window.localStorage.getItem('players'))
  let counter = parseInt(window.localStorage.getItem('counter'))

  nonFilteredPlayers[counter].time = 0

  let players = nonFilteredPlayers.filter(current => {
    return current.time > 0
  })

  window.localStorage.setItem('counter', players.length - 1)
  window.localStorage.setItem('players', JSON.stringify(players))
}

function loadScoreBoard () {
  _addTemplate('#scoreBoard')

  let button = document.querySelector('button')

  button.addEventListener('click', event => {
    document.body.removeChild(document.querySelector('div'))
    loadEnterNickname()
  })

  let players = JSON.parse(window.localStorage.getItem('players'))
  let liCounter = 0

  players.sort((a, b) => {
    return a.time - b.time
  })

  if (players.length > 5) {
    for (let i = 4; i < players.length; i++) {
      players.pop()
    }

    window.localStorage.setItem('counter', 4)
  }

  window.localStorage.setItem('players', JSON.stringify(players))

  players.forEach(current => {
    let newLi = document.createElement('li')
    let scoreBoard = document.querySelector('ul')
    scoreBoard.appendChild(newLi)

    let liText = document.querySelectorAll('li')[liCounter++]

    liText.textContent = current.name

    if (current.time > 60) {
      let min = Math.floor(current.time / 60)
      let sec = current.time % 60

      if (min === 1) {
        liText.textContent += `- ${min} minute, ${sec} seconds`
      } else {
        liText.textContent += ` - ${min} minutes, ${sec} seconds`
      }
    } else {
      liText.textContent += ` - ${current.time} seconds`
    }
  })
}

function _addTemplate (id) {
  let templateScoreBoard = document.querySelector(id)
  document.body.removeChild(document.querySelector('div'))
  let template = document.importNode(templateScoreBoard.content, true)
  document.body.appendChild(template)
}

// Exports
module.exports.loadEnterNickname = loadEnterNickname
module.exports.loadGameOver = loadGameOver
module.exports.loadScoreBoard = loadScoreBoard
module.exports.addTemplate = _addTemplate
