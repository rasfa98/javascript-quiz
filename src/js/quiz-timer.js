const template = document.createElement('template')

class Timer extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this.test = 'test'
  }

  connectedCallback () {
    console.log(this.test)
  }
}

window.customElements.define('quiz-timer', Timer)

// Exports
module.exports = Timer
