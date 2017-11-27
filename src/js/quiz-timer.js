const template = document.createElement('template')
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
  }

  startTimer () {
    this.timer = setTimeout(() => {
      if (this.counter < 0) {
        clearTimeout(this.timer)
        console.log('Times up')
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
