/**
 * Module for the setup functions.
 *
 * @module src/js/setup
 * @author Rasmus Falk
 * @version 1.0.0
 */

 'use strict'

 const Game = require('./Game')
 const checkForError = require('./checkForError')

 /**
  * Loads the screen where you can enter your nickname for the quiz.
  *
  * @throws {Error} The input field can't be empty.
  */
 function loadEnterNickname () {
   _addTemplate('#nickname')

   let button = document.querySelector('button')
   let input = document.querySelector('input')

   button.addEventListener('click', event => {
     checkForError.checkForTextError(input)
     window.localStorage.setItem('player', JSON.stringify({name: input.value, time: 0, date: new Date()}))
     new Game().startNewGame()
   })
 }

 /**
  * Loads the game-over screen.
  */
 function loadGameOver () {
   _addTemplate('#gameOver')

   let button = document.querySelector('button')

   button.addEventListener('click', event => {
     document.body.removeChild(document.querySelector('div'))
     loadEnterNickname()
   })
 }

 /**
  * Loads the scoreboard and adds the names, times and dates to both the board, and in the browsers storage.
  */
 function loadScoreBoard () {
   _addTemplate('#scoreBoard')

   let button = document.querySelector('button')

   button.addEventListener('click', event => {
     document.body.removeChild(document.querySelector('div'))
     loadEnterNickname()
   })

   let player = JSON.parse(window.localStorage.getItem('player'))
   let scoreBoard

   if (window.localStorage.getItem('scoreBoard')) {
     scoreBoard = JSON.parse(window.localStorage.getItem('scoreBoard'))
     scoreBoard.push(player)
   } else {
     scoreBoard = []
     scoreBoard.push(player)
   }

   scoreBoard.sort((a, b) => a.time - b.time)
   scoreBoard = scoreBoard.slice(0, 5)

   let list = document.querySelector('ul')

   for (let i = 0; i < scoreBoard.length; i++) {
     let newLi = document.createElement('li')
     list.appendChild(newLi)

     scoreBoard[i].time = Math.round(scoreBoard[i].time * 10) / 10

     let score = document.querySelectorAll('li')[i]
     score.textContent = `(${i + 1}) ${scoreBoard[i].name}, `

     if (scoreBoard[i].time > 60) {
       let min = Math.floor(scoreBoard[i].time / 60)
       let sec = Math.round((scoreBoard[i].time % 60) * 10) / 10

       if (min === 1) {
         score.textContent += `${min} minute ${sec} seconds`
       } else {
         score.textContent += `${min} minutes ${sec} seconds`
       }
     } else {
       score.textContent += `${scoreBoard[i].time} seconds`
     }

     score.textContent += `, ${scoreBoard[i].date.slice(0, 10)}`
   }

   window.localStorage.setItem('scoreBoard', JSON.stringify(scoreBoard))
 }

 /**
  * Adds a given template to the DOM.
  *
  * @param {string} id - The ID of the template that will be added.
  */
 function _addTemplate (id) {
   if (document.querySelector('div')) {
     document.body.removeChild(document.querySelector('div'))
   }

   let templateClone = document.querySelector(id)
   let template = document.importNode(templateClone.content, true)
   document.body.appendChild(template)
 }

 // Exports
 module.exports.loadEnterNickname = loadEnterNickname
 module.exports.loadGameOver = loadGameOver
 module.exports.loadScoreBoard = loadScoreBoard
 module.exports.addTemplate = _addTemplate
