function localStorage () {
  let input = document.querySelector('input')

  if (window.localStorage.getItem('counter')) {
    let stored = window.localStorage.getItem('counter')
    window.localStorage.setItem('counter', parseInt(stored) + 1)
  } else {
    window.localStorage.setItem('counter', 0)
  }

  if (window.localStorage.getItem('players')) {
    let storedJSON = window.localStorage.getItem('players')
    let storedObj = JSON.parse(storedJSON)

    storedObj.push({name: input.value, time: 0})
    window.localStorage.setItem('players', JSON.stringify(storedObj))
  } else {
    let players = [{name: input.value, time: 0}]
    window.localStorage.setItem('players', JSON.stringify(players))
  }
}

// Exports
module.exports.localStorage = localStorage
