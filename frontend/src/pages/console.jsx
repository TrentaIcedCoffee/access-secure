import React from 'react';
import { connect } from 'react-redux';

import {
  redirect,
  appById,
} from '../actions/';

import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap';

import './styles.sass';

const mapStateToProps = state => ({
  user: state.auth.user,
  apps: state.console.apps,
  app: state.console.app,
  logs: state.console.logs,
  blacklist: state.console.blacklist,
  whitelist: state.console.whitelist,
});

const mapDispatchToProps = dispatch => ({
  redirect: path => dispatch(redirect(path)),
  appById: appId => dispatch(appById(appId)),
});

class Console extends React.Component {
  render = () => {
    const {
      user, apps, app, logs, blacklist, whitelist,
    } = this.props;
    const {
      redirect, appById,
    } = this.props;
    if (!user) {
      redirect('/auth');
    }
    return (
      <div className="console">
        <div className="left">
          <ListGroup>
            {apps.map(_app => (
              <ListGroup.Item
                key={_app.id} onClick={() => appById(_app.id)}
                active={_app.id === app.id}
              >
                {_app.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <Container className="right" fluid>
          {Object.keys(app).length !== 0 &&
            <div>
              <Row>
                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Title>Project Overview</Card.Title>
                      <Card.Subtitle className="text-muted">{app.name}</Card.Subtitle>
                      <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                      </Card.Text>
                      <Card.Link href="#">Card Link</Card.Link>
                      <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Title>Logs</Card.Title>
                      <Card.Subtitle className="text-muted">{logs.length} logs</Card.Subtitle>
                      <Card.Text>
                        some text
                      </Card.Text>
                      <Card.Link href="#">Card Link</Card.Link>
                      <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Title>whitelist</Card.Title>
                      <Card.Subtitle className="text-muted">{whitelist.length} ips</Card.Subtitle>
                      <Card.Text>
                        some text
                      </Card.Text>
                      <Card.Link href="#">Card Link</Card.Link>
                      <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Body>
                      <Card.Title>blacklist</Card.Title>
                      <Card.Subtitle className="text-muted">{blacklist.length} ips</Card.Subtitle>
                      <Card.Text>
                        some text
                      </Card.Text>
                      <Card.Link href="#">Card Link</Card.Link>
                      <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          }
        </Container>
      </div>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Console);