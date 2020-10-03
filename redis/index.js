const redis = require('redis')

let client = redis.createClient(6379, '127.0.0.1')

client.on('error', (err) => {
  console.error(err)
})

// 可以正确读取字符串
client.set('name', 'zfpx', redis.print)
client.get('name', redis.print)

// 对哈希表进行操作
client.hset('person', 'name', 'zfpx', redis.print)
client.hget('person', 'name', redis.print)

// 列表
client.lpush('links', 'a', redis.print)
client.lpush('links', 'b', 'c', redis.print)
client.lrange('links', 0, -1, redis.print)

// 集合
client.sadd('tags', 'a', redis.print)

// 如何在redis中模拟对象操作
client.hset('boy', 'name', 'ming', redis.print)
client.hset('boy', 'age', '20', redis.print)
client.hset('boy', 'home', 'shandong', redis.print)
client.hkeys('boy', (err, replies) => {
  console.log(replies)
  let person = {}
  replies.forEach(key => {
    client.hget('boy', key, (err, val) => {
      person[key] = val
      console.log(person)
    })
  })
})

client.keys('*', (err, replies) => {
  replies.forEach(key => {
    client.del(key)
  })
})

