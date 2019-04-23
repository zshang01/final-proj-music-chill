
import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Users = new Mongo.Collection("Users");

if (Meteor.isServer) {
	Meteor.publish('Users', () => Users.find({}))
}
if (Meteor.isServer) {
Meteor.methods({
	'user.signup': function(param){
		
		Users.insert({
			createAt: Date.now(),
			name: param.username,
			email: param.email,
			password: param.password,
			history:[]
		});
		const user = Users.find({}).fetch();
		
		
		return user[0];
	},
	'user.firstcomment': function(param){
		console.log(param);
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
		const user = Users.find({ email: email }).fetch();
		console.log(user)
		console.log(user.length)
		if(user.length > 0){
			console.log("expected")
			return true;
		}
		return false;
	},
	'user.login': function(param){

		const email = param.email
		const password = param.password
		const res = Users.find({ email: email }).fetch();
		if(res.length > 0){
			let found = false;
			
			
			console.log(res);
			console.log(res[0].email);
			console.log(res[0].email === email);
			if(res[0].email == email && password == res[0].password){
				found = true;
			}
			if(found){
				const user = {
					success: found,
					email: res[0].email
				}
				return user;
			}
		}
		
		return {
			success: false,
			email: ""
		}
		
	},
	'user.commentttt': function(param){
		console.log("server side")
		const email = param.email
		
		const name = param.name
		
		const user = Users.find({ email: email }).fetch();
		
		const pre = user[0].history;
		
		pre.push(name);
		const unique = Array.from(new Set(pre))
		
		Users.update(
			{ _id: user[0]._id },
			{
				$set: {
					 history: unique
				}
			}	
		)
		
		return user[0];
	},
	'user.lastFive': function(email){
		const user = Users.find({ email: email }).fetch();
		const res = []
		for(var i = 0; i < user[0].history.length; i += 1){
			res.push(user[0].history[i])
			if(res.length == 5) break;
		}
		return res
	}
})

}