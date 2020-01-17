import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  logout, appById, closeModal, showModal, createApp, changeNewAppName,
} from '../actions';

import {
  Navbar, Nav, Button, ButtonToolbar, DropdownButton, Dropdown, Modal, Form,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.sass';

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  user: state.auth.user,
  apps: state.console.apps,
  app: state.console.app,
  modal: state.console.modal,
  newAppName: state.console.newAppName,
  newAppToken: state.console.newAppToken,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  appById: appId => dispatch(appById(appId)),
  closeModal: () => dispatch(closeModal()),
  showModal: modal => dispatch(showModal(modal)),
  createApp: (user, newAppName, newAppToken) => (
    dispatch(createApp(user, newAppName, newAppToken))
  ),
  changeNewAppName: value => dispatch(changeNewAppName(value)),
});

class Navtop extends React.Component {
  render = () => {
    const {
      pathname, user, apps, app, modal, newAppName, newAppToken,
    } = this.props;
    const {
      logout, appById, showModal, closeModal, createApp, changeNewAppName,
    } = this.props;
    return (
      <Navbar className="navbar" variant="dark">
        <Navbar.Brand >Access-Secure</Navbar.Brand>
        <Link to="/install">
          <Button variant="outline-info">Install</Button>
        </Link>
        {user &&
        <ButtonToolbar>
          <DropdownButton
            title={app.name ? app.name : 'select a project'}
            variant="outline-secondary"
          >
          {apps.map(_app => (
            <Dropdown.Item 
              key={_app.id} active={_app.id === app.id} 
              onClick={() => appById(_app.id)}
            >
              {_app.name}
            </Dropdown.Item>
          ))}
          </DropdownButton>
          <Button variant="outline-success" onClick={() => showModal('newApp')}>
            Create a project
          </Button>
          <Modal show={modal === 'newApp'} onHide={() => closeModal()}>
            <Modal.Header closeButton>
              <Modal.Title>Create A Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text" placeholder="Project Name" value={newAppName}
                    onChange={e => changeNewAppName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Token</Form.Label>
                  <Form.Control type="text" value={newAppToken} disabled />
                  <Form.Text className="text-muted">
                    Keep this token in secret
                  </Form.Text>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => closeModal()}>
                Close
              </Button>
              <Button 
                variant="primary"
                onClick={() => createApp(user, newAppName, newAppToken)}
              >
                Create
              </Button>
            </Modal.Footer>
          </Modal>
        </ButtonToolbar>
        }
        <Nav className="mr-auto"></Nav>
        {pathname !== '/' ? 
          <div>
            {user &&
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