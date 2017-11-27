function loadScoreBoard () {
  let templateScoreBoard = document.querySelector('#scoreBoard')
  document.body.removeChild(document.querySelector('div'))
  let template = document.importNode(templateScoreBoard.content, true)
  document.body.appendChild(template)

  let player = window.localStorage.getItem('player')
  let playerObj = JSON.parse(player)

  let li = document.querySelectorAll('li')[0]
  li.textContent = playerObj.name

  if (playerObj.time > 60) {
    let min = Math.floor(playerObj.time / 60)
    let sec = playerObj.time % 60

    if (min === 1) {
      li.textContent += `- ${min} minute, ${sec} seconds`
    } else {
      li.textContent += ` - ${min} minutes, ${sec} seconds`
    }
  } else {
    li.textContent += ` - ${playerObj.time} seconds`
  }
}

// Exports
module.exports.loadScoreBoard = loadScoreBoard
