import React from 'react';
import { Button } from 'react-bootstrap';

import './styles.sass';

class UI extends React.Component {
  render() {
    return (
      <Button variant="primary" onClick={() => this.props.firebase.auth().signOut()}>LogOut</Button>
    );
  };
}

export default UI;