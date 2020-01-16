import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import './styles.sass';

class Doc extends React.Component {
  render = () => (
    <div className="doc">
      <div className="up">
        <div className="mid">
          <h1>Access Secure</h1>
          <p>Access middleware as third-party service</p>
          <ul>
            <li>Black/White List</li>
            <li>Anti-Spamming</li>
            <li>Various frameworks supports</li>
          </ul>
          <div className="btns">
            <Link to='/install'><Button variant="outline-info" size="lg">Install</Button></Link>
            <Link to='/console'><Button variant="outline-success" size="lg">To Console</Button></Link>
          </div>
          <div className="text-muted">
            Current version: 0.0.0
          </div>
        </div>
      </div>
      <div className="down container">
        <div className="row">
          <div className="col-md-4">
            <h2>Access Middleware as third-party service</h2>
            <p>React-Bootstrap replaces the Bootstrap JavaScript. 
              Each component has been built from scratch as a true React 
              component, without unneeded dependencies like jQuery.</p>
            <p>As one of the oldest React libraries, React-Bootstrap has 
              evolved and grown alongside React, making it an excellent 
              choice as your UI foundation.</p>
          </div>
          <div className="col-md-4">
            <h2>Integrated with various frameworks</h2>
            <p>Built with compatibility in mind, we embrace our bootstrap core 
              and strive to be compatible with the world's largest 
              UI ecosystem.</p>
            <p>By relying entirely on the Bootstrap stylesheet, React- 
              Bootstrap just works with the thousands of 
              bootstrap themes you already love.</p>
          </div>
          <div className="col-md-4">
            <h2>Features</h2>
            <p>The React component model gives us more control over
              form and function of each component.</p>
            <p>Each component is implemented with accessibility in mind. 
              The result is a set of accessible-by-default components, 
              over what is possible from plain Bootstrap.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Doc;