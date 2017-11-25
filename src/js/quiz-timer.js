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

<p id="timerText">-</p>
`

class Timer extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  connectedCallback () {
  }
}

window.customElements.define('quiz-timer', Timer)

// Exports
module.exports = Timer
