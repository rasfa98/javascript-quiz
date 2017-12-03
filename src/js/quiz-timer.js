/**
 * Module for the Timer WebComponent.
 *
 * @module src/js/quiz-timer
 * @author Rasmus Falk
 * @version 1.0.0
 */

 'use strict'

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
 /**
  * Class representing a Timer component.
  */
 class Timer extends window.HTMLElement {
  /**
   * Creates an instance of Timer.
   *
   * @memberof Timer
   */
   constructor () {
     super()

     this.attachShadow({mode: 'open'})
     this.shadowRoot.appendChild(template.content.cloneNode(true))
     this.timer = null
     this.timeCounter = 20
     this.timerText = this.shadowRoot.querySelector('#timerText')
   }

   /**
    * When the timer element get's added to the DOM it starts.
    */
   connectedCallback () {
     this.startTimer()
   }

   /**
    * When the timer get's removed it stops and the time is added to the current players time property.
    */
   disconnectedCallback () {
     clearTimeout(this.timer)

     let player = JSON.parse(window.localStorage.getItem('player'))
     let currentTime = (20 - this.timeCounter)
     player.time += currentTime

     window.localStorage.setItem('player', JSON.stringify(player))
   }

   /**
    * Starts the timer.
    */
   startTimer () {
     this.timerText.textContent = Math.round((this.timeCounter -= 0.1) * 10) / 10

     this.timer = setTimeout(() => {
       if (this.timeCounter < 0) {
         clearTimeout(this.timer)
         setup.loadGameOver()
       } else {
         this.startTimer()
       }
     }, 100)
   }
}

 window.customElements.define('quiz-timer', Timer)

 // Exports
 module.exports = Timer
