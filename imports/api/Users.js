
import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Users = new Mongo.Collection("Users");

if (Meteor.isServer) {
	Meteor.publish('Users', () => Users.find({}))
}
if (Meteor.isServer) {
Meteor.methods({
	'user.firstcomment': function(param){
		console.log(param);
		check(param.email, String);
		check(param.comment, String);

		let songs = [];
		songs.push(param.comment);
		let ids = [];
		ids.push(param.ids)
		Users.insert({
			email: param.email,
			song: songs,
			id: ids
		})
		let user = Users.find({ email: param.email }).fetch();
		return user[0];
	},
	'user.comment': function(param){
		console.log(param);
		check(param.email, String);
		
		const email = param.email;
		const user = Users.find({ email: email }).fetch();
		console.log("45" + user);
		let pre_id = user[0].id;
		let pre_song = user[0].song;
		pre_id.push(param.ids);
		pre_song.push(param.comment);
		Users.update(
			{ _id: user[0]._id },
			{
				$set: {
					 id: pre_id,
					 song: pre_song,
					 email: param.email
				}
			}	
		)
		let res = Users.find({ email: email }).fetch();
		return res[0];
	},
	'user.exist': function(email){
		console.log(email);
		check(param.email, String);
		const user = Users.find({ email: email }).fetch();
		console.log(user)
		console.log(user.length)
		if(user.length > 0){
			console.log("expected")
			return true;
		}
		return false;
	}
})

}