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
      logs:[],
    };
    //init things
    this.getUid();
    this.userLogs();
  }

  render() {
    //we do list here
    const logList  = this.state.logs.map(log => 
    <li>{log.ip}</li>);
    //and render here
    return (
      <div>
        <ol>{logList}</ol>
      </div>
    );
  }

  sendDataToParent = (type, message) => {
    this.props.parentCallback(type, message);
    console.log("blacklistPage -> Parent");
  };

  userLogs = () => {
    var db = fire.firestore();
    db.collection("logs")
      //.where("userid","==",this.state.userid)
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log("inside");
        console.log(data);
        this.setState({logs:data});
      });
  };
  userLogs2 = () => {
    var db = fire.firestore();
    var Logs = [];
    db.collection("logs")
      //.where("userid","==",this.state.userid)
      .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(log){
          var map = new Map([["ip",log.data().ip],["userid",log.data().userid]]);
          Logs.push(map);
        });
      });
      this.setState({logs:Logs});
      console.log(this.state.logs);
  };

  getUid = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        // User logged in already or has just logged in.
        this.state.userid = user.uid;
      } else {
        // User not logged in or has just logged out.
      }
    });
  };
}
export default LogList;
