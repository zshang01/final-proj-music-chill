import React, { Component } from "react";
import { withTracker } from 'meteor/react-meteor-data';
import { Users } from '../api/Users.js';
import { Input, Form, Grid } from "semantic-ui-react";
import {Row, Column} from 'react-foundation';

export default class ActivityCard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: "",
			popularity: 0,
			url: "",
			year: 0
		}
		
		this.fetch = this.fetch.bind(this);
		this.fetch(this.props.id);

	}


	fetch(id){
		Meteor.call("searchSong", id, (err, song)=>{
			if(err) alert(err);
			if(song){
				
				this.setState({	
					name: song.name,
					popularity: song.popularity,
					url: song.album.images[0].url,
					year: song.release_date
				})
			}
		})
	}


	render(){
		return(
			<div className="card">
				<Grid centered>
        		<div className="comment-block">
                    
                    

	                    <h2>{this.state.name}</h2>
	                    <h2>{this.state.popularity}</h2>
	                    <h2>{this.state.year}</h2>
	                    <img src={this.state.url} />
                    
              	</div>
              	</Grid>
            </div>
		)
	}

}