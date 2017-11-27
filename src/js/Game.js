const loadGameOver = require('./loadGameOver')
const loadScoreBoard = require('./loadScoreBoard')

class Game {
  constructor () {
    this.nextURL = null
    this.data = null
    this.templateQuestion = document.querySelector('#question')
    this.onKeyPressRef = this.onKeyPress.bind(this)
  }

  startNewGame () {
    this.nextURL = 'http://vhost3.lnu.se:20080/question/1'
    this.getQuestion(this.nextURL)
  }

  addQuestion () {
    document.body.removeChild(document.querySelector('div'))

    let template = document.importNode(this.templateQuestion.content, true)
    document.body.appendChild(template)

    this.question = document.querySelector('h2')
    this.question.textContent = this.data.question

    let button = document.querySelector('button')
    let input = document.querySelector('input')
    let div = document.querySelector('div')

    button.addEventListener('click', event => {
      let answer = input.value
      this.answerQuestion(this.nextURL, answer)
    })

    button.innerHTML = 'Answer!'

    if (this.data.alternatives) {
      let info = document.createElement('p')
      info.textContent = 'Press the key that matches the correct alternative'
      div.removeChild(input)
      div.removeChild(button)

      div.appendChild(info)

      let alternatives = this.data.alternatives
      let alternative = null
      let altCount = 1

      for (let i in alternatives) {
        alternative = document.createElement('p')
        alternative.textContent = `${altCount++} - "${alternatives[i]}"`

        div.appendChild(alternative)
      }

      document.addEventListener('keydown', this.onKeyPressRef)
    }
  }

  onKeyPress (event) {
    let answer = event.keyCode
    let key = String.fromCharCode(answer)
    answer = `alt${key}`

    this.answerQuestion(this.nextURL, answer)
    document.removeEventListener('keydown', this.onKeyPressRef)
  }

  getQuestion (url) {
    let config = { method: 'GET' }

    window.fetch(url, config)
    .then(data => {
      return data.json()
    })
    .then(data => {
      this.data = data
      this.nextURL = data.nextURL
      this.addQuestion()
    })
  }

  answerQuestion (url, answer) {
    let config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({answer: answer})
    }

    window.fetch(url, config)
        .then(data => {
          if (!data.ok) {
            throw new Error(data.statusText)
          }
          return data.json()
        })
        .then(data => {
          this.data = data
          this.nextURL = data.nextURL

          if (data.nextURL) {
            this.getQuestion(this.data.nextURL)
          } else {
            loadScoreBoard.loadScoreBoard()
          }
        })
        .catch(data => {
          loadGameOver.loadGameOver()
        })
  }
}

// Exports
module.exports = Game
