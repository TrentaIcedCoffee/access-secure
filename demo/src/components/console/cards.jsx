import React from 'react';
import { Button, Modal, Form, Card } from 'react-bootstrap';

class Cards extends React.Component {
  
  /* FROM PARENT
    auth
    user
    db
  */
  
  constructor(props) {
    super(props);
    console.log(this.props.user)
    this.props.db.collection('apps')
      .where('uid', '==', this.props.user.uid)
      .get().then((docs) => {
        docs.forEach((doc) => {
          console.log(doc.data());
        });
      });
  }
  
  render = () => {
    return (
      <div>
      <Button variant="primary" onClick={() => this.props.auth.signOut()}>LogOut</Button>
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
      </div>
    );
  }
}

export default Cards;