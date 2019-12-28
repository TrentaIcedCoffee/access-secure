import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Navtop extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand >Access-Secure</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link>Getting Started</Nav.Link>
          <Nav.Link>Create a Project</Nav.Link>
          <Nav.Link>Install</Nav.Link>
        </Nav>
        <Link to='/console'>
          <Button variant="outline-success">Console</Button>
        </Link>
      </Navbar>
    );
  }
}

export default Navtop;