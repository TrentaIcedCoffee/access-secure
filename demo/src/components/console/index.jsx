import React from 'react';

import Account from './account/';
import Cards from './cards/';

import './styles.sass';

class Console extends React.Component {
  
  /* FROM PARENT
    user
    db
    auth
    syncRouteCallback
  */
  
  componentDidMount = () => {
    this.props.syncRouteCallback();
  }
  
  render = () => {
    const {user, db, auth} = this.props;
    return (
      <div>
        {user ? 
          <Cards db={db} user={user} />
          :
          <Account db={db} auth={auth} />
        }
      </div>
    );
  }
}

export default Console;