import React from 'react';
import { Card, Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Alerts from '../../utils/alerts';
import { DebugError } from '../../../funcs/errors';
import './styles.sass';

class Cards extends React.Component {

  /* FROM PARENT
    user
    db
  */
  
  constructor(props) {
    super(props);
    this.state = {
      apps: [],
      isAdding: false,
      name: '',
      description: '',
      errs: []
    };
    this.refreshApps();
  }
  
  refreshApps = () => {
    this.props.db.collection('apps')
      .where('uid', '==', this.props.user.uid)
      .get().then((docs) => {
        const apps = [];
        docs.forEach((doc) => {
          const {name, description} = doc.data();
          apps.push({
            id: doc.id,
            name: name,
            description: description || ''
          });
        });
        this.setState({apps: apps});
      }).catch((err) => console.log(new DebugError(err.message)));
  }
  
  appendErrs = (err) => {
    this.setState({
      errs: this.state.errs.concat(err)
    }, () => {setTimeout(() => {
      this.setState({
        errs: this.state.errs.splice(1, this.state.errs.length-1)
      });
    }, 1000)});
  }
  
  createProject = async () => {
    const {name, description} = this.state;
    const nameSet = new Set(this.state.apps.map(app => app.name));
    if (name === '') {
      throw DebugError('project name is required');
    } else if (nameSet.has(name)) {
      throw DebugError('project name is taken');
    }
    return this.props.db.collection('apps').add({
      name: name,
      description: description,
      uid: this.props.user.uid,
      token: Math.random().toString(36).substring(8)
    });
  }
  
  changeInput = (e) => {
    this.setState({[e.target.id]: e.target.value});
  }
  
  submitNewProject = () => {
    this.createProject().then(() => {
      this.refreshApps();
      this.setState({isAdding: false});
    }).catch((err) => {
      this.appendErrs(err.message);
    });
  }
  
  toggleModal = () => {
    this.setState({isAdding: !this.state.isAdding});
  }
  
  render = () => {
    const {apps, isAdding, name, description, errs} = this.state;
    const {changeInput, toggleModal, submitNewProject} = this;
    return (
      <div className="cards">
        <Card className="card" onClick={() => toggleModal()}>
          <Card.Body>
            <div className="icon-plus">&#43;</div>
            <div className="text-plus">New Project</div>
         </Card.Body>
        </Card>
        {apps.map((app, idx) => (
          <Link className="anchor" key={idx} to={`/console/apps/${app.id}`}>
            <Card className="card">
              <Card.Body>
                <Card.Title>{app.name}</Card.Title>
                <Card.Text>{app.description}</Card.Text>
             </Card.Body>
            </Card>
          </Link>
        ))}
        <Modal
          show={isAdding} 
          onHide={() => toggleModal()}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create New Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Project Name"
                  value={name}
                  onChange={changeInput}
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Project Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Project Description"
                  value={description}
                  onChange={changeInput}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="secondary"
              onClick={() => toggleModal()}>
              Close
            </Button>
            <Button variant="primary" onClick={() => submitNewProject()}>
              Save Changes
            </Button>
          </Modal.Footer>
          <Alerts errs={errs} />
        </Modal>
      </div>
    );
  }
}

export default Cards;