function loadEnterNickname () {
  let enterNicknameTemplate = document.querySelector('#nickname')

  let template = document.importNode(enterNicknameTemplate.content, true)
  document.body.appendChild(template)
}

// Exports
module.exports.loadEnterNickname = loadEnterNickname
