const template = document.createElement('template')
const loadGameOver = require('./loadGameOver')

template.innerHTML = `
<style>
  :host {
      color: rgb(233, 233, 233);
      display: inline-block;
      width: 100px;
      border: 1px solid rgb(233, 233, 233);
  } 
</style>

<p id="timerText">20</p>
`

class Timer extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.timer = null
    this.counter = 19
    this.timerText = this.shadowRoot.querySelector('#timerText')
  }

  connectedCallback () {
    this.startTimer()
  }

  disconnectedCallback () {
    clearTimeout(this.timer)

    let player = window.localStorage.getItem('player')
    let playerObj = JSON.parse(player)
    let currentTime = (20 - this.counter) + 1
    playerObj.time += currentTime
    window.localStorage.removeItem('player')
    window.localStorage.setItem('player', JSON.stringify(playerObj))
  }

  startTimer () {
    this.timer = setTimeout(() => {
      if (this.counter < 0) {
        clearTimeout(this.timer)
        loadGameOver.loadGameOver()
      } else {
        this.startTimer()
        this.timerText.textContent = this.counter--
      }
    }, 1000)
  }
}

window.customElements.define('quiz-timer', Timer)

// Exports
module.exports = Timer
