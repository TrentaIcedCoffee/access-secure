import React from 'react';
import { Navbar, Nav, Button, Container, Row, Col } from 'react-bootstrap';

import Logs from './logs';
import './styles.sass';

class Dashboard extends React.Component {
  
  /* FROM PARENT
    user
    db
    syncRouteCallback
  */
  
  constructor(props) {
    super(props);
    this.state = {
      appId: this.props.match.params.appId,
      showing: 'logs'
    };
  }
  
  componentDidMount = () => {
    this.props.syncRouteCallback();
  }
  
  render = () => {
    const {appId, showing} = this.state;
    return (
      <div className="dashboard">
        <div className="left-nav">
          <Nav defaultActiveKey="0" className="flex-column">
            <Nav.Link href="0">Active</Nav.Link>
            <Nav.Link href="1">Link</Nav.Link>
            <Nav.Link href="2">Link</Nav.Link>
          </Nav>
        </div>
        <div className="right-content">
          {showing === 'logs' &&
            <div></div>
          }        
        </div>
      </div>
    );
  }
}

export default Dashboard;