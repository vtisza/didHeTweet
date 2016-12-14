require('dotenv').config();

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT;
const Twitter = require('twitter');
const request = require('request');

let myLittle = [999, {"in_five_min": "False", "in_ten_min": "False", "last_hour":"False","today":"True"}]

app.use(express.static(__dirname + '/'));

app.get('/api/maxtweets', function (req, res) {
  request('http://vtisza.pythonanywhere.com/get_trump_count', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    myLittle[0] = JSON.parse(body) // Show the HTML for the Google homepage.

    request('http://vtisza.pythonanywhere.com/last_trump_time', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        myLittle[1] = JSON.parse(body) // Show the HTML for the Google homepage.
        res.send(JSON.stringify(myLittle))
      }
    })
  }
})

  // res.send(JSON.stringify(myLittle))
})

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
