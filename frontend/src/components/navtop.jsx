import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../actions';

import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.sass';

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

class Navtop extends React.Component {
  render = () => {
    const { pathname, user } = this.props;
    const { logout } = this.props;
    return (
      <Navbar className="navbar" variant="dark">
        <Navbar.Brand >Access-Secure</Navbar.Brand>
        <Link to="/install">Install</Link>
        <Nav className="mr-auto"></Nav>
        {pathname !== '/' ? 
          <div>
            {
              user &&
              <Button variant="outline-warning" onClick={logout}>Logout</Button>
            }
            <Link to='/'><Button variant="outline-info">To Doc</Button></Link>
          </div>
          :
          <Link to='/console'>
            <Button variant="outline-success">Console</Button>
          </Link>
        }
      </Navbar>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navtop);