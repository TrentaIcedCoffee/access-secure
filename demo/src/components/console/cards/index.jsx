import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './styles.sass';

class Cards extends React.Component {

  /* FROM PARENT
    user
    db
  */
  
  constructor(props) {
    super(props);
    this.state = {
      apps: []
    };
    this.props.db.collection('apps')
      .where('uid', '==', this.props.user.uid)
      .get().then((docs) => {
        var apps = [];
        docs.forEach((doc) => {
          const {name, description} = doc.data();
          apps.push({
            id: doc.id,
            name: name,
            description: description || ''
          });
        });
        this.setState({apps: apps});
      });
  }
  
  render = () => {
    return (
      <div className="cards">
        <Card className="card">
          <Card.Body>
            <div className="icon-plus">&#43;</div>
            <div className="text-plus">New Project</div>
         </Card.Body>
        </Card>
        {this.state.apps.map((app, idx) => (
          <Link className="anchor" key={idx} to={`/console/apps/${app.id}`}>
            <Card className="card">
              <Card.Body>
                <Card.Title>{app.name}</Card.Title>
                <Card.Text>{app.description}</Card.Text>
             </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
    );
  }
}

export default Cards;