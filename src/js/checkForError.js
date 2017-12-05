/**
 * Module used for checking the given input for errors.
 *
 * @module src/js/checkForError
 * @author Rasmus Falk
 * @version 1.0.0
 */

 'use strict'

 /**
  * Checks if the input field is empty when clicking the button.
  *
  * @param {object} textInput The input field that will be checked.
  * @throws {Error} The input field can't be empty.
  */
 function checkForTextError (textInput) {
   if (textInput.value.trim().length === 0) {
     textInput.value = ''
     textInput.classList.add('alert')
     document.querySelector('.warningText').style.visibility = 'visible'

     throw new Error('Please enter something in the input field...')
   }
 }

 /**
  * Checks if the keyboard input is any of the keys with number 1 to 9.
  *
  * @param {object} event The event object from the eventhandler it was used with.
  * @throws {Error} The user must press a number key.
  */
 function checkForKeyError (event) {
   if (event.keyCode < 49 || event.keyCode > 57) {
     if (!document.querySelector('.warningTextDyn')) {
       let text = document.createElement('p')
       document.querySelector('div').appendChild(text)

       text.textContent = 'Please press any of the numberkeys (1 - 9, located under F1, F2, F3 etc...) to answer the given question...'
       text.classList.add('warningTextDyn')
     }

     throw new Error('Please press any of the numbers from 1 to 9 to answer the given question...')
   }
 }

 // Exports
 module.exports.checkForTextError = checkForTextError
 module.exports.checkForKeyError = checkForKeyError
