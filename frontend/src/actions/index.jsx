import { auth, db } from '../funcs/firebase';

export const alterUser = user => dispatch => {
  dispatch({ type: 'SET_USER', payload: { user } });
  if (user) {
    dispatch(setApps(user));
  } else {
    dispatch({ type: 'UNSET_ALL', payload: {} });
  }
};

export const setApps = user => dispatch => {
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
};

export const setUser = user => {
  return {
    type: 'SET_USER',
    payload: { user },
  };
};

export const login = (email, password) => dispatch => {
  auth.signInWithEmailAndPassword(email, password)
    .then()
    .catch(err => dispatch({
      type: 'NEW_AUTH_ERROR',
      payload: { error: err.message },
    }));
};

export const logout = () => dispath => {
  auth.signOut();
};

export const register = (email, password, passwordRe) => dispatch => {
  if (password !== passwordRe) {
    dispatch({
      type: 'NEW_AUTH_ERROR',
      payload: { error: 'password retype not match' },
    });
    return;
  }
  auth.createUserWithEmailAndPassword(email, password)
    .then()
    .catch(err => dispatch({
      type: 'NEW_AUTH_ERROR',
      payload: { error: err.message },
    }));
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
  db.collection(`apps/${appId}/logs`).limit(100).get()
    .then(qs => {
      const logs = [];
      qs.forEach(ds => logs.push({ ...ds.data(), id: ds.id }));
      dispatch({ type: 'SET_LOGS', payload: { logs } });
    });
};

export const showModal = modal => dispatch => {
  dispatch({ type: 'SHOW_MODAL', payload: { modal } });
  if (modal === 'newApp') {
    dispatch(generateNewAppToken());
  }
};

export const closeModal = () => ({
  type: 'HIDE_MODAL',
  payload: {},
});

export const createApp = (user, newAppName, token) => dispatch => {
  db.collection('apps').add({
    name: newAppName, uid: user.uid, token,
  }).then(_ => {
    dispatch(setApps(user));
    dispatch(closeModal());
  }).catch();
};

export const changeNewAppName = value => ({
  type: 'CHANGE_NEW_APP_NAME',
  payload: { newAppName: value },
});

export const generateNewAppToken = () => ({
  type: 'GENERATE_NEW_APP_TOKEN',
  payload: { newAppToken: Math.random().toString(36).slice(2) },
});