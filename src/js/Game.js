class Game {
  constructor () {
    this.nextURL = null
    this.data = null
    this.enterNicknameTemplate = document.querySelector('#nickname')
    this.templateQuestion = document.querySelector('#question')
    this.templateGameOver = document.querySelector('#gameOver')
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
        window.localStorage.setItem('nickname', input.value)
        this.startNewGame()
      }
    })
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
      this.nextURL = this.data.nextURL
      this.answerQuestion(this.nextURL, answer)
    })

    button.innerHTML = 'Answer!'

    // If there are alternatives
    if (this.data.alternatives) {
      div.removeChild(input)
      div.removeChild(button)

      let alternatives = this.data.alternatives
      let alternative = null

      for (let i in alternatives) {
        alternative = document.createElement('p')
        alternative.textContent = `Press: ${i} for ${alternatives[i]}`

        div.appendChild(alternative)
      }
    }
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

    fetch(url, config)
    .then(data => {
      return data.json()
    })
    .then(data => {
      this.data = data
      this.addQuestion()
      console.log(data)
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
          this.data = data
          this.getQuestion(this.data.nextURL)
        })
        .catch(data => {
          this.gameOver()
        })
  }
}

// Exports
module.exports = Game
