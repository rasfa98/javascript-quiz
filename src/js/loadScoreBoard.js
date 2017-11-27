function loadScoreBoard () {
  let templateScoreBoard = document.querySelector('#scoreBoard')
  document.body.removeChild(document.querySelector('div'))
  let template = document.importNode(templateScoreBoard.content, true)
  document.body.appendChild(template)

  let li = document.createElement('li')
  let scoreList = document.querySelector('ul')

  let player = window.localStorage.getItem('player')
  let playerObj = JSON.parse(player)

  li.textContent = playerObj.name

  if (playerObj.time > 60) {
    let min = Math.floor(playerObj.time / 60)
    let sec = playerObj.time % 60
    li.textContent += ` - ${min} minutes & ${sec} seconds`
  } else {
    li.textContent += ` - ${playerObj.time} seconds`
  }

  scoreList.appendChild(li)
}

// Exports
module.exports.loadScoreBoard = loadScoreBoard
