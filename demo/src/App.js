import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import logo from './logo.svg';

import Welcome from './components/welcome/';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginRendered: false,
      isRegisterRendered: false,
      user: null
    };
    props.firebase.auth().onAuthStateChanged((user) => {
      this.setState({user: user})
    });
  };
  
  /* FROM PARENT:
    firebase
  */

  render() {
    return (
      <div className='App'>
        <Router>
          <Switch>
            <Route path='/' exact component={Welcome} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;