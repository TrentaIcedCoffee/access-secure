import React from 'react';
import { connect } from 'react-redux';

import {
  login,
  redirect,
  register,
  toLogin,
  toRegister,
  authChangeInput,
  dropAuthError,
} from '../actions/';

import { Form, Button, Alert } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.sass';

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    authPage: state.auth.authPage,
    email: state.auth.email,
    password: state.auth.password,
    passwordRe: state.auth.passwordRe,
    errors: state.auth.errors,
  };
};

const mapDispatchToProps = dispatch => ({
  redirect: path => dispatch(redirect(path)),
  login: (email, password) => dispatch(login(email, password)),
  register: (email, password, passwordRe) => (
    dispatch(register(email, password, passwordRe))
  ),
  toLogin: () => dispatch(toLogin()),
  toRegister: () => dispatch(toRegister()),
  changeInput: (key, val) => dispatch(authChangeInput(key, val)),
  dropAuthError: idx => dispatch(dropAuthError(idx)),
});

class Auth extends React.Component {
  
  render = () => {
    const {
      user, authPage, errors, email, password, passwordRe,
    } = this.props;
    const {
      redirect, login, register, toLogin, toRegister, changeInput,
      dropAuthError
    } = this.props;
    if (user) {
      redirect('/console');
    }
    return (
      <div className="auth">
        <div className="mid">
          <Form>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email" placeholder="Enter email" value={email} 
                onChange={e => changeInput('email', e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password" placeholder="Password" value={password}
                onChange={e => changeInput('password', e.target.value)}
              />
            </Form.Group>
            {authPage === 'register' &&
              <Form.Group>
                <Form.Label>Retype Password</Form.Label>
                <Form.Control
                  type="password" placeholder="Retype Password"
                  value={passwordRe}
                  onChange={e => changeInput('passwordRe', e.target.value)}
                />
              </Form.Group>
            }
            <Button
              variant="primary"
              onClick={
                authPage === 'register' ?
                () => register(email, password, passwordRe) :
                () => login(email, password)
              }
            >
              {authPage === 'register' ? 'Register' : 'Login'}
            </Button>
            <Button
              variant="outline-info"
              onClick={authPage === 'register' ? toLogin : toRegister}
            >
              {authPage === 'register' ? 'To Login' : 'To Register'}
            </Button>
          </Form>
          <div>
            {errors.map((msg, idx) => (
              <Alert
                key={idx} variant="danger" dismissible
                onClose={() => dropAuthError(idx)}
              >
                {msg}
              </Alert>
            ))}
          </div>
        </div>
      </div>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);