import React, { Component } from "react";
import Card from './Card.jsx';
import { Users } from '../api/Users.js';
import StarRatingComponent from 'react-star-rating-component';
import { Songs } from '../api/Song.js';
import "../../client/main.css";
export default class Recommend extends Component {
  
	constructor(props) {
    	super(props);
	    this.state = {
	    	tracks: [],
	    	sortBylike: false,
	    	sortByComments: false,
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
  			click: false,
  			currentid: 0,
  			previewurl: "",
  			year: 0,
  			name: "",
  			popularity: 0,
  			src: "",
  			rating: 1,
  			curcomment: "",
  			songid: 0

	    }
	    this.renderSong = this.renderSong.bind(this);
	    let num = Math.floor(Math.random() * this.state.genres.length)
  		Meteor.call("displayGenres", this.state.genres[num], (err, data) => {
	    	if(err){
	    		console.log(err)
	    	}
	    	console.log("got data", data);
	    	console.log("got data", data.tracks);
	    	
	    	this.setState({
		    		//for(var i = 1; i < 11; i+=1){
			    tracks: data.tracks
			    	//console.log(response.data.tracks[i].name);
			    //}
	    	})
	    	console.log(this.state.tracks)
	    })

  	}


	
	componentDidMount(){
  		
	    console.log("37 in genre checking the email is not undefine")
	    
  	}

  	Go(id){
  		this.setState({
  			click: true,
  			currentid: id
  		})
  		Meteor.call("searchSong", id, (err, song) =>{
  			console.log(song)
  			this.setState({
  				previewurl: song.preview_url,
	  			year: song.album.release_date,
	  			name: song.name,
	  			popularity: song.popularity,
	  			src: song.album.images[0].url,
	  			songid: song.id

  			})
  		})
  		console.log(id);
  	}
  	renderSong(){
  		
		return this.state.tracks.map((t, i) =>
			<div key={i}>
			{t.name}
			{"    "}
			<button type="submit" className="btn" onClick={this.Go.bind(this, t.id)}><i class="fa fa-share"></i> Go?</button>
			</div>
			);
	}
	Refresh(){
		console.log(78);
		let num = Math.floor(Math.random() * this.state.genres.length)
  		Meteor.call("displayGenres", this.state.genres[num], (err, data) => {
	    	if(err){
	    		console.log(err)
	    	}
	    	console.log("got data", data);
	    	console.log("got data", data.tracks);
	    	
	    	this.setState({
		    		//for(var i = 1; i < 11; i+=1){
			    tracks: data.tracks
			    	//console.log(response.data.tracks[i].name);
			    //}
	    	})
	    	console.log(this.state.tracks)
	    })
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
							name: this.state.name,
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
							name: this.state.name,
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
  render() {
  	let ifclick = this.state.click;
  	console.log(ifclick)
    return (
      <div>
      			<div className="container" >
      					<h1>Recommend Song For You</h1>
		    			<div className="row">
				    		<div className="col-md-6 col-md-offset-3">
        						<button type="submit" className="btn" onClick={this.Refresh.bind(this)}><i className="fa fa-share"></i> Refresh</button>
       							<br/>
       							<br/>
       							{this.renderSong()}

						    </div>
						    <div className="col-md-3">
						    {
								ifclick 
								
								?
								<div>
								
								<br/>
											<br/>
											<br/>
											<Card name={this.state.name} email={this.state.email} votes={this.state.childvotes} 
												comment={this.state.childcomment} src={this.state.src} 
												release={this.state.year} popularity={this.state.popularity}
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
								                      <textarea className="" id="Text" cols="33" rows="3" placeholder="Add comment..."></textarea>
								                    </form>
							                  	</div>
								            </div>


											<button type="submit" id='submit-but-share' className="btn btn-success green" onClick={this.clickShare.bind(this)}><i class="fa fa-share"></i> Submit</button>
								</div>
								:
									
								<div>
								</div>

   								}

						    </div>
						</div>
				</div>
   		
   		
        
      </div>
    );
  }
}
