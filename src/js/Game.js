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
     this._nextURL = 'http://vhost3.lnu.se:20080/question/1'
     this._data = null
     this._onKeyPressRef = this._onKeyPress.bind(this)
     this._eventTimer = null
   }

   /**
    * Starts a new game.
    *
    * @throws {Error} If an error with the request occures.
    */
   startNewGame () {
     this.getQuestion(this._nextURL)
   }

   /**
    * Adds the given question to the DOM.
    *
    * @throws {Error} The input field can't be empty.
    * @throws {Error} Any of the keys with number 1 to 9 must be pressed.
    * @throws {Error} If an error with the request occures.
    */
   addQuestion () {
     if (this._data.alternatives) {
       this._eventTimer = setTimeout(() => {
         document.removeEventListener('keydown', this._onKeyPressRef)
       }, 21000)

       setup.addTemplate('#questionAlt')

       let question = document.querySelector('h2')
       question.textContent = this._data.question

       let alternatives = this._data.alternatives
       let alternative = null
       let altCount = 1

       for (let i in alternatives) {
         alternative = document.createElement('p')
         alternative.classList.add('key')
         alternative.textContent = `Number: ${altCount++} Answer: "${alternatives[i]}"`

         document.querySelector('div').appendChild(alternative)
       }

       document.addEventListener('keydown', this._onKeyPressRef)
     } else {
       setup.addTemplate('#question')

       let question = document.querySelector('h2')
       question.textContent = this._data.question

       let button = document.querySelector('button')
       let input = document.querySelector('input')

       button.addEventListener('click', event => {
         checkForError.checkForTextError(input)
         this.answerQuestion(this._nextURL, input.value)
       })
     }
   }

   /**
    * Converts the pressed key to an answer and is used together with an event handler.
    *
    * @param {object} event The event object from the eventhandler it was used with.
    * @throws {Error} Any of the keys with number 1 to 9 must be pressed.
    * @throws {Error} If an error with the request occures.
    */
   _onKeyPress (event) {
     checkForError.checkForKeyError(event)

     let answer = event.keyCode
     answer = `alt${String.fromCharCode(answer)}`
     this.answerQuestion(this._nextURL, answer)

     document.removeEventListener('keydown', this._onKeyPressRef)
     clearTimeout(this._eventTimer)
   }

   /**
    * Gets a question from the server.
    *
    * @param {string} url The URL used for getting a question.
    * @throws {Error} If an error with the request occures.
    */
   getQuestion (url) {
     let config = { method: 'GET' }

     window.fetch(url, config)
    .then(data => {
      if (!data.ok) {
        throw new Error(data.statusText)
      }

      return data.json()
    })
    .then(data => {
      this._data = data
      this._nextURL = data.nextURL
      this.addQuestion()
    })
   }

   /**
    * Sends the given answer to the server.
    *
    * @param {string} url The URL to which the answer will be sent.
    * @param {string} answer The answer to the question.
    * @throws {Error} If an error with the request occures.
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
          this._data = data
          this._nextURL = data.nextURL

          if (data.nextURL) {
            this.getQuestion(data.nextURL)
          } else {
            setup.loadScoreBoard()
          }
        })
        .catch(data => setup.loadGameOver())
   }
}

 // Exports
 module.exports = Game
