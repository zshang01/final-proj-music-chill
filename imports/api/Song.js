
import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Songs = new Mongo.Collection("Songs");
// song -> comments
if (Meteor.isServer) {
	Meteor.publish('Songs', () => Songs.find({}))


	Meteor.methods({
		'song.add': function(param){
		
			console.log(param.name)
			console.log(param.votes)
			console.log(param.comment)
			Songs.insert({
				createAt: Date.now(),
				name: param.name,
				votes: param.votes,
				comment: param.comment,
				num: param.comment.length
			});
			const song = Songs.find({ name: param.name }).fetch();
			console.log("28 in user.js in api ")
			console.log(song[0]);
			return song[0];
		},
		'song.addbyid': function(param){

			console.log(param);
			console.log(param.id)
			Songs.insert({
				createAt: Date.now(),
				name: param.name,
				votes: param.votes,
				comment: param.comment,
				id: param.id,
				rating: param.rating,
				score: param.score
			});
			// const id = param.id;
			// const song = Songs.find({ id: id }).fetch();
			// const pre_rating = song.rating;
			// const new_rating = pre_rating + param.rating;
			// const num_vote = song.votes;
			// const new_vote = num_vote + 1;
			// const new_score = new_rating / new_vote;
			// const new_comment = []
			// new_comment.push(param.comment)

			// Songs.insert({
			// 	name: param.name,
			// 	rating: new_rating,
			// 	votes: new_vote,
			// 	score: new_score,
			// 	id: id,
			// 	comment: new_comment
			// })
			let id = param.id;
			const res = Songs.find({ id: id }).fetch();
			return res;
		},
		'song.exist': function(name){
			const song = Songs.find({ name: name }).fetch();
			if(song.length > 0){
				return true;
			}
			return false;
		},
		'song.existbyid': function(id){
			console.log(id)
			const song = Songs.find({ id: id }).fetch();
			console.log("74" + song)
			console.log(song.length)

			if(song.length > 0){
				return true;
			}
			return false;
		},
		'song.updatebyid': function(param){
			console.log(param);
			let votes = param.votes;
			let comment = param.comment;
			let score = param.score;
			let rating = param.rating;
			let id = param.id;
			
			let song = Songs.find({ id: id}).fetch();
			Songs.update(
				{ _id: song[0]._id },
				{
					$set: {
						 votes: votes,
						 comment: comment,
						 score: score,
						 rating: rating
					}
				}	
			)
			let res = Songs.find({ id: id}).fetch();
			console.log(res[0]);
			return res[0];

		},
		'song.update': function(param){
			console.log(param);
			const name = param.name
			const votes = param.votes
			const comment = param.comment
			const song = Songs.find({ name: name }).fetch();
			Songs.update(
				{ _id: song[0]._id },
				{
					$set: {
						 votes: votes,
						 comment: comment,
						 num: comment.length
					}
				}	
			)
			console.log(song[0]);
			return song[0];
		},
		'song.display': function(){
			const songs = Songs.find().fetch();
			return songs;
		},
		'song.sortLike': function(){
			const songs = Songs.find({}, { limit: 5, sort: { votes: -1 }} ).fetch();
			return songs;
		},
		'song.sortComment': function(){
			const songs = Songs.find({}, { limit: 5, sort: { num: -1 }}).fetch();
			return songs;
		}
	})

}