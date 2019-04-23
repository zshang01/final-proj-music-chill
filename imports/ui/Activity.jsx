import React, { Component } from "react";
import { withTracker } from 'meteor/react-meteor-data';
import { Users } from '../api/Users.js';
import ActivityCard from './ActivityCard.jsx';
class Activity extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			activity: this.props.users
		}
		console.log(Meteor.user())
		this.renderFive = this.renderFive.bind(this);

	}

	
	componentDidMount(){
    	
  	}

	renderFive(){
		console.log(this.props.users[0])
		if(typeof this.props.users[0] != 'undefined'){
			console.log(this.props.users[0].id)
			return this.props.users[0].id.slice(-5).map((c,i) => 
			<div key={i}>
	    		<ActivityCard id={c}/>
	    		<br/>
	    		<br/>
			</div>
			)
		}
		
	}
	render(){
		return(
			<div>
				{this.renderFive()}
			</div>
		)
	}

}
export default withTracker(() => {
  Meteor.subscribe("Users");
  console.log(Meteor.user())
  if(Meteor.user()){
  	return {
    	users: Users.find({ email: Meteor.user().services.spotify.email }).fetch()
  	};
  }
  return {
  	
  }
  

})(Activity);