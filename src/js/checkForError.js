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
  * @param {object} inputType
  * @throws {Error} The input field can't be empty.
  */
 function checkForTextError (inputType) {
   if (inputType.value.trim().length === 0) {
     inputType.value = ''
     inputType.classList.add('alert')
     document.querySelector('.warningText').style.visibility = 'visible'

     throw new Error('Please enter something in the input field...')
   }
 }

 /**
  * Checks if the keyboard input is any of the keys with number 1 to 9.
  *
  * @param {object} event
  * @throws {Error} The user must press a number key.
  */
 function checkForKeyError (event) {
   if (event.keyCode < 49 || event.keyCode > 57) {
     if (!document.querySelector('.warningTextDyn')) {
       let text = document.createElement('p')
       document.querySelector('div').appendChild(text)

       text.textContent = 'Please press any of the number keys (1 - 9) to answer the given question...'
       text.classList.add('warningTextDyn')
     }

     throw new Error('Please press any of the numbers from 1 to 9 to answer the given question...')
   }
 }

 // Exports
 module.exports.checkForTextError = checkForTextError
 module.exports.checkForKeyError = checkForKeyError
