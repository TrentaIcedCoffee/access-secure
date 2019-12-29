import React from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import logo from "./logos/login_logo.png"

import './styles.sass';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordRetype: '',
      isRegister: false,
      msgs: []
    };
  }
  
  /* FROM PARENT
    auth
  */
  
  appendMsgs = (msg) => {
    this.setState({
      msgs: this.state.msgs.concat(msg)
    }, () => {setTimeout(() => {
      this.setState({
        msgs: this.state.msgs.splice(1, this.state.msgs.length-1)
      });
    }, 1000)});
  }
  
  onInputChange = (e) => {
    this.setState({[e.target.id]: e.target.value});
  }
  
  isValidForm = () => {
    const {email, password, passwordRetype} = this.state;
    if (email === '') {
      this.appendMsgs('email required');
    } else if (!email.includes('@')) {
      this.appendMsgs('email bad format');
    }
    if (password === '') {
      this.appendMsgs('password required');
    }
    if (this.state.isRegister) {
      if (password !== passwordRetype) {
        this.appendMsgs('passwords not match');
      }
      return email.includes('@') && email !== '' && password !== '' && 
        passwordRetype !== '' && password === passwordRetype;
    } else {
      return email.includes('@') && email !== '' && password !== '';
    }
  }
  
  onFormSubmit = () => {
    const {email, password} = this.state;
    if (!this.isValidForm()) {
      return
    }
    if (this.state.isRegister) {
      this.props.auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {})
        .catch(err => {
          this.appendMsgs(err.message);
        });
    } else {
      this.props.auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {})
        .catch(err => {
          this.appendMsgs(err.message);
        });
    }
  }
  
  onRmMsg = (msgToRm) => {
    this.setState({
      msgs: this.state.msgs.filter(msg => msg !== msgToRm)
    });
  } 
  
  render = () => {
    return (
      <Form className="account">
        <Form.Group controlId="Logo">
          <img src={logo} class="img-fluid" alt="Logo image" className="logo"/>
        </Form.Group>
        <Form.Group controlId="email" className="text">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={this.state.email}
            onChange={this.onInputChange}
          />
        </Form.Group>
        <Form.Group controlId="password" className="text">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onInputChange}
          />
        </Form.Group>
        {this.state.isRegister &&
          <Form.Group controlId="passwordRetype" className="text">
            <Form.Label>Retype Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Retype Password"
              value={this.state.passwordRetype}
              onChange={this.onInputChange}
            />
          </Form.Group>
        }
        <Button variant="primary" onClick={() => this.onFormSubmit()}>
          {this.state.isRegister ? "Register" : "Login"}
        </Button>
        {this.state.isRegister ? 
          <Button
            variant="link"
            onClick={() => this.setState({isRegister: false})}
          >
            To Login
          </Button>
          :
          <Button
            variant="link"
            onClick={() => this.setState({isRegister: true})}
          >
            To register
          </Button>
        }
        {this.state.msgs.map(((msg, idx) => (
          <Alert key={idx} variant="danger">{msg}</Alert>
        )))}
      </Form>
    ); 
  }
  
}

export default Account;