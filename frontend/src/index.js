import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';

import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';

import reducers from './reducers';
import { Doc, Console, Auth } from './pages/';
import { Navtop } from './components/';
import { auth } from './funcs/firebase';

const history = createBrowserHistory();

const store = createStore(
  combineReducers({
    ...reducers,
    router: connectRouter(history)
  }),
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
    ),
  ),
);

auth.onAuthStateChanged(user => {
  store.dispatch({ type: 'SET_USER', payload: { user } });
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Navtop />
      <Switch>
        <Route exact path="/" render={() => (<Doc />)} />
        <Route exact path="/install" render={() => (<div>install</div>)} />
        <Route exact path="/console" render={() => (<Console />)} />
        <Route exact path="/auth" render={() => (<Auth />)} />
        <Route render={() => (<div>404</div>)} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);