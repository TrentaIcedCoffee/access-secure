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
          <p>Middleware as third-party service</p>
          <ul>
            <li>Black/White List</li>
            <li>Anti-Spamming</li>
            <li>Various frameworks supports</li>
          </ul>
          <div className="btns">
            {/*<Link to='/install'><Button variant="outline-info" size="lg">Install</Button></Link>*/}
            <Link to='/console'><Button variant="outline-success" size="lg">To Console</Button></Link>
          </div>
          <div className="text-muted">
            Current version: 0.1.0
          </div>
        </div>
      </div>
      <div className="down container">
        <div className="row">
          <div className="col-md-4">
            <h2>Middleware as third-party service</h2>
            <p>Middleware such as logger, authentication, anti-spamming and ip
              black/white list has nothing to do with your app logic, thus we
              extract these parts so you can focus on your business logic.</p>
          </div>
          <div className="col-md-4">
            <h2>No extra infrastructures</h2>
            <p>Extra infrastructures &#8594; one bundle. Your app could be
            simple as one backend and one database. With a centralized
            management system, you have your app fully under control.</p>
          </div>
          <div className="col-md-4">
            <h2>Features and Supports</h2>
            <ul>
              <li>Log</li><li>ip black/white list</li><li>anti-spamming</li>
            </ul>
            <ul>
              <li>Express</li><li>Koa</li><li>Flask</li><li>Django</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Doc;