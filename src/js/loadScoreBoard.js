function loadScoreBoard () {
  let templateScoreBoard = document.querySelector('#scoreBoard')
  document.body.removeChild(document.querySelector('div'))
  let template = document.importNode(templateScoreBoard.content, true)
  document.body.appendChild(template)

  let players = JSON.parse(window.localStorage.getItem('players'))
  let counter = 0

  players.forEach(current => {
    let newLi = document.createElement('li')
    let scoreBoard = document.querySelector('ul')
    scoreBoard.appendChild(newLi)

    let liText = document.querySelectorAll('li')[counter++]

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

// Exports
module.exports.loadScoreBoard = loadScoreBoard
