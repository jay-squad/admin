const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var fs = require("fs");
var data = "const FOODIE_SERVER_BASE = \"https://foodie-server-prod.herokuapp.com\"";

fs.writeFile("js/conf.js", data, function(err, data) {
  if (err) console.log(err);
  console.log("Successfully Written conf.js");
});

express()
  .use(express.static(__dirname))
  .use(express.static(path.join(__dirname, 'pages/forms')))
  .get('/', (req, res) => res.sendFile(__dirname + '/home.html'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
