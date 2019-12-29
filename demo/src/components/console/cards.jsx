import React from 'react';
import { Button, Modal, Form, Card } from 'react-bootstrap';

class Cards extends React.Component {
  
  /* FROM PARENT
    firebase
  */
  constructor(props) {
    super(props);
    this.props.firebase.firestore('apps')
      .where('uid', '==', this.props.firebase.auth().uid)
      .forEach((doc) => {
        console.log(doc);
      });
  }
  
  render = () => {
    return (
      <div>
      <Button variant="primary" onClick={() => this.props.firebase.auth().signOut()}>LogOut</Button>
      {this.props.firebase.firestore('apps')
        .where('uid', '==', this.props.firebase.auth().uid)
        .map((doc) => (
          <Card style={{ width: '18rem' }}>
           <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
               Some quick example text to build on the card title and make up the bulk of
               the card's content.
              </Card.Text>
             <Button variant="primary">Go somewhere</Button>
           </Card.Body>
          </Card>
          ))
      } 
      </div>
    );
  }
}

export default Cards;