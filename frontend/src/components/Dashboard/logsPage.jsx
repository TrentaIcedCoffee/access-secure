import React, { Component, useState, useEffect } from "react";
import { Button, Typography, Divider,FormControl,InputLabel,Select,MenuItem } from "@material-ui/core";
import fire from "../../config/Fire";
import LogList from "./logList";
import './styles.css';
class LogsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      db: fire.firestore(),
      uid: "",
      appid:[],
      choosenId:"fasdfsdf"
    };
  }

  render() {
    this.state.uid = this.props.uid;
    return (
      <Typography>
      <FormControl className="formControl2">
        <InputLabel id="appidChoose">AppID</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={this.state.choosedId}
          onChange={this.handleChange}
        >
          <MenuItem value="fasdfsdf" >fasdfsdf</MenuItem>
          <MenuItem value="fasdfsdf2" >fasdfsdf2</MenuItem>
        </Select>
      </FormControl>
        <Divider/>
        <LogList parentCallback={this.callbackFunction} choosedId={this.state.choosenId}/>
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
  handleChange = ()=>{
    console.log("we change somehing");
    this.state.choosenId='fasdfsdf2';
    console.log(this.state.choosenId);
    this.forceUpdate();
  }
}
export default LogsPage;
