"use strict";

const Twit = require('twit');

const T = new Twit({
  consumer_key:         'S6qysbTRUvjKJJg430aMffAt9',
  consumer_secret:      'hLrki6jXuaupntvvmPEV7GwRZNiyyp957tTVXqWp17xoMN2BYs',
  access_token:         '839414274871144448-IrjWR6PsJZ3rPkKpSo9unkvDSgYScOm',
  access_token_secret:  'mB41lbe06d8n95dD4pdW0dpb6DHNDvTWnn6hrDAactwPg',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

const stream = T.stream('statuses/filter', { track: ['rijst recept', 'rijst recepten', 'rice recipe', 'rice recipes', 'riz recette', 'riz recettes'] })

stream.on('tweet', function (tweet) {
  if(tweet.user.id_str !== '839414274871144448') {
    setTimeout(() => {
      const url = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
      const status = `@mattimeurisse ${url}`;


      T.post('statuses/update', { status }, function(err, data, response) {
        console.log(data)
      })
    }, 4000);
  }

})
