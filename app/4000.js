const http = require('http')

let server = http.createServer(function (req, res) {
  res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'})
  res.end(JSON.stringify([
    {
      id: 1,
      name: '张一'
    },
    {
      id: 2,
      name: '张二'
    },
    {
      id: 3,
      name: '张三'
    },
    {
      id: 4,
      name: '张四'
    },
    {
      id: 5,
      name: '张五'
    },
    {
      id: 6,
      name: '张六'
    },
    {
      id: 7,
      name: '张七'
    },
    {
      id: 8,
      name: '张八'
    },
    {
      id: 9,
      name: '张九'
    },
    {
      id: 10,
      name: '张十'
    }
  ]))
})

server.listen(4000, function() {
  console.log('listening at 4000')
})

