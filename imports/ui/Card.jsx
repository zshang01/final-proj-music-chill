import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import { Songs } from '../api/Song.js'
import { Users } from '../api/Users.js';
import { Input, Form, Grid } from "semantic-ui-react";

class Card extends Component {


	constructor(props) {
		super(props);

		this.state = {
			track: [],
			name: this.props.name,
			votes: this.props.votes,
			comment:this.props.comment,
			email: this.props.email,
			display: false
		};

		
	}


				

	

	render(){
		const display = this.state.display
		const commentOn = this.state.seeCommentOn;
		return(
			<div>
				
				<Grid centered>
					<h1>{this.props.word}</h1>

					<img src={this.props.src} />
			    
				    
				    <br/>
					<h4>Release Date: {this.props.release}</h4>
					<br/>
					<h4>Popularity: {this.props.popularity}</h4>
					<br/>
					{this.props.previewurl !== null ? <audio controls src={this.props.previewurl}></audio> : "preview not available"}
			    
				
				</Grid>
			
 
		        

			</div>

		)
	}
}
export default withTracker(() => {
  Meteor.subscribe("Users");
  Meteor.subscribe("Songs");
  
  return {
    user: Users.find({}).fetch(),
    song: Songs.find({}).fetch()
  };
})(Card);