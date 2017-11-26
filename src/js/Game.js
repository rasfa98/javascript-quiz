class Game {
  constructor () {
    this.nextURL = 'http://vhost3.lnu.se:20080/question/1'
    this.data = null
  }

  enterNickname () {
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
    this.getQuestion(this.nextURL)
  }

  setup () {
    let button = document.createElement('button')
    let input = document.createElement('input')
    let question = document.createElement('p')

    question.textContent = this.data.question
    document.body.appendChild(question)
    document.body.appendChild(input)

    document.body.appendChild(button).addEventListener('click', event => {
      let answer = input.value
      this.nextURL = this.data.nextURL
      this.answerQuestion(this.nextURL, answer)
    })
  }

  getQuestion (url) {
    let config = { method: 'GET' }

    fetch(url, config)
    .then(data => {
      return data.json()
    })
    .then(data => {
      this.data = data
      this.setup()
    })
  }

  answerQuestion (url, answer) {
    let config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({answer: answer})
    }

    fetch(url, config)
        .then(data => {
          if (!data.ok) {
            throw new Error(data.statusText)
          }
          return data.json()
        })
        .then(data => {
          console.log('Correct')
        })
        .catch(data => {
          console.log('Wrong!')
        })
  }
}

// Exports
module.exports = Game
