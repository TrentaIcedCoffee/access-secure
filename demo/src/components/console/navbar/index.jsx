import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './styles.sass';

class Navtop extends React.Component {
 
  /* FROM PARENT
    user
    auth
  */
  
  render() {
    return (
      <Navbar className="navbar" bg="dark" variant="dark">
        <Navbar.Brand >Access-Secure</Navbar.Brand>
        <Nav className="mr-auto"></Nav>
        {this.props.user &&
          <Link to='/console'>
            <Button
              variant="outline-warning"
              onClick={() => this.props.auth.signOut()}>Logout</Button>
          </Link>
        }
        <Link to='/'>
          <Button variant="outline-info">To Docs</Button>
        </Link>
      </Navbar>
    );
  }
}

export default Navtop;