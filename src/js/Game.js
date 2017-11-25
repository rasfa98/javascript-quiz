class Game {
  constructor () {
    this.question = document.createElement('p')
    this.questionNr = document.createElement('h2')
  }

  setNickname () {
    let input = document.querySelector('input')
    let button = document.querySelector('button')
    let nicknameDiv = document.querySelector('#nickname')
    let warningText = document.createElement('p')

    warningText.textContent = 'Please enter a nickname...'

    button.addEventListener('click', event => {
      if (input.value.trim().length === 0) {
        nicknameDiv.appendChild(warningText).classList.add('alert')
        input.value = ''
      } else {
        window.localStorage.setItem('nickname', input.value)
        document.body.removeChild(nicknameDiv)
        this.startGame()
      }
    })
  }

  startGame () {
    this.newQuestion()
  }

  newQuestion () {
    let config = { method: 'GET' }

    fetch('http://vhost3.lnu.se:20080/question/1', config)
    .then(data => {
      return data.json()
    })
    .then(data => {
      this.question.textContent = data.question
      this.questionNr.textContent = `Question ${data.id}`
      document.body.appendChild(this.questionNr)
      document.body.appendChild(this.question)
    })
  }
}

// Exports
module.exports = Game
