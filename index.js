require('dotenv').config();

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT;
const Twitter = require('twitter')

app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
  res.sendfile('src/index.html');
});

server.listen(port, function () {
  console.log('App listening on port ' + port + '!');
});

// // This part connects to Twitter
// const client = new Twitter({
//   consumer_key: process.env.TWITTER_CONSUMER_KEY,
//   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//   access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
//   access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
// });
//
// client.get('users/show', {screen_name: 'realDonaldTrump', include_entities: 'false'}, function(error, response) {
//   if(error) throw error;
//   console.log(response.statuses_count);  // Number of tweets
// });
