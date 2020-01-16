import { auth, db } from '../funcs/firebase';
import { push } from 'connected-react-router'

export const redirect = path => dispatch => {
  dispatch(push(path));
};

export const setUser = user => {
  return {
    type: 'SET_USER',
    payload: { user },
  };
};

export const login = (email, password) => {
  return dispatch => {
    auth.signInWithEmailAndPassword(email, password)
      .then()
      .catch(err => dispatch({
        type: 'NEW_AUTH_ERROR',
        payload: { error: err.message },
      }));
  };
};

export const logout = () => dispath => {
  auth.signOut();
};

export const register = (email, password, passwordRe) => {
  if (password !== passwordRe) {
    return {
      type: 'NEW_AUTH_ERROR',
      payload: { error: 'password retype not match' },
    };
  }
  return dispatch => {
    auth.createUserWithEmailAndPassword(email, password)
      .then()
      .catch(err => dispatch({
        type: 'NEW_AUTH_ERROR',
        payload: { error: err.message },
      }));
  };
};

export const toLogin = () => {
  return {
    type: 'TO_LOGIN',
    payload: {},
  };
};

export const toRegister = () => ({
  type: 'TO_REGISTER',
  payload: {},
});

export const authChangeInput = (key, value) => ({
  type: 'AUTH_CHANGE_INPUT',
  payload: { [key]: value },
});

export const dropAuthError = idx => ({
  type: 'DROP_AUTH_ERROR',
  payload: { idx },
});