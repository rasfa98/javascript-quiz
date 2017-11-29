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
    window.localStorage.setItem('player', JSON.stringify({name: input.value, time: 0}))
    game.startNewGame()
  })
}

function loadGameOver () {
  _addTemplate('#gameOver')

  let button = document.querySelector('button')

  button.addEventListener('click', event => {
    document.body.removeChild(document.querySelector('div'))
    loadEnterNickname()
  })
}

function loadScoreBoard () {
  _addTemplate('#scoreBoard')

  let button = document.querySelector('button')

  button.addEventListener('click', event => {
    document.body.removeChild(document.querySelector('div'))
    loadEnterNickname()
  })

  let player = JSON.parse(window.localStorage.getItem('player'))
  let scoreBoard = window.localStorage.getItem('scoreBoard')

  if (window.localStorage.getItem('scoreBoard')) {
    scoreBoard = JSON.parse(window.localStorage.getItem('scoreBoard'))
    scoreBoard.push(player)
  } else {
    scoreBoard = []
    scoreBoard.push(player)
  }

  window.localStorage.setItem('scoreBoard', JSON.stringify(scoreBoard))

  scoreBoard.sort((a, b) => {
    return a.time - b.time
  })

  if (scoreBoard.length > 5) {
    for (let i = 4; i < scoreBoard.length; i++) {
      scoreBoard.pop()
    }
  }

  let list = document.querySelector('ul')

  for (let i = 0; i < scoreBoard.length; i++) {
    let newLi = document.createElement('li')
    list.appendChild(newLi)

    let score = document.querySelectorAll('li')[i]
    score.textContent = scoreBoard[i].name

    if (scoreBoard[i].time > 60) {
      let min = Math.floor(scoreBoard[i].time / 60)
      let sec = scoreBoard[i].time % 60

      if (min === 1) {
        score.textContent += `- ${min} minute, ${sec} seconds`
      } else {
        score.textContent += ` - ${min} minutes, ${sec} seconds`
      }
    } else {
      score.textContent += ` - ${scoreBoard[i].time} seconds`
    }
  }

  window.localStorage.setItem('scoreBoard', JSON.stringify(scoreBoard))
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
