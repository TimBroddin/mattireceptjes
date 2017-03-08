"use strict";

const Twit = require('twit');
const emoji = require('random-emoji');
const { consumer_key, consumer_secret, access_token, access_token_secret} = process.env;
const timeout_ms = 60* 1000;



const T = new Twit({ consumer_key, consumer_secret, access_token, access_token_secret, timeout_ms });

const stream = T.stream('statuses/filter', { track: ['rijst recept', 'rijst recepten', 'rice recipe', 'rice recipes', 'riz recette', 'riz recettes'] })

let queue = [];

setInterval(() => {
  const randomNumber = Math.round(Math.random()*15);
  console.log(`Random number = ${randomNumber} - Queue length: ${queue.length}`);

  if(queue.length && randomNumber === 10) {
    let tweet = queue.shift();
    const url = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
    const rnd = emoji.random({count: 5});
    const length = Math.ceil(Math.random()*5);
    let emojiStr = '';
    for(let i=0;i<length;i++) {
      emojiStr += rnd[i].character;
    }

    const status = `Nieuw recept! ${emojiStr} @mattimeurisse  ${url}`;
    console.log(status);

    T.post('statuses/update', { status }, function(err, data, response) {
      //console.log(data)
      if(err) {
        console.log(err);
      }
    })
    
  }


}, 60*1000);


stream.on('tweet', function (tweet) {
  if(tweet.user.id_str !== process.env.twitter_id) {
    console.log('Push tweet to queue');
    queue.push(tweet);
  }
});
