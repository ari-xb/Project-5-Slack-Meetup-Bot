// copy of Duyen's main.js file.

var Botkit = require('botkit')
var slackToken = process.env.SLACK_TOKEN
var $ = require('jquery'); //npm install jQuery
var axios = require('axios')
const Storage = require('./bot_storage');

// var Witbot = require('witbot')
// var witToken = process.env.WIT_TOKEN
// var witbot = Witbot(witToken)

// todo add custom modules for NLP - wit.ai

var controller = Botkit.slackbot({
    // reconnects to Slack RTM after failed connection
    retry: Infinity,
    debug: false
    // verbose logging
    // logLevel: 7
})

// connect the bot to a stream of messages + added 'send_via_rtm: true' to reenable bot is typing.
controller.spawn({
   token: slackToken,
   send_via_rtm: true
  }).startRTM(function(err) {
  if (err) {
    throw new Error('Error connecting to slack: ', err)
  }
  console.log('Connected to slack');
});

// bot listens to...
controller.hears(['hello'],['direct_message','direct_mention','mention'],function(bot,message) {

  bot.replyWithTyping(message,`Hi! :wave: how can I be of service, <@${message.user}>?`);

});

// testing to see if bot types
//bot._send({ type: "typing", channel: message.channel });
controller.hears(['busy'],['direct_message','direct_mention','mention'],function(bot,message) {

  // bot.reply(message,'typing...');
  bot.replyWithTyping(message,`Yes, <@${message.user}> I am very busy, but I can always make time for you:grinning:`);
  console.log(message.user);
});


controller.hears(['meetup'],['direct_message','direct_mention','mention'],function(bot,message) {

  bot.reply(message,'getting that for you now...')
//
// // make AJAX request to meetup.com
//   var settings = 'https://api.meetup.com/find/groups?photo-host=public&zip=3000&page=5&text=css&country=australia&sig_id=213030423&radius=5&sig=587a5330ff0818f016888e69fe29791eaf28b7f3';
// //  {
//     //https://api.meetup.com/find/groups?photo-host=public&page=5&text=ruby&sig_id=213030423&sig=57a89afda3eacca17d99c58187ff73b692871527
// // working search for the text 'ruby'
// //    baseURL: 'https://api.meetup.com/',
// //    url: "/find/groups",  // required
//   //   data: {
//   //         zip: '11211',
//   //         radius: '1',
//   //         category: '25',
//   //         order: 'members',
//   //         sig_id: '213030423',
//   //         sig: '37c9d3f7211569dbf5599b620ba6eefb88794478'
//   //       }, // added Authed Signed URL.
//   //   method: 'get',  // default optional
//   //   dataType: 'json'  // usually auto detected
//   // }
//
// //var querystring = require('querystring');
// //axios.post('http://something.com/', querystring.stringify({ foo: 'bar' });
//
// // // //https://api.meetup.com/find/groups?zip=11211&radius=1&category=25&order=members&&sign=true
// // // // make an AJAX request to meet up api
//     // var apiCall = function (settings) {
//       axios.get(settings)
//       .then(function(res) {
    //
    bot.replyAndUpdate(message,
        {
        "attachments" : [
            {
                "color": "#ed1c40",
                "pretext": "Top 5 meet-ups:",
                "author_name": "1",
                "title": "MelbCSS",
                "title_link": "https://www.meetup.com/MelbCSS/",
                "text": "Next Meet-up: date "
            	},{
                "color": "#ed1c40",
                "author_name": "2",
                "title": "MelbCSS",
                "title_link": "https://www.meetup.com/MelbCSS/",
                "text": "Next Meet-up: date "
            	},{
                "color": "#ed1c40",
                "author_name": "3",
                "title": "MelbCSS",
                "title_link": "https://www.meetup.com/MelbCSS/",
                "text": "Next Meet-up: date "
            	},{
                "color": "#ed1c40",
                "author_name": "4",
                "title": "MelbCSS",
                "title_link": "https://www.meetup.com/MelbCSS/",
                "text": "Next Meet-up: date "
            	},{
                "color": "#ed1c40",
                "author_name": "5",
                "title": "MelbCSS",
                "title_link": "https://www.meetup.com/MelbCSS/",
                "text": "Next Meet-up: date "
            	}
        ]
    });
        // console.log(results);

        // var meetups = res.results; //results is the
        // console.log(res);

        // colour of meetup 'Red' #ed1c40
        // meetups.forEach(function(meetup) {
        //
        //   var $row = $('<h2>').append($('<a>') // create an a tag
        //   .attr('target', '_blank')  // adding attributes to the a tag
        //   .attr('href', 'http://www.imdb.com/title/' + movie.imdbID)  // forming the link
        //   .text(movie.Title)); // create an a tag with text of movie title in it.
        //
        //   $('#list').append($row)
        //
        // })
      // .catch(function (error) {
      // console.log(error);
      // });
    // };
    // apiCall(settings);
});

// details to grab from meetup searches: maybe the first 5 indexes[0...4]
// https://api.meetup.com/find/groups?photo-host=public&zip=3000&page=5&text=css&country=australia&sig_id=213030423&radius=5&sig=587a5330ff0818f016888e69fe29791eaf28b7f3
// // [
//    {
//   "next_event":{
//    "time":1484118000000
//    } - time is in seconds from 1st Jan 1970 (Unix time)
//   "name":"St Kilda 3182"
//   "link":"https://www.meetup.com/St-Kilda-3182/events/230764040/"
//   }


//  ] Use the name with the MU page to create a clickable link, and date of the next MU.

// Wit.ai integration code example:
// controller.hears('.*', 'direct_message,direct_mention', function (bot, message) {
//   witbot.process(message.text, bot, message)
// });
// witbot.hears('hi', 0.5, function (bot, message, outcome) {
//   bot.reply(message, 'Hi there!')
// });

// // on today's menu
// controller.hears(['lunch', 'menu'],['direct_message','direct_mention','mention'],function(bot,message) {
//
//   bot.reply(message,'The menu for today is Mexican burritos.');
//
// });
