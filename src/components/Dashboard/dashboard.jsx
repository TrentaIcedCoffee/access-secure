import React, { Component } from "react";
import { Link } from "react-dom";
import fire from "../../config/Fire";
import "./styles.css";
import NaviBar from "./NaviBar";
import DataDisplay from "./dataDisplay";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import {
  MenuItem,
  Paper,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  AppBar,
  Menu,
  Toolbar,
  ClickAwayListener,
  IconButton
} from "@material-ui/core";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.addToDB = this.addToDB.bind(this);
    this.clickOnMenu = this.clickOnMenu.bind(this);
    this.state = {
      contantStatus: "dashboard",
      open: false,
      show: null,
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

  // this function will be called by NaviBar
  clickOnMenu() {
    this.handleToggle();
    console.log("called from children");
  }
  handleToggle = () => this.setState({ open: !this.state.open });
  handleClickAway = () => {
    // console.log("enter ClickAway");
    // this.setState({ open: false });
  };
  // DIY here
  showBar = () => this.setState({ show: "bar", open: false });
  showFoo = () => this.setState({ show: "foo", open: false });
  showZee = () => this.setState({ show: "zee", open: false });

  render() {
    let content = null;
    switch (this.state.show) {
      case "foo":
        content = <div>Foo</div>;
        break;
      case "bar":
        content = <div>bar</div>;
        break;
      case "zee":
        content = <div>zee</div>;
        break;
      default:
        content = <h1>Waiting</h1>;
    }
    return (
      <div className="Navi">
        <CssBaseline />
        <NaviBar
          containerRef={this.state.email}
          statusRef={this.state.contantStatus}
          triggerParentUpdate={this.clickOnMenu}
        />
        <Drawer
          width={250}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <AppBar title="AppBar" />
          <IconButton>
            {""}
            <ArrowBackIosIcon onClick={this.handleToggle} fontSize="small" />
          </IconButton>

          <MenuItem onClick={this.showFoo}>ShowFoo</MenuItem>
          <MenuItem onClick={this.showBar}>ShowBar</MenuItem>
        </Drawer>
        <Divider />
        {/* below is where dashboard shows */}
        <Paper zDepth={5}>{content}</Paper>
      </div>
    );
  }
  //Below is use case of db
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
}

export default Dashboard;
