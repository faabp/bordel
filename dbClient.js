var redis = require("redis");
const configure = require('./configure')

const config = configure()
var client = redis.createClient({
  host: process.env.REDIS_HOST || config.redis.host,
  port: process.env.REDIS_PORT || config.redis.port,
  retryAttempts: 10,
  retryDelay: 3000,
})

console.log("host : "+ process.env.REDIS_HOST + " port : "+ process.env.REDIS_PORT);

process.on('SIGINT', function() {
  client.quit();
});

module.exports = client
