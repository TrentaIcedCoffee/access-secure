import React from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';

import {auth, db} from './firebase/';
import Account from './account';
import Cards from './cards';

import './styles.sass';

class Console extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.auth = auth;
    auth.onAuthStateChanged((user) => {
      this.setState({user: user});
    });
  }
  
  render = () => {
    return this.state.user ? 
      <Cards auth={auth} db={db} />
      : 
      <Account auth={auth} />;  
  }
}

export default Console;