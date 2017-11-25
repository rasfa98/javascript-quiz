class Game {
  constructor () {
    this.nextQuestionUrl = null
    this.answer = 2
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
    this.getQuestion()
    this.answerQuestion()
  }

  getQuestion () {
    let config = { method: 'GET' }

    fetch('http://vhost3.lnu.se:20080/question/1', config)
    .then(data => {
      return data.json()
    })
    .then(data => {
      console.log(data.question)
      this.nextQuestionUrl = data.nextURL
    })
  }

  answerQuestion () {
    let config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({answer: this.answer})
    }

    fetch('http://vhost3.lnu.se:20080/answer/1', config)
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log(data)
        })
  }
}

// Exports
module.exports = Game
