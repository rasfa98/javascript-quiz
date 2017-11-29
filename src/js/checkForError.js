function checkForError (inputType) {
  if (inputType.value.trim().length === 0) {
    inputType.value = ''
    inputType.classList.add('alert')

    throw new Error('Please enter something in the input field...')
  }
}

// Exports
module.exports.checkForError = checkForError
