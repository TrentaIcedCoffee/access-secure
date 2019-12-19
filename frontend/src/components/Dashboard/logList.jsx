import React, { useState, useEffect, Component } from "react";
import "./styles.css";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Divider,
  Container,
  IconButton,
  Tooltip
} from "@material-ui/core";
import fire from "../../config/Fire";

class LogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid:{},
    };

  }

  render() {
    var logs = this.userLogs();
    this.getUid();
    return (
      <Button onClick={() => this.userLogs()}>
        test for LogList
      </Button>
    );
  }

  sendDataToParent = (type, message) => {
    this.props.parentCallback(type, message);
    console.log("blacklistPage -> Parent");
  };

  userLogs = () => {
    var db = fire.firestore();
    db.collection("logs")
      .where("userid","==",this.state.userid)
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log(data);
        return data;
      })
  };

  getUid = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        // User logged in already or has just logged in.
        this.state.userid = user.uid;
        console.log(user.uid);
      } else {
        // User not logged in or has just logged out.
      }
    });
  };
}
export default LogList;
