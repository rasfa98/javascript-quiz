function loadGameOver () {
  let templateGameOver = document.querySelector('#gameOver')

  document.body.removeChild(document.querySelector('div'))

  let template = document.importNode(templateGameOver.content, true)
  document.body.appendChild(template)
}

// Exports
module.exports.loadGameOver = loadGameOver
