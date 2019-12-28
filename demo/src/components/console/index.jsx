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
  };
  
  render = () => {
    return this.state.user ? <Account /> : <div></div>;
  }
}

export default Console;