import React from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';

import './styles.sass';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordRetype: '',
      isRegister: true,
      msgs: new Set()
    };
  };
  
  render = () => {
    return (
      <Form className="account">
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" required />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required />
        </Form.Group>
        {this.state.isRegister &&
          <Form.Group controlId="passwordRetype">
            <Form.Label>Retype Password</Form.Label>
            <Form.Control type="password" placeholder="Retype Password" required />
          </Form.Group>
        }
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    ); 
  }
  
}

export default Account;