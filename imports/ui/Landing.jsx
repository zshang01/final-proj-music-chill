import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Songs } from '../api/Song.js';
import Box from 'react-styled-box';
import Card from 'react-bootstrap/Card';
import { Input, Form, Grid } from "semantic-ui-react";
import { Image, Icon } from "semantic-ui-react";

class Landing extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	renderIncrement: false,
	    	renderDecrement: false,
	    	renderName: false
	    }

	}

	rankingIncrement(){
		return this.props.song.slice(0, 10).sort((a,b) => (a.rating - b.rating)).map( (c,i) => 
			
			<div key={i}>
			
	   			<Card border="primary" style={{ width: '18rem' }}>
	   			<Card.Header>
	   				<Grid.Row>
	   				<Grid.Column width={4}>{c.name}</Grid.Column>                
				    <Grid.Column width={4}>
				      <Image alt='stars' src='/stars.png' width="20" height="20">
				      	
				      </Image>
				    </Grid.Column>
				    <Grid.Column width={4}>
				    	{c.rating}
				    </Grid.Column>
				    </Grid.Row>
	   			</Card.Header>
	   				
					<Card.Text>
						Comments:
						<br/>

				        {c.comment.map( (d,i) => 
				        	<ul>
				        	<li key={i} >
				        		{d}
				        	</li>
				        	</ul>
				        	
				        )}
			     	</Card.Text>
				</Card>
  				<br />
			</div>
	)}
	rankingDecrement(){
		return this.props.song.slice(0, 10).sort((a,b) => (b.rating - a.rating)).map( (c,i) => 
			
			<div key={i}>
			
	   			<Card border="primary" style={{ width: '18rem' }}>
	   			<Card.Header>
	   				<Grid.Row>
	   				<Grid.Column width={4}>{c.name}</Grid.Column>                
				    <Grid.Column width={4}>
				      <Image alt='stars' src='/stars.png' width="20" height="20">
				      	
				      </Image>
				    </Grid.Column>
				    <Grid.Column width={4}>
				    	{c.rating}
				    </Grid.Column>
				    </Grid.Row>
	   			</Card.Header>
	   				
					<Card.Text>
						Comments:
						<br/>

				        {c.comment.map( (d,i) => 
				        	<ul>
				        	<li key={i}>
				        		{d}
				        	</li>
				        	</ul>
				        	
				        )}
			     	</Card.Text>
				</Card>
  				<br />
			</div>
	)}
	rankingByName(){
		
		return this.props.song.slice(0, 10).sort((a,b) => (b.name - a.name)).map( (c,i) => 
			
			<div key={i}>
			
	   			<Card border="primary" style={{ width: '18rem' }}>
	   			<Card.Header>
	   				<Grid.Row>
	   				<Grid.Column width={4}>{c.name}</Grid.Column>                
				    <Grid.Column width={4}>
				      <Image alt='stars' src='/stars.png' width="20" height="20">
				      	
				      </Image>
				    </Grid.Column>
				    <Grid.Column width={4}>
				    	{c.rating}
				    </Grid.Column>
				    </Grid.Row>
	   			</Card.Header>
	   				
					<Card.Text>
						Comments:
						<br/>

				        {c.comment.map( (d,i) => 
				        	<ul>
				        	<li key={i}>
				        		{d}
				        	</li>
				        	</ul>
				        )}
			     	</Card.Text>
				</Card>
  				<br />
			</div>
			
	)}

	renderSongs(){
		return this.props.song.slice(0, 10).map( (c,i) => 
			
			<div key={i}>
			
	   			<Card border="primary" style={{ width: '18rem' }}>
	   			<Card.Header>
	   				<Grid.Row>
	   				<Grid.Column width={4}>{c.name}</Grid.Column>                
				    <Grid.Column width={4}>
				      <Image alt='stars' src='/stars.png' width="20" height="20">
				      	
				      </Image>
				    </Grid.Column>
				    <Grid.Column width={4}>
				    	{c.rating}
				    </Grid.Column>
				    </Grid.Row>
	   			</Card.Header>
	   				
					<Card.Text>
						Comments:
						<br/>

				        {c.comment.map( (d,i) => 
				        	<ul>
				        	<li key={i}>
				        		{d}
				        	</li>
				        	</ul>
				        )}
			     	</Card.Text>
				</Card>
  				<br />
			</div>
			
				
	)}
	
	changeIncrement(){
		this.setState({
			renderIncrement: true,
			renderDecrement: false
		})
	}
	changeDecrement(){
		this.setState({
			renderIncrement: false,
			renderDecrement: true
		})
	}
	
	render() {
		const increment = this.state.renderIncrement;
		const decrement = this.state.renderDecrement;
		
	    return (
	    	<div className="bg-light border rounded">
			
			<div className="container">
		    	<h1>Latest Discussion</h1>
		    	<div class="row">
				    <div class="col-md-6 col-md-offset-3">

						<button type="submit" className="btn" onClick={this.changeIncrement.bind(this)}><i className="fa fa-share"></i> From Lowest Rating To Highest</button>
			    		<button type="submit" className="btn" onClick={this.changeDecrement.bind(this)}><i className="fa fa-share"></i> From Highest Rating To Lowest</button>
				    </div>
				</div>
			</div>
	    		
		    <div className="container">	
		    		<div class="row">
				    <div class="col-md-6 col-md-offset-3">
	    		{
					increment

					?
					this.rankingIncrement()
					: 

					(
					decrement

					?

					this.rankingDecrement()

					:
					
					this.renderSongs()

					)

	    		}
	    		
	    		</div>
				</div>
	    	</div>
	            
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
})(Landing);
