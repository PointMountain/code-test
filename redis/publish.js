const redis = require('redis')

let client1 = redis.createClient(6379, '127.0.0.1')
let client2 = redis.createClient(6379, '127.0.0.1')

let count = 0
client1.subscribe('channel_a')
client1.subscribe('channel_b')

client1.on('message', (channel, message) => {
  console.log(channel, message)
  client1.unsubscribe('channel_b')
})

client2.publish('channel_a', 'hello')
client2.publish('channel_b', 'world')

setTimeout(() => {
  client2.publish('channel_a', 'hello2')
  client2.publish('channel_b', 'world2')
}, 2000);
