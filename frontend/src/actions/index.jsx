import { auth, db } from '../funcs/firebase';
import { push } from 'connected-react-router';

export const alterUser = user => dispatch => {
  dispatch({ type: 'SET_USER', payload: { user } });
  if (user) {
    const apps = [];
    db.collection('apps')
      .where('uid', '==', user.uid)
      .get()
      .then(qs => {
        qs.forEach(ds => {
          apps.push({ ...ds.data(), id: ds.id });
        });
        dispatch({ type: 'SET_APPS', payload: { apps: apps }});
      });
  } else {
    dispatch({ type: 'UNSET_ALL', payload: {} });
  }
};

export const redirect = path => dispatch => {
  dispatch(push(path)); // TODO
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

export const toLogin = () => ({
  type: 'TO_LOGIN',
  payload: {},
});

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

export const appById = appId => dispatch => {
  db.doc(`apps/${appId}`).get()
    .then(ds => dispatch({
      type: 'SET_APP', payload: { app: { ...ds.data(), id: ds.id }} })
    );
  db.collection(`apps/${appId}/whitelist`).get()
    .then(qs => {
      const whitelist = [];
      qs.forEach(ds => whitelist.push({ ...ds.data(), ip: ds.id }));
      dispatch({ type: 'SET_WHITELIST', payload: { whitelist } });
    });
  db.collection(`apps/${appId}/blacklist`).get()
    .then(qs => {
      const blacklist = [];
      qs.forEach(ds => blacklist.push({ ...ds.data(), ip: ds.id }));
      dispatch({ type: 'SET_BLACKLIST', payload: { blacklist } });
    });
  db.collection(`apps/${appId}/logs`).get()
    .then(qs => {
      const logs = [];
      qs.forEach(ds => logs.push({ ...ds.data(), id: ds.id }));
      dispatch({ type: 'SET_LOGS', payload: { logs } });
    });
};