import React from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';

import firebase from './firebase/';
import Account from './account';

import './styles.sass';

class Console extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.firebase = firebase;
    this.firebase.auth().onAuthStateChanged((user) => {
      this.setState({user: user});
    });
  }
  
  render = () => {
    return this.state.user ? 
      <div>Logged In</div>
      : 
      <Account firebase={this.firebase} />;  
  }
}

export default Console;