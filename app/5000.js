const http = require('http')

let server = http.createServer(function (req, res) {
  res.end('5000')
})

server.listen(5000, function() {
  console.log('listening at 5000')
})

