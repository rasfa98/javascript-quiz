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

 // Exports
 module.exports.checkForTextError = checkForTextError
