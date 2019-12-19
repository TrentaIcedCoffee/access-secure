import React, { Component, useState, useEffect } from "react";
import { Button, Typography } from "@material-ui/core";
import fire from "../../config/Fire";
import LogList from "./logList";
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
    return (
      <Typography>
        <LogList parentCallback={this.callbackFunction} />
      </Typography>
    );
  }
  //   testDB = () => {
  //     this.state.db
  //       .collection("users")
  //       .doc(this.state.uid)
  //       .update({ appkey: "" })
  //       .then(function(docRef) {
  //         console.log("Document written with ID: ", docRef.id);
  //       })
  //       .catch(function(e) {
  //         console.error("Error adding document: ", e);
  //       });
  //   };
  callbackFunction = (type, message) => {
    console.log("We Enter logsPage's Callbackfunction");
    this.sendDataToParent(type, message);
  };
  sendDataToParent = (type, message) => {
    this.props.parentCallback(type, message);
    console.log("logsPage -> Parent");
  };
}
export default LogsPage;
