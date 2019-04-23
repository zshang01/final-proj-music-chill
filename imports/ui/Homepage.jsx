import React, { Component }from "react";
import { Image, Icon } from "semantic-ui-react";
import { Meteor } from 'meteor/meteor';
import Instruction from './Instruction.jsx';

export default class HomePage extends React.Component {
	

	constructor(props) {
    	super(props);
    	this.state = {
	    	loading: false,
	    	time: Date.now()
	    };
	    this.redirect = this.redirect.bind(this);
	}

	signIn() {
	    var options = {
	      showDialog: true, // Whether or not to force the user to approve the app again if they’ve already done so.
	      requestPermissions: ['user-read-email', 'user-top-read', 'playlist-modify-private', 'playlist-modify-public', 'playlist-read-private', 'playlist-read-collaborative']
	    };
	    Meteor.loginWithSpotify(options, function (err) {
	      console.log(err || 'No error');
	    });
	    console.log(Meteor.user());
	    console.log(Meteor.user().services.spotify.accessToken);
  	}

  	onClick(){
  		const pre = this.state.loading
  		this.setState({
  			loading: !pre
  		})
  	}

  	redirect(){
  		return this.props.history.push("/landing");
  	}

	handleClick(){
  		this.signIn();
  		this.onClick();
  		this.redirect();
  	}




	render() {
		return (
			<div id="homapage" role="form">
				<div style={{display: 'flex', justifyContent: 'center'}}>
				<h1 >Welcome to Music Chill!</h1>
				</div>
				<div style={{display: 'flex', justifyContent: 'center'}}>
				<p id="introduction">
					Do you have the feeling 
					that you really like a song but have no one 
					to communicate or disscuss with? <br />
					Trust Me! You are at the right place. 
					<br/><br/>
					
				</p>
				<br/>
				</div>
				<div style={{display: 'flex', justifyContent: 'center'}}>
				<Image src="/background.png" alt="background" /><br/>	
				</div>
				<div style={{display: 'flex', justifyContent: 'center'}}>
				
				<h2>Acknowleagement:</h2>
				</div>
				<div style={{display: 'flex', justifyContent: 'center'}}>
				<p> This Webpage may access to your spotify account</p>	
				<br/>
				</div>
				<div>
		          <Instruction />
				</div>		
			</div>

		);
	}
}