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
 function checkForInputError (inputType) {
   if (inputType.value.trim().length === 0) {
     inputType.value = ''
     inputType.classList.add('alert')

     throw new Error('Please enter something in the input field...')
   }
 }

 /**
  * Checks if the keyboard input is any of the keys from 1 to 9.
  *
  * @param {object} event
  * @throws {Error} Any of the keys with number 1 to 9 must be pressed.
  */
 function checkForKeyError (event) {
   if (event.keyCode < 49 || event.keyCode > 57) {
     document.querySelector('p').classList.toggle('warning')
     throw new Error('Please press any of the number keys from 1 to 9...')
   }
 }

 // Exports
 module.exports.checkForInputError = checkForInputError
 module.exports.checkForKeyError = checkForKeyError
