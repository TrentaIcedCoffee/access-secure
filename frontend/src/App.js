import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Doc, Console, Dashboard, Navtop } from './components/';
import { db, auth } from './funcs/firebase';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      route: 'doc'
    };
    this.auth = auth;
    this.db = db;
    auth.onAuthStateChanged((user) => {
      this.setState({user: user});
    });
  }
  
  syncRoute = (_route) => {
    if (_route !== this.route) {
      this.setState({route: _route});
    }
  }
  
  render = () => {
    const {user, route} = this.state;
    const {auth, db, syncRoute} = this;
    return (
      <div className='App'>
        <Router>
          <Navtop route={route} user={user} auth={auth} />
          <Switch>
            <Route path='/' exact render={() => <Doc 
              syncRouteCallback={() => syncRoute('doc')}
            />} />
            <Route path='/console' exact render={(props) => <Console
              {...props} user={user} auth={auth} db={db} 
              syncRouteCallback={() => syncRoute('console')}
            />} />
            <Route path='/console/apps/:appId' exact render={(props) => 
              <Dashboard {...props} user={user} db={db} 
              syncRouteCallback={() => syncRoute('dashboard')}
            />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;