/**
 * Module for the Game type.
 *
 * @module src/js/Game
 * @author Rasmus Falk
 * @version 1.0.0
 */

 'use strict'

 const checkForError = require('./checkForError')
 const setup = require('./setup')

 /**
  * Class representing a new Game.
  */
 class Game {
   /**
    * Creates an instance of Game.
    *
    * @memberof Game
    */
   constructor () {
     this.nextURL = 'http://vhost3.lnu.se:20080/question/1'
     this.data = null
     this.templateQuestion = document.querySelector('#question')
     this.templateQuestionAlt = document.querySelector('#questionAlt')
     this.onKeyPressRef = this._onKeyPress.bind(this)
   }

   /**
    * Starts a new game.
    */
   startNewGame () {
     this.getQuestion(this.nextURL)
   }

   /**
    * Adds the given question to the DOM.
    *
    * @throws {Error} Any of the keys with number 1 to 9 must be pressed.
    */
   addQuestion () {
     if (this.data.alternatives) {
       setTimeout(() => {
         document.removeEventListener('keydown', this.onKeyPressRef)
       }, 21000)

       setup.addTemplate('#questionAlt')

       let question = document.querySelector('h2')
       question.textContent = this.data.question

       let alternatives = this.data.alternatives
       let alternative = null
       let altCount = 1

       for (let i in alternatives) {
         alternative = document.createElement('p')
         alternative.classList.add('key')
         alternative.textContent = `Key: ${altCount++} Answer: "${alternatives[i]}"`

         document.querySelector('div').appendChild(alternative)
       }

       document.addEventListener('keydown', this.onKeyPressRef)
     } else {
       setup.addTemplate('#question')

       let question = document.querySelector('h2')
       question.textContent = this.data.question

       let button = document.querySelector('button')
       let input = document.querySelector('input')

       button.addEventListener('click', event => {
         checkForError.checkForInputError(input)
         let answer = input.value

         this.answerQuestion(this.nextURL, answer)
       })
     }
   }

   /**
    * Converts the pressed key to an answer and is used together with an event handler.
    *
    * @param {KeyboardEvent} event - The event object from the eventhandler it was used with.
    * @throws {Error} Any of the keys with number 1 to 9 must be pressed.
    */
   _onKeyPress (event) {
     checkForError.checkForKeyError(event)
     let answer = event.keyCode
     answer = `alt${String.fromCharCode(answer)}`

     this.answerQuestion(this.nextURL, answer)
     document.removeEventListener('keydown', this.onKeyPressRef)
   }

   /**
    * Get a question from the server.
    *
    * @param {string} url - The URL used for getting a question.
    */
   getQuestion (url) {
     let config = { method: 'GET' }

     window.fetch(url, config)
    .then(data => data.json())
    .then(data => {
      this.data = data
      this.nextURL = data.nextURL
      this.addQuestion()
    })
   }

   /**
    * Sends the given answer to the server.
    *
    * @param {string} url - The URL to which the answer will be sent.
    * @param {string} answer - The answer to the question.
    */
   answerQuestion (url, answer) {
     let config = {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({answer: answer.trim()})
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
            setup.loadScoreBoard()
          }
        })
        .catch(data => setup.loadGameOver())
   }
}

 // Exports
 module.exports = Game
