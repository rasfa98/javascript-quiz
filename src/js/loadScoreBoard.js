function loadScoreBoard () {
  let templateScoreBoard = document.querySelector('#scoreBoard')
  document.body.removeChild(document.querySelector('div'))
  let template = document.importNode(templateScoreBoard.content, true)
  document.body.appendChild(template)

  let li = document.createElement('li')
  let scoreList = document.querySelector('ul')

  let player = window.localStorage.getItem('player')
  let playerObj = JSON.parse(player)

  li.textContent = `Name: ${playerObj.name}, total time: ${playerObj.time}`
  scoreList.appendChild(li)
}

// Exports
module.exports.loadScoreBoard = loadScoreBoard
