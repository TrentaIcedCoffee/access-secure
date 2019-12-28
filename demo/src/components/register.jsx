import React from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';

import './styles.sass';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordRetype: '',
      msgs: new Set()
    };
  }
  
  /* FROM PARENT:
    firebase, 
    isRegisterRendered, 
    closeRegister, 
    registerCallback 
  */

  inputChange = (e) => {
    this.setState({[e.target.id]: e.target.value});
  }
  
  isInvalidForm = () => {
    return this.state.email === '' || 
        this.state.password === '' || 
        this.state.passwordRetype === '' ||
        this.state.password !== this.state.passwordRetype;
  }
  
  onSubmit = () => {
    const {email, password} = this.state;
    this.props.firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(this.props.registerCallback)
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
      <Modal show={this.props.isRegisterRendered} onHide={this.props.closeRegister}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
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
            <Form.Group controlId="passwordRetype">
              <Form.Label>Retype Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Retype Password"
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
          <Button variant="secondary" onClick={this.props.closeRegister}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={this.isInvalidForm()} 
            onClick={this.onSubmit}
          >
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Register;