function loadScoreBoard () {
  let templateScoreBoard = document.querySelector('#scoreBoard')
  document.body.removeChild(document.querySelector('div'))
  let template = document.importNode(templateScoreBoard.content, true)
  document.body.appendChild(template)

  // if (allPlayersObj.time > 60) {
  //   let min = Math.floor(allPlayersObj.time / 60)
  //   let sec = allPlayersObj.time % 60

  //   if (min === 1) {
  //     li.textContent += `- ${min} minute, ${sec} seconds`
  //   } else {
  //     li.textContent += ` - ${min} minutes, ${sec} seconds`
  //   }
  // } else {
  //   li.textContent += ` - ${playerObj.time} seconds`
  // }
}

// Exports
module.exports.loadScoreBoard = loadScoreBoard
