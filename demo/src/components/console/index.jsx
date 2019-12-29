import React from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';

import firebase from './firebase/';
import Account from './account';
import UI from './ui';

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
      <UI firebase={this.firebase} />
      : 
      <Account firebase={this.firebase} />;  
  }
}

export default Console;