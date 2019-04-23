import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
const base64 = require('base-64');
const queryStr = require('querystring');
import axios from 'axios';

if(Meteor.isServer){
	Meteor.methods({
		"displayGenres"(genres1){
			//const genres1 = genres1;
		    const getGenre = "BQDgmYLDK9S_Db5cHri77qaCQYZaEpB7wgsPvi_gnsBNBvkGumyXpG4knD6-jkzQ6BUl9jEuHCgVE-_0SgW4436F5I1MIB1oz_vdAnYtljwjNg67HlT_0x0rGLMgA1nnY92Od75Zxe7-zPpAipjxuEzqgvORyVOLoQgVyTau-N3XMOoal4j270enzKqlj2sJ"
		    console.log(genres1)

		    return new Promise((resolve, reject) => {
		    	axios.get(`https://api.spotify.com/v1/recommendations?limit=10&seed_genres=${genres1}`, {
		      
			      headers: {
			        Accept: 'application/json',
			        'Content-Type': 'application/json',
			        Authorization: `Bearer ${Meteor.user().services.spotify.accessToken}}`

			      }
		    	})
		    	.then(response => resolve(response.data) /*Return the requested data*/)
		      .catch(err => {
		        //If access token expired, refresh it and try again        
		        if (err.response.data.error.message === 'The access token expired') {
		          console.log('Access token expired, refreshing access token...');
		          Spotify.refreshAccessToken()
		            //Access token successfully refreshed
		            .then(new_access_token => Spotify.getTopTracks(new_access_token, type, limit, time_range))
		            //Successful retry
		            .then(data => resolve(data))
		            //Error refreshing or retrying
		            .catch(err => { console.log('Error retrying to refresh access token'); reject(err); });
		        }
		        else {
		          reject(err);
		        }
				})
		  })
	}}),
	Spotify.refreshAccessToken = (userId=undefined) => {
	  return new Promise( (resolve, reject) => {
	    let rToken = null;
	    if(userId){
	      //TODO Complete for custom userId
	      reject(console.log('[ERROR] NOT IMPLEMENTED FOR CUSTOM ID'));      
	    }
	    else{
	      rToken = Meteor.user().services.spotify.refreshToken;
	    }
	    const body = {
	      grant_type: 'refresh_token',
	      refresh_token: rToken
	    };

	    axios.post('https://accounts.spotify.com/api/token', queryStr.stringify(body), {
	      headers:{
	        'content-type': 'application/x-www-form-urlencoded',
	        'Content-Type': 'application/x-www-form-urlencoded',
	        Authorization: `Basic ${base64.encode(`${ Meteor.settings.client }:${Meteor.settings.clientSecret}`)}`
	      }
	    }).then( response => {
	      Meteor.users.update( { _id: Meteor.user()._id}, { $set : {
	        'services.spotify.accessToken' : response.data.access_token,
	        'services.spotify.scope' : response.data.scope,
	        'services.spotify.expiresAt' : Date.now() + 1000*response.data.scope
	      }});
	      console.log('Access token successfully refreshed.');
	      console.log(response.data.access_token)
	      resolve(response.data.access_token);
	    }).catch( err => {
	      console.log('Error refreshing access token');      
	      reject(err);      
	    });
	  });
	},
	//https://api.spotify.com/v1/tracks/{id}

	Meteor.methods({
		"search"(genres1){
			//const genres1 = genres1;
		    const getGenre = "BQDgmYLDK9S_Db5cHri77qaCQYZaEpB7wgsPvi_gnsBNBvkGumyXpG4knD6-jkzQ6BUl9jEuHCgVE-_0SgW4436F5I1MIB1oz_vdAnYtljwjNg67HlT_0x0rGLMgA1nnY92Od75Zxe7-zPpAipjxuEzqgvORyVOLoQgVyTau-N3XMOoal4j270enzKqlj2sJ"
		    console.log(genres1)
		    const tmp = genres1.toString().split(" ");
		    const input = tmp.toString().replace(" ", "\%20");
		    console.log(input)
		    return new Promise((resolve, reject) => {
		    	axios.get(`https://api.spotify.com/v1/search?q=${genres1}&type=track`, {
		      
			      headers: {
			        Accept: 'application/json',
			        'Content-Type': 'application/json',
			        Authorization: `Bearer ${Meteor.user().services.spotify.accessToken}}`
			      }
		    	})
		    	.then(response => resolve(response.data) /*Return the requested data*/)
		      .catch(err => {
		        //If access token expired, refresh it and try again        
		        if (err.response.data.error.message === 'The access token expired') {
		          console.log('Access token expired, refreshing access token...');
		          Spotify.refreshAccessToken()
		            //Access token successfully refreshed
		            .then(new_access_token => Spotify.getTopTracks(new_access_token, type, limit, time_range))
		            //Successful retry
		            .then(data => resolve(data))
		            //Error refreshing or retrying
		            .catch(err => { console.log('Error retrying to refresh access token'); reject(err); });
		        }
		        else {
		          reject(err);
		        }
				})
		  })
	}}),
	Meteor.methods({
		"searchSong"(id){
			console.log(id)
		    return new Promise((resolve, reject) => {
		    	axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
			      headers: {
			        Accept: 'application/json',
			        'Content-Type': 'application/json',
			        Authorization: `Bearer ${Meteor.user().services.spotify.accessToken}}`
			      }
		    	})
		    	.then(response => resolve(response.data) /*Return the requested data*/)
		      .catch(err => {
		        //If access token expired, refresh it and try again        
		        if (err.response.data.error.message === 'The access token expired') {
		          console.log('Access token expired, refreshing access token...');
		          Spotify.refreshAccessToken()
		            //Access token successfully refreshed
		            .then(new_access_token => Spotify.getTopTracks(new_access_token, type, limit, time_range))
		            //Successful retry
		            .then(data => resolve(data))
		            //Error refreshing or retrying
		            .catch(err => { console.log('Error retrying to refresh access token'); reject(err); });
		        }
		        else {
		          reject(err);
		        }
				})
		  })
		}})	
}