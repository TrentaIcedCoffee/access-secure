import React from 'react';
import { Alert } from 'react-bootstrap';

import './styles.sass';

class Alerts extends React.Component {
  
  /* FROM PARENT
    errs
  */
  
  render = () => {
    return (
      <div className='errs'>
        {this.props.errs.map(((err, idx) => (
          <Alert key={idx} variant='danger'>{err}</Alert>
        )))}
      </div>
    );
  }
}

export default Alerts;