const checkForError = require('./checkForError')
const loadGameOver = require('./setup')
const loadScoreBoard = require('./setup')

class Game {
  constructor () {
    this.nextURL = 'http://vhost3.lnu.se:20080/question/1'
    this.data = null
    this.templateQuestion = document.querySelector('#question')
    this.templateQuestionAlt = document.querySelector('#questionAlt')
    this.onKeyPressRef = this.onKeyPress.bind(this)
  }

  startNewGame () {
    this.getQuestion(this.nextURL)
  }

  addQuestion () {
    document.body.removeChild(document.querySelector('div'))

    if (this.data.alternatives) {
      let template = document.importNode(this.templateQuestionAlt.content, true)
      document.body.appendChild(template)

      let question = document.querySelector('h2')
      question.textContent = this.data.question

      let alternatives = this.data.alternatives
      let alternative = null
      let altCount = 1

      for (let i in alternatives) {
        alternative = document.createElement('p')
        alternative.classList.add('key')
        alternative.textContent = `NumKey: ${altCount++} Answer: "${alternatives[i]}"`

        document.querySelector('div').appendChild(alternative)
      }

      document.addEventListener('keydown', this.onKeyPressRef)
    } else {
      let template = document.importNode(this.templateQuestion.content, true)
      document.body.appendChild(template)

      let question = document.querySelector('h2')
      question.textContent = this.data.question

      let button = document.querySelector('button')
      let input = document.querySelector('input')

      button.addEventListener('click', event => {
        let answer = input.value
        checkForError.checkForError(input)

        this.answerQuestion(this.nextURL, answer)
      })
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
    answer.trim()

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
