function loadScoreBoard () {
  let templateScoreBoard = document.querySelector('#scoreBoard')
  document.body.removeChild(document.querySelector('div'))
  let template = document.importNode(templateScoreBoard.content, true)
  document.body.appendChild(template)

  let li = document.createElement('li')
  let scoreList = document.querySelector('ul')

  li.textContent = undefined
  scoreList.appendChild(li)
}

// Exports
module.exports.loadScoreBoard = loadScoreBoard
