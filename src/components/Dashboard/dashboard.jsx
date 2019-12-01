import React, { Component } from "react";
import { Link } from "react-dom";
import fire from "../../config/Fire";
import "./styles.css";
import { initializeApp } from "firebase";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.addToDB = this.addToDB.bind(this);
    this.state = {
      user: {},
      uid: "",
      email: "",
      db: fire.firestore()
    };
    this.state.uid = fire.auth().onAuthStateChanged(user => {
      this.state.uid = user.uid;
      this.state.email = user.email;
      console.log(user);
    });
  }

  logout() {
    fire.auth().signOut();
  }

  addToDB() {
    this.state.db
      .collection(this.state.uid)
      .add({
        Ip: "TestIp",
        Username: "testUser"
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(e) {
        console.error("Error adding document: ", e);
      });
  }

  render() {
    return (
      <div className="col-md-6">
        <h1>Your Dashboard</h1>
        <button onClick={this.logout}>Logout</button>
        <button onClick={this.addToDB}>Test</button>
      </div>
    );
  }
}

export default Dashboard;
