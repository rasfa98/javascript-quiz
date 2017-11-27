const Game = require('./Game')

function loadGameOver () {
  let game = new Game()

  let templateGameOver = document.querySelector('#gameOver')
  document.body.removeChild(document.querySelector('div'))
  let template = document.importNode(templateGameOver.content, true)
  document.body.appendChild(template)

  let button = document.querySelector('button')

  button.addEventListener('click', event => {
    game.startNewGame()
  })
}

// Exports
module.exports.loadGameOver = loadGameOver
