import React from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';

import './styles.sass';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      msgs: new Set()
    };
  };
  
  /* FROM PARENT:
    firebase, 
    isLoginRendered, 
    closeLogin, 
    loginCallback 
  */

  inputChange = (e) => {
    this.setState({[e.target.id]: e.target.value});
  };
  
  isInvalidForm = () => {
    return this.state.email === '' || this.state.password === ''; 
  }
  
  onSubmit = () => {
    const {email, password} = this.state;
    this.props.firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.props.loginCallback)
      .catch(err => {
        this.setState({msgs: new Set([...this.state.msgs, err.message])});
      });
  }
  
  rmFromMsgs = (msgToRm) => {
    this.setState({
      msgs: new Set([...this.state.msgs].filter(msg => msg !== msgToRm))
    });
  }
  
  render() {
    return (
      <Modal show={this.props.isLoginRendered} onHide={this.props.closeLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={this.inputChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={this.inputChange}
              />
            </Form.Group>
          </Form>
          <div>
            {[...this.state.msgs].map((msg, idx) => (
              <Alert
                variant="danger"
                key={idx} 
                onClose={() => this.rmFromMsgs(msg)} 
                dismissible
              >
                <Alert.Heading>{msg}</Alert.Heading>
              </Alert>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.closeLogin}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={this.isInvalidForm()} 
            onClick={this.onSubmit}
          >
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
}

export default Login;