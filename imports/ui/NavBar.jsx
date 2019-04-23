import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Login } from './Login.jsx';
import { Users } from '../api/Users.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Redirect } from "react-router-dom";
import "../../client/main.css";
class NavBar extends Component {


  constructor(props) {
    super(props);

    this.state = {
      login: false,
      useremail: ""
    }
    this.getData = this.getData.bind(this)
    this.send = this.send.bind(this)

  }

  getData(val){
    const pre = this.state.login;
    console.log(val)
    this.setState({
      useremail: val,
      login: true
    })
    this.send();
  }

  send(){
    this.props.sendData(this.state.login);
  }
  logout(){
    console.log(Meteor.userId())
    Meteor.users.remove({ _id: Meteor.userId() });
    <Redirect to="/" />;
    Meteor.logout((err) => {
      if(err) {
        console.log(err.reason);
      }

    });

  }

  render() {
    const login = this.state.login;
    console.log(Meteor.userId())
    return (
      <div className="" id="navbar">
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            
            

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/landing"
                  >
                    Discussion
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/about"
                  >
                    About
                  </NavLink>
                </li>
              </ul>
               <div className="md-form my-0">
                {

                  Meteor.userId()


                  ?

                  <span>
                      <Dropdown role="menu">
                      <DropdownButton title="Member privilage" id="dropdown-but">
                      <LinkContainer to="/search">
                        <Dropdown.Item as="button" role="menuitem">
                          SearchBar
                        </Dropdown.Item>
                      </LinkContainer>


                      <LinkContainer to="/recommend">
                        <Dropdown.Item as="button" role="menuitem">
                          Get Recommend
                        </Dropdown.Item>
                      </LinkContainer>             
                      <LinkContainer to="/activity">
                        <Dropdown.Item as="button" role="menuitem">
                          Activity
                        </Dropdown.Item>
                      </LinkContainer>                  
                      </DropdownButton>
                      </Dropdown>
                  <button type="submit" className="btn" onClick={this.logout.bind(this)}><i class="fa fa-share"></i> LogOut</button>
                  
                </span>
                  :
                  <div>
                  {<Login />}
                  </div>

                }
                
                </div>
              
              
            </div>
          </div>
        </nav>
        
      </div>
    );
  }
}
export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(NavBar);
