import React, { useState, useEffect, Component } from "react";
import "./styles.css";
import {
  IconButton,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Dialog
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import fire from "../../config/Fire";
/// Props: choosedId: appid we should display
///        parentCallback: pass message to snackbar in parents
class LogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: {},
      logs: [],
      appid: ""
    };
    //init things
    this.getUid();
    this.userLogs();
  }

  render() {
    //we do list here
    const logList = this.state.logs.map(log => (
      <TableRow key={log.id} hover={true}>
        <TableCell align="left">{log.id}</TableCell>
        <TableCell align="left">{this.getMyTime(log.time)}</TableCell>
        <TableCell align="left">{log.method}</TableCell>
        <TableCell align="left">{log.path}</TableCell>
        <TableCell align="left">{log.ip}</TableCell>
        <TableCell align="left">{log.username}</TableCell>
        <TableCell align="right">
          <IconButton onClick={() => this.deleteButtonClick(log.id)}>
            <DeleteIcon color="secondary" />
          </IconButton>
        </TableCell>
      </TableRow>
    ));

    //and render here
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Id</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Method</TableCell>
            <TableCell align="left">Path</TableCell>
            <TableCell align="left">IP</TableCell>
            <TableCell align="left">Username</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{logList}</TableBody>
      </Table>
    );
  }

  sendDataToParent = (type, message) => {
    this.props.parentCallback(type, message);
    console.log("blacklistPage -> Parent");
  };
  //("apps/fasdfsdf/logs")
  userLogs = () => {
    // get app id
    this.state.appid = this.props.choosedId;
    var db = fire.firestore();
    db.collection("apps")
      .doc(this.state.appid) // use AppId here
      .collection("logs")
      //.where("token","==","sdfa")
      .get()
      .then(querySnapshot => {
        var Logs = [];
        const data = querySnapshot.docs.map(function(doc) {
          var body = doc.data();
          body["id"] = doc.id;
          // time is a JS Date Object
          body["time"] = doc.data().timestamp.toDate();
          return body;
        });
        console.log(data);
        this.setState({ logs: data });
      });
  };
  // userLogs2 abandoned
  userLogs2 = () => {
    var db = fire.firestore();
    var Logs = [];
    var res = db
      .collection("apps/fasdfsdf/logs")
      //.where("userid","==",this.state.userid)
      .onSnapshot(
        function(querySnapshot) {
          const data = querySnapshot.docs.map(function(doc) {
            var body = doc.data();
            body["id"] = doc.id;
            // time is a JS Date Object
            body["time"] = doc.data().timestamp.toDate();
            return body;
          });
          console.log(data);
          this.setState({ logs: data });
        },
        function(error) {
          console.log(error);
          console.log("reached error");
        },
        function() {
          this.setState({ logs: Logs });
          console.log(Logs);
          console.log("reached success");
        }
      );
    console.log(res);
  };

  getUid = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        // User logged in already or has just logged in.
        this.state.userid = user.uid;
      } else {
        // User not logged in or has just logged out.
      }
    });
  };

  getMyTime = data => {
    return (
      data.getFullYear() +
      "-" +
      data.getMonth() +
      "-" +
      data.getDate() +
      " " +
      data.getHours() +
      ":" +
      data.getMinutes() +
      ":" +
      data.getSeconds()
    );
  };

  deleteButtonClick = id => {
    // Trick way to use this in promise.
    var that = this;
    console.log("Deleted: " + id);
    // TODO: confirm dialog!
    var db = fire.firestore();
    db.collection("apps")
      .doc(this.state.appid) // use AppId here
      .collection("logs")
      .doc(id)
      .delete()
      .then(function() {
        console.log("Doc: " + id + " Successfullly deleted!");
        that.sendDataToParent(
          "success",
          "Doc: " + id + " Successfullly deleted!"
        );
      })
      .catch(function(error) {
        console.error("Error removing doc: ", error);
        that.sendDataToParent("error", "Error removing doc");
      });
    //Because get() is not async, so we manually refresh it
    this.userLogs();
  };
}
export default LogList;
