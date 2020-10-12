const http = require('http')

let server = http.createServer(function (req, res) {
  res.end('4000')
})

server.listen(4000, function() {
  console.log('listening at 4000')
})

