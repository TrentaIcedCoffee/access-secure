import React, { Component } from "react";
import { Button } from "@material-ui/core";
import fire from "../../config/Fire";
import { initializeApp } from "firebase";

class LogsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      db: fire.firestore(),
      uid: ""
    };
  }

  render() {
    this.state.uid = this.props.uid;
    return <Button onClick={this.testDB}>Test</Button>;
  }
  testDB = () => {
    this.state.db
      .collection("users")
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
  };

  sendDataToParent = (type, message) => {
    this.props.parentCallback(type, message);
    console.log("logsPage -> Parent");
  };
}
export default LogsPage;
