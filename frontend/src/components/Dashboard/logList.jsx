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
    this.state = {};
  }

  render() {
    var logs = this.userLogs();
    return (
      <Button onClick={() => this.sendDataToParent("success", "Success!")}>
        test for LogList
      </Button>
    );
  }

  sendDataToParent = (type, message) => {
    this.props.parentCallback(type, message);
    console.log("blacklistPage -> Parent");
  };

  userLogs = () => {
    fire.database();
  };
}
export default LogList;
