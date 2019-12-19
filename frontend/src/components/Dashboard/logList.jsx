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
    console.log("outside");
    console.log(this.state.logs);
    const logList  = this.state.logs.map(log => 
    <li>{log.ip}
    </li>
    );
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
    db.collection("apps/fasdfsdf/logs")
      //.where("token","==","sdfa")
      .get()
      .then(querySnapshot => {
        var Logs=[];
         const data = querySnapshot.docs.map(function(doc) {
           var body = doc.data();
           body["id"] = doc.id;
           return body
         });
        console.log("inside");
        console.log(data);
        this.setState({logs:data});
      });
  };
  userLogs2 = () => {
    var db = fire.firestore();
    var Logs=[];
    var res = db.collection("apps/fasdfsdf/logs")
      //.where("userid","==",this.state.userid)
      .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(log){
          // var map = new Map([["email",log.id]]);
                          // ["ip",log.data().ip],
                          // ["userid",log.data().userid],
                          // ["time",log.data().time.toDate()]]);
          var map = new Map([["map_id", log.id],
                             ["url", log.url]]);
          Logs.push(map);
        });
      }, function(error) {
        console.log(error);
        console.log("reached error")
      }, function() {
        this.setState({logs: Logs});
        console.log(Logs);
        console.log("reached success");
      });
    console.log(res);
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
