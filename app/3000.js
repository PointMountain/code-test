const http = require('http')

let server = http.createServer(function (req, res) {
  res.end('3000')
})

server.listen(3000, function() {
  console.log('listening at 3000')
})

