import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './styles.sass';

class Navtop extends React.Component {
  
  /* FROM PARENT
    route
    user
    auth
  */
  
  render() {
    const {route, user, auth} = this.props;
    return (
      <Navbar className="navbar" bg="dark" variant="dark">
        <Navbar.Brand >Access-Secure</Navbar.Brand>
        <Nav className="mr-auto"></Nav>
          {route === 'doc' &&
            <Link to='/console'>
              <Button variant="outline-success">Console</Button>
            </Link>
          }
          {(route === 'console' || route === 'dashboard') &&
            <div>
              {user && 
                <Button
                  variant="outline-warning"
                  onClick={() => auth.signOut()}>
                  Logout
                </Button>
              }
              <Link to='/'>
                <Button variant="outline-info">To Docs</Button>
              </Link>
            </div>
          }
      </Navbar>
    );
  }
}

export default Navtop;