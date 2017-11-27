class Game {
  constructor () {
    this.nextURL = null
    this.data = null
    this.enterNicknameTemplate = document.querySelector('#nickname')
    this.templateQuestion = document.querySelector('#question')
    this.templateGameOver = document.querySelector('#gameOver')
    this.templateScoreBoard = document.querySelector('#scoreBoard')
    this.onKeyPressRef = this.onKeyPress.bind(this)
  }

  enterNickname () {
    let template = document.importNode(this.enterNicknameTemplate.content, true)
    document.body.appendChild(template)

    let input = document.querySelector('input')
    let button = document.querySelector('button')
    let nicknameDiv = document.querySelector('div')
    let warningText = document.createElement('p')

    warningText.textContent = 'Please enter a nickname...'

    button.addEventListener('click', event => {
      if (input.value.trim().length === 0) {
        nicknameDiv.appendChild(warningText).classList.add('alert')
        input.value = ''
      } else {
        // let player = {name: input.value, time: '1.00'}
        // window.localStorage.setItem('player', JSON.stringify(player))
        this.startNewGame()
      }
    })
  }

  scoreBoard () {
    document.body.removeChild(document.querySelector('div'))

    let template = document.importNode(this.templateScoreBoard.content, true)
    document.body.appendChild(template)

    // let names = window.localStorage.getItem('player')
    // let namesObject = JSON.parse(names)

    let li = document.createElement('li')
    let scoreList = document.querySelector('ul')
    li.textContent = undefined
    scoreList.appendChild(li)
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

    // If there are alternatives
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

  gameOver () {
    document.body.removeChild(document.querySelector('div'))

    let template = document.importNode(this.templateGameOver.content, true)
    document.body.appendChild(template)

    let button = document.querySelector('button')

    button.addEventListener('click', event => {
      this.startNewGame()
    })
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

          if (!data.nextURL) {
            this.scoreBoard()
          } else {
            this.getQuestion(this.data.nextURL)
          }
        })
        .catch(data => {
          this.gameOver()
        })
  }
}

// Exports
module.exports = Game
