import React, { Component } from "react";
import { Link } from "react-dom";
import fire from "../../config/Fire";
import "./styles.less";
import NaviBar from "./NaviBar";
import DataDisplay from "./dataDisplay";

class Dashboard extends Component {
  constructor(props) {
    super(props);
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
      <div>
        <NaviBar containerRef={this.state.email} />
        <DataDisplay />
      </div>
    );
  }
}

export default Dashboard;
