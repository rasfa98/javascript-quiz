class Game {
  constructor () {
    this.nextQuestionUrl = 'http://vhost3.lnu.se:20080/question/1'
    this.answer = null
    this.question = null
    this.p = document.createElement('p')
    this.input = document.createElement('input')
    this.button = document.createElement('button')
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
        this.getQuestion(this.nextQuestionUrl)
      }
    })
  }

  setup () {
    this.p.textContent = this.question
    document.body.appendChild(this.p)
    document.body.appendChild(this.input)
    document.body.appendChild(this.button)
  }

  getQuestion (url) {
    let config = { method: 'GET' }

    fetch(url, config)
    .then(data => {
      return data.json()
    })
    .then(data => {
      this.question = data.question
      this.setup()
      this.nextQuestionUrl = data.nextURL
    })
  }

  answerQuestion (answer, url) {
    let config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({answer: answer})
    }

    fetch(url, config)
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log(data)
          this.nextQuestionUrl = data.nextURL
        })
  }
}

// Exports
module.exports = Game
