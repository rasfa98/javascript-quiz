function loadScoreBoard () {
  let templateScoreBoard = document.querySelector('#scoreBoard')
  document.body.removeChild(document.querySelector('div'))
  let template = document.importNode(templateScoreBoard.content, true)
  document.body.appendChild(template)

  let button = document.querySelector('button')

  button.addEventListener('click', event => {
    console.log('Starta nytt spel...')
  })

  let players = JSON.parse(window.localStorage.getItem('players'))
  let liCounter = 0

  players.sort((a, b) => {
    return a.time - b.time
  })

  if (players.length > 5) {
    for (let i = 4; i < players.length; i++) {
      players.pop()
    }

    window.localStorage.setItem('counter', 4)
    window.localStorage.setItem('players', JSON.stringify(players))
  }

  players.forEach(current => {
    let newLi = document.createElement('li')
    let scoreBoard = document.querySelector('ul')
    scoreBoard.appendChild(newLi)

    let liText = document.querySelectorAll('li')[liCounter++]

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
