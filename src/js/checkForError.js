/**
 * Module used for checking the given input.
 *
 * @module src/js/checkForError
 * @author Rasmus Falk
 * @version 1.0.0
 */

 'use strict'

 /**
  * Checks if the input is empty when clicking the button.
  *
  * @param {object} inputType
  * @throws {Error} The input field can't be empty.
  */
 function checkForError (inputType) {
   if (inputType.value.trim().length === 0) {
     inputType.value = ''
     inputType.classList.add('alert')

     throw new Error('Please enter something in the input field...')
   }
 }

 // Exports
 module.exports.checkForError = checkForError
