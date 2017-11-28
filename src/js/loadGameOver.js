const loadEnterNickname = require('./loadEnterNickname')

function loadGameOver () {
  let templateGameOver = document.querySelector('#gameOver')
  document.body.removeChild(document.querySelector('div'))
  let template = document.importNode(templateGameOver.content, true)
  document.body.appendChild(template)

  let players = window.localStorage.getItem('players')
  let playersObj = JSON.parse(players)
  let counter = parseInt(window.localStorage.getItem('counter'))

  playersObj[counter].time = 0
  window.localStorage.setItem('players', JSON.stringify(playersObj))

  let button = document.querySelector('button')

  button.addEventListener('click', event => {
    document.body.removeChild(document.querySelector('div'))
    loadEnterNickname.loadEnterNickname()
  })
}

// Exports
module.exports.loadGameOver = loadGameOver
