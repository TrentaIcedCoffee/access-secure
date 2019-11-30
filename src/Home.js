import React, { Component } from "react";
import { Link } from "react-dom";
import fire from "./config/Fire";

class Home extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    fire.auth().signOut();
  }

  render() {
    return (
      <div className="col-md-6">
        <h1>You R Home</h1>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Home;
