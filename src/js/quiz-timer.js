const template = document.createElement('template')
const setup = require('./setup')

template.innerHTML = `
<style>
  :host {
      color: rgb(233, 233, 233);
      display: inline-block;
      width: 100px;
      border: 1px solid rgb(233, 233, 233);
      border-radius: 10px;
  } 
</style>

<p id="timerText"></p>
`

class Timer extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.timer = null
    this.timeCounter = 20
    this.timerText = this.shadowRoot.querySelector('#timerText')
  }

  connectedCallback () {
    this.startTimer()
  }

  disconnectedCallback () {
    clearTimeout(this.timer)

    let player = JSON.parse(window.localStorage.getItem('player'))
    let currentTime = (20 - this.timeCounter)
    player.time += currentTime

    window.localStorage.setItem('player', JSON.stringify(player))
  }

  startTimer () {
    this.timerText.textContent = this.timeCounter--

    this.timer = setTimeout(() => {
      if (this.timeCounter < 0) {
        clearTimeout(this.timer)
        setup.loadGameOver()
      } else {
        this.startTimer()
      }
    }, 1000)
  }
}

window.customElements.define('quiz-timer', Timer)

// Exports
module.exports = Timer
