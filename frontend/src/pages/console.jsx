import React from 'react';
import { connect } from 'react-redux';

import {
  redirect, appById, showModal, closeModal,
} from '../actions/';

import {
  Container, Row, Col, Card, Modal, Button, Table,
} from 'react-bootstrap';

import './styles.sass';

const mapStateToProps = state => ({
  user: state.auth.user,
  apps: state.console.apps,
  app: state.console.app,
  logs: state.console.logs,
  blacklist: state.console.blacklist,
  whitelist: state.console.whitelist,
  modal: state.console.modal,
});

const mapDispatchToProps = dispatch => ({
  redirect: path => dispatch(redirect(path)),
  appById: appId => dispatch(appById(appId)),
  showModal: modal => dispatch(showModal(modal)),
  closeModal: () => dispatch(closeModal()),
});

class Console extends React.Component {
  render = () => {
    const {
      user, app, logs, blacklist, whitelist, modal
    } = this.props;
    const {
      redirect, showModal, closeModal,
    } = this.props;
    if (!user) {
      redirect('/auth');
    }
    return (
      <div className="console">
        {Object.keys(app).length === 0 ? 
        <div className="noApp">No project</div>
        :
        <div>
          <Container className="withApp" fluid>
            <Row>
              <Col><Card><Card.Body>
                <Card.Title>Project Overview</Card.Title>
                <Card.Subtitle className="text-muted">
                  {app.name} (id: {app.id})
                </Card.Subtitle>
                <Button variant="primary" onClick={() => showModal('overview')}>
                  Overview
                </Button>
              </Card.Body></Card></Col>
              <Col><Card><Card.Body>
                <Card.Title>Logs</Card.Title>
                <Card.Subtitle className="text-muted">
                  {logs.length} logs
                </Card.Subtitle>
                <Button variant="primary" onClick={() => showModal('logs')}>
                  Manage
                </Button>
              </Card.Body></Card></Col>
            </Row>
            <Row>
              <Col><Card><Card.Body>
                <Card.Title>whitelist</Card.Title>
                <Card.Subtitle className="text-muted">
                  {whitelist.length} ips
                </Card.Subtitle>
                <Button variant="primary" onClick={() => showModal('whitelist')}>
                  Manage
                </Button>
              </Card.Body></Card></Col>
              <Col><Card><Card.Body>
                <Card.Title>blacklist</Card.Title>
                <Card.Subtitle className="text-muted">
                  {blacklist.length} ips
                </Card.Subtitle>
                <Button variant="primary" onClick={() => showModal('blacklist')}>
                  Manage
                </Button>
              </Card.Body></Card></Col>
            </Row>
          </Container>
          <Modal show={modal === 'overview'} onHide={() => closeModal()}>
            <Modal.Header closeButton>
              <Modal.Title>overview</Modal.Title>
            </Modal.Header>
            <Modal.Body>Token: {app.token}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => closeModal()}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={modal === 'logs'} onHide={() => closeModal()}>
            <Modal.Header closeButton>
              <Modal.Title>logs</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table striped bordered hover size="sm">
                <thead><tr><th>ip</th><th>path</th><th>resCode</th></tr></thead>
                <tbody>
                  {logs.map((log, idx) => (
                    <tr key={idx}>
                      <td>{log.ip}</td><td>{log.path}</td><td>{log.resCode}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => closeModal()}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={modal === 'whitelist'} onHide={() => closeModal()}>
            <Modal.Header closeButton>
              <Modal.Title>ip whitelist</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table striped bordered hover size="sm">
                <thead><tr><th>ip</th><th>timestamp</th></tr></thead>
                <tbody>
                  {whitelist.map((entry, idx) => (
                    <tr key={idx}>
                      <td>{entry.ip}</td>
                      <td>
                        {(new Date(entry.timestamp.seconds)).toUTCString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => closeModal()}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={modal === 'blacklist'} onHide={() => closeModal()}>
            <Modal.Header closeButton>
              <Modal.Title>ip blacklist</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table striped bordered hover size="sm">
                <thead><tr><th>ip</th><th>timestamp</th></tr></thead>
                <tbody>
                  {blacklist.map((entry, idx) => (
                    <tr key={idx}>
                      <td>{entry.ip}</td>
                      <td>
                        {(new Date(entry.timestamp.seconds)).toUTCString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => closeModal()}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        }
      </div>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Console);