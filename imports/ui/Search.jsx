import React, { Component } from "react";
import Card from './Card.jsx';
import { Songs } from '../api/Song.js';
import { Users } from '../api/Users.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Input, Form, Grid } from "semantic-ui-react";
import {Row, Column} from 'react-foundation';
import "../../client/main.css";

import StarRatingComponent from 'react-star-rating-component';
class Search extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
			genres:["acoustic","afrobeat","alt-rock","alternative","ambient","anime","black-metal","bluegrass","blues",
					"bossanova","brazil","breakbeat","british","cantopop","chicago-house","children","chill","classical","club",
					"comedy","country","dance","dancehall","death-metal","deep-house","detroit-techno","disco","disney","drum-and-bass",
					"dub","dubstep","edm","electro","electronic","emo","folk","forro","french","funk","garage","german","gospel",
					"goth","grindcore","groove","grunge","guitar","happy","hard-rock","hardcore","hardstyle","heavy-metal",
					"hip-hop","holidays","honky-tonk","house","idm","indian","indie","indie-pop","industrial","iranian","j-dance",
					"j-idol","j-pop","j-rock","jazz","k-pop","kids","latin","latino","malay","mandopop","metal","metal-misc",
					"metalcore","minimal-techno","movies","mpb",
					"new-age","new-release","opera","pagode","party","philippines-opm","piano","pop","pop-film","post-dubstep","power-pop",
					"progressive-house","psych-rock","punk","punk-rock","r-n-b","rainy-day","reggae","reggaeton","road-trip","rock","rock-n-roll","rockabilly","romance",
					"sad","salsa","samba","sertanejo",
					"show-tunes","singer-songwriter","ska","sleep","songwriter","soul","soundtracks","spanish",
					"study","summer","swedish","synth-pop","tango","techno","trance","trip-hop","turkish","work-out","world-music"
  			],
  			url: null,
  			tracks: [],
  			value: 'acoustic',
  			found: false,
  			trackId: null,
  			input: '',
  			childvotes: 0,
  			childcomment: [],
  			src: "https://api.spotify.com/v1/artists/12Chz98pHFMPJEknJQMWvI",
  			popularity: 77,
  			release: 1995,
  			rating: 1,
  			songid: 0,
  			curcomment: "",
  			previewurl: ""

		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.textInput = null;

	    this.setText = element =>{
	    	this.textInput = element;
	    };

	}

	componentWillReceiveProps(){	
		console.log(this.state.tracks);
	    

	}
	


	handleChange(event) {
		event.preventDefault();
	    this.setState({value: event.target.value});
	  }


	handleSubmit(event) {
    	event.preventDefault();
		const genres = this.textInput.value;
		console.log(genres);
    	Meteor.call("search", genres, (err, data) => {
	    	if(err){
	    		console.log(err)
	    	}
	    	console.log("got data", data);
	    	console.log("got data", data.tracks);
	    	
	    	this.setState({
		    		//for(var i = 1; i < 11; i+=1){
			    tracks: data.tracks,
			    found: true,
			    input: this.textInput.value,
			    src: data.tracks.items[0].album.images[0].url,
			    popularity: data.tracks.items[0].album.release_date,
			    release: data.tracks.items[0].popularity,
			    songid: data.tracks.items[0].id,
			    previewurl: data.tracks.items[0].preview_url
			    	//console.log(response.data.tracks[i].name);
			    //}
	    	})
	    	console.log(this.state.tracks.items);
	    	for(var i = 0; i < this.state.tracks.items.length; i += 1){
	    		console.log(this.textInput.value);
	    		console.log(this.state.tracks.items[i].name)
				if(this.state.tracks.items[i].name == this.textInput.value){
					console.log(this.state.tracks.items[i].external_urls.spotify);
					this.setState({
						url: this.state.tracks.items[i].external_urls.spotify
						
					})
					console.log(this.state.url)
					break;
				}
			}

	    })

	    Meteor.call("song.exist", this.textInput.value, (err, exist) =>{
					console.log(exist)
					if(err) {
						alert(err);
					}
					if(exist){
						const n = this.textInput.value
						console.log("song existed");
						const song = Songs.find({ name: n }).fetch();
						const name = song[0].name
						const votes = song[0].votes
						const comment = song[0].comment
						
						this.setState({
							childvotes: votes,
							childcomment: comment
						})	
						console.log(this.state);
					}else{
						this.setState({
							childvotes: 0,
							childcomment: []
						})
					}
				}
			);

  	
  	}

  	onStarClick(nextValue, prevValue, name) {
	    this.setState({rating: nextValue});
	 }
	clickShare(){
		console.log(this.state.rating)
		console.log(Meteor.user().services.spotify.email)
		const curemail = Meteor.user().services.spotify.email
		let comment = document.getElementById("Text").value;
		this.setState({
			curcomment: comment
		})
		Meteor.call("song.existbyid", this.state.songid, (err, exist) =>{
					console.log(exist)
					if(err) {
						alert(err);
					}
					if(exist){
						
						let presong = Songs.find({ id: this.state.songid }).fetch();
						let precoment = presong[0].comment
						let prevotes = presong[0].votes;
						let new_score = presong[0].score + this.state.rating;
						let new_rating = (new_score) / (prevotes + 1);
						precoment.push(this.state.curcomment);
						const param = {
							name: this.state.input,
							rating: new_rating,
							votes: prevotes + 1,
							score: new_score,
							id: this.state.songid,
							comment: precoment
						}
						Meteor.call("song.updatebyid", param, (err, song)=>{
							if(err) alert(err)
							if(song){
								console.log(song)
							}
						})

					}else{
						
						let precoment = []
						let prevotes = 0
						let new_score = this.state.rating;
						let new_rating = (new_score) / (prevotes + 1);
						precoment.push(this.state.curcomment);
						const param = {
							name: this.state.input,
							rating: new_rating,
							votes: prevotes + 1,
							score: new_score,
							id: this.state.songid,
							comment: precoment
						}
						Meteor.call("song.addbyid", param, (err, song) =>{
							if(err) alert(err);
							if(song){
								console.log(song);
							}
						});
					}
				}
			);

		Meteor.call('user.exist', curemail, (err, exist) =>{
			console.log(exist);
			if(exist){
				const param = {
					ids: this.state.songid,
					email: Meteor.user().services.spotify.email,
					comment: this.state.curcomment
				}

				Meteor.call("user.comment", param, (err, user)=>{
					if(err) alert(err);
					if(user){
						console.log(user)
					}
				})
			}else{

				let precoment = []
				precoment.push(this.state.curcomment);

				const param = {
					ids: this.state.songid,
					email: Meteor.user().services.spotify.email,
					comment: precoment
				}
				Meteor.call("user.firstcomment", param, (err, user)=>{
					if(err) alert(err);
					if(user){
						console.log(user);
					}
				})
			}
		})
	}

	render(){
		const find = this.state.found;
		const url = this.state.uri
		const word = this.state.input
		const rating = this.state.rating;
		return(
			<div>
				<Grid centered>
				<Grid.Column width={11}>
				<br/>
				<br/>
				<br/>
				<h1>Search Bar</h1>
				<br/>
				<form onSubmit={this.handleSubmit} className="form-inline">
					<div className="row">
						<label>
						<select value={this.state.value} onChange={this.handleChange}>
						  <option value="acoustic">Acoustic</option>
						  <option value="breakbeat">Breakbeat</option>
						  <option value="guitar">Guitar</option>
						  <option value="songwriter">Songwriter</option>
						  <option value="holidays">Holidays</option>
						</select>
						
						<input
			                name="comment"
			                type="text"
			                ref={this.setText}
			                className="form-control col mr-3"
			                id="searchcomment"
			                size="100"
			                placeholder="Song Name"
			              />
			            <input type="submit" value="Search" id='submit-search'/>
			            </label>
					</div>
					
				</form>
	
				
				{
					find
					
					?
					
					<div>


						<br/>
						<br/>
						<br/>
						<Card name={word} email={this.props.email} votes={this.state.childvotes} 
							comment={this.state.childcomment} src={this.state.src} 
							release={this.state.release} popularity={this.state.popularity}
							previewurl={this.state.previewurl}
							/>

						 <div className="card">
						 	<h2>Your Rating: {this.state.rating}</h2>
				              <StarRatingComponent 
						          name="rate1" 
						          starCount={10}
						          value={this.state.rating}
						          onStarClick={this.onStarClick.bind(this)}
						        />
			            </div>

			            <div className="card">
		            		<div class="comment-block">
			                    <form action="">
			                      <textarea aria-label="Close" className="" id="Text" cols="105" rows="3" placeholder="Add comment..."></textarea>
			                    </form>
		                  	</div>
			            </div>


						<button type="submit"  className="btn btn-success green" onClick={this.clickShare.bind(this)}><i class="fa fa-share"></i> Submit</button>
			         </div>

					:

					
					<div>
						
							
		            </div>
				}

			</Grid.Column>
			</Grid>
			</div>

		);
	}



}

export default withTracker(() => {
  
  Meteor.subscribe("Songs");
  console.log("307")
  return {
    song: Songs.find({}).fetch()
  };
})(Search);