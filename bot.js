"use strict";

const Twit = require('twit');
const { consumer_key, consumer_secret, access_token, access_token_secret} = process.env;
const timeout_ms = 60* 1000;

const T = new Twit({ consumer_key, consumer_secret, access_token, access_token_secret, timeout_ms });

const stream = T.stream('statuses/filter', { track: ['rijst recept', 'rijst recepten', 'rice recipe', 'rice recipes', 'riz recette', 'riz recettes'] })

stream.on('tweet', function (tweet) {
  if(tweet.user.id_str !== process.env.twitter_id) {
    setTimeout(() => {
      const url = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
      const status = `@mattimeurisse ${url}`;

      T.post('statuses/update', { status }, function(err, data, response) {
        console.log(data)
      })
    }, 4000);
  }
});
