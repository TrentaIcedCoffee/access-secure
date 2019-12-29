import React from 'react';

import {auth, db} from './firebase/';
import Account from './account/';
import Cards from './cards/';
import Navbar from './navbar';

import './styles.sass';

class Console extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.auth = auth;
    this.db = db;
    auth.onAuthStateChanged((user) => {
      this.setState({user: user});
    });
  }
  
  render = () => {
    return (
      <div>
        <Navbar user={this.state.user} auth={this.auth} />
        {this.state.user ? 
          <Cards user={this.state.user} db={this.db} auth={this.auth} />
          :
          <Account auth={auth} />
        }
      </div>
    );
  }
}

export default Console;