import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
//import Footer from "./Footer.js";
//import Header from "./Header.js";
//import LandingPage from './LandingPage.jsx';
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "../style/app.css";
import Homepage from './Homepage.jsx'
import { Container } from "semantic-ui-react";
import Hello from './Hello.jsx';
import "../../client/main.css";
import Landing from './Landing.jsx';
import Search from './Search.jsx';
import Activity from './Activity.jsx';
import Recommend from './Recommend.jsx'

  

export default class App extends Component {
  constructor(props) {
    super(props);
	
    this.state = {
      loading: false,
      login: false
    };
    this.getData = this.getData.bind(this)
  }

  getData(val){
    const pre = this.state.login;
    console.log(val)
    this.setState({
    	login: val
    })

  }

  render() {
  	const login = this.state.login;

  	const HomeComponent = (props) => {
	  return (
	    <div className="container text-center">
	      <Homepage {...props}/>
	    </div>
	  );
	};


	


	const AboutComponent = () => (
	  <div className="container text-center">
	  		<h1>About Music Chill</h1>
			<p>
				The Music Chill is a music plateform for music lover to share
				their common interest and make friends. 
			</p>
			<p>
				It is founded in NEU web developlment class in 2019.
			</p>
		</div>
	);

	const NotFoundPage = () => (
	  <div className="container text-center">
	    <h2>Page not found</h2>
	  </div>
	);




	const PrivateRoute = ({ component: Component, ...rest }) =>(
		<Route
	      {...rest}
	      render={(props) =>
	        Meteor.userId() ? (
	          <Component {...props} />
	        ) : (
	          <Redirect
	            to='/about'
	          />
	        )
	      }
	    />
	)
    return (
      <Router>
      		<div id='app' role='main'>
          	<NavBar sendData={this.getData} isLogIn={this.state.login}/>
	          <Switch>
	            <Route exact path="/" component={Homepage} />
	            <Route exact path="/about" component={AboutComponent} />
	            <Route exact path="/landing" component={Landing} />
	            <PrivateRoute exact path="/search" component={Search} />
	            <PrivateRoute exact path="/recommend" component={Recommend} />
	            <PrivateRoute exact path="/activity" component={Activity} />
	            <Route component={NotFoundPage} />
	          </Switch>
          	<Footer />
          	</div>
      </Router>
    );
  }
}


