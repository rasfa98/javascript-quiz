function request () {
  let req = new XMLHttpRequest()

  req.open('GET', 'http://vhost3.lnu.se:20080/question/1')
  req.send()

  req.addEventListener('load', event => {
    console.log(req.responseText)
  })
}

// Exports
module.exports.request = request
