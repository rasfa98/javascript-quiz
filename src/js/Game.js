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
        this.startGame()
      }
    })
  }

  startGame () {
    this.getQuestion(this.nextURL)
  }

  setup () {
    document.body.removeChild(document.querySelector('div'))
    let div = document.createElement('div')

    let button = document.createElement('button')
    let input = document.createElement('input')
    let question = document.createElement('p')

    div.appendChild(question)
    div.appendChild(input)

    question.textContent = this.data.question
    document.body.appendChild(div)

    div.appendChild(button).addEventListener('click', event => {
      let answer = input.value
      this.nextURL = this.data.nextURL
      this.answerQuestion(this.nextURL, answer)
    })

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

      document.addEventListener('keydown', event => {
        let keyPressed = event.keyCode
        this.answer = String.fromCharCode(keyPressed)
        this.answerQuestion(this.nextURL, this.answer)
      })
    }
  }

  gameOver () {
    document.body.removeChild(document.querySelector('div'))
    let gameOver = document.createElement('h1')
    gameOver.textContent = 'Game Over!'
    document.body.appendChild(gameOver)
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
