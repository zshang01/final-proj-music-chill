import { Meteor } from 'meteor/meteor';
import "../imports/api/Song.js";
import "../imports/api/Methods.js";
import "../imports/api/Users.js";


import { DDPRateLimiter } from "meteor/ddp-rate-limiter";
import { WebApp } from "meteor/webapp";

const LISTS_METHODS = [
  "displayGenres",
  "search",
  "searchSong",
  "song.add",
  "song.addbyid",
  "song.exist",
  "song.existbyid",
  "song.updatebyid",
  "song.update",
  "song.display",
  "song.sortLike",
  "song.sortComment",
  "user.commentttt",
  "user.exist",
  "user.comment",
  "user.firstcomment",
  "user.signup"
];


if (Meteor.isServer) {
  DDPRateLimiter.addRule(
    {
      name(name) {
        return LISTS_METHODS.includes(name);
      },

      // Rate limit per connection ID
      connectionId() {
        return true;
      }
    },
    5,
    1000
  );
}



WebApp.addHtmlAttributeHook(() => ({ lang: "en" }));


Meteor.startup(() => {
  // code to run on server at startup  

  // if (!process.env.BLENDIFY_SECRET) {
  //   console.log('******************************');
  //   console.log('[ERROR] Missing App Secret');
  //   console.log('******************************');
  // }
  // else {
    //Configure spotify service
    //Configure spotify service
    ServiceConfiguration.configurations.update(
      { 'service': 'spotify' },
      {
        $set: {
          'clientId': Meteor.settings.client,
          'secret': Meteor.settings.clientSecret
        }
      },
      { upsert: true }
    );
  
});
