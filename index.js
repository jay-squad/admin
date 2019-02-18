const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(__dirname))
  .use(express.static(path.join(__dirname, 'pages/forms')))
  .get('/', (req, res) => res.sendFile(__dirname + '/home.html'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
