import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Welcome from './components/welcome/';
import Console from './components/console/';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render = () => {
    return (
      <div className='App'>
        <Router>
          <Switch>
            <Route path='/' exact component={Welcome} />
            <Route path='/console' exact component={Console} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;