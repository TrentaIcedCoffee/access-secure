import React, { Component } from "react";
import { Link } from "react-dom";
import fire from "../../config/Fire";
import "./styles.css";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import BlockIcon from "@material-ui/icons/Block";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
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
  Avatar,
  IconButton,
  Typography
} from "@material-ui/core";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.addToDB = this.addToDB.bind(this);
    this.clickOnMenu = this.clickOnMenu.bind(this);
    this.state = {
      contantStatus: "Dashboard",
      open: false,
      show: null,
      user: {},
      uid: "",
      email: "",
      db: fire.firestore(),
      name: ""
    };
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
  // DIY Function here
  showBar = () =>
    this.setState({ contantStatus: "Dashboard", show: "bar", open: false });
  showFoo = () =>
    this.setState({ contantStatus: "Black List", show: "foo", open: false });
  showZee = () =>
    this.setState({ contantStatus: "White List", show: "zee", open: false });
  logout = () => {
    console.log("Logouting");
    fire.auth().signOut();
  };

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
    this.state.uid = fire.auth().onAuthStateChanged(user => {
      this.state.uid = user.uid;
      this.state.email = user.email;
      console.log(user);
    });
    this.state.name = this.state.email.toUpperCase().substring(0, 1);
    return (
      <div className="Navi">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className="menuButton"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon Button onClick={this.handleToggle} />
            </IconButton>
            <Typography variant="h6" className="title">
              {this.state.contantStatus}
            </Typography>
            <Avatar className="MyAvatar">{this.state.name}</Avatar>
            <IconButton color="inherit">
              <ExitToAppIcon onClick={this.logout} />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          className="drawerHeader"
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <AppBar title="AppBar" />
          <Typography align="right">
            <IconButton onClick={this.handleToggle}>
              <ArrowBackIosIcon fontSize="small" />
            </IconButton>
          </Typography>
          <List>
            <ListItem button onClick={this.showBar}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={this.showFoo}>
              <ListItemIcon>
                <BlockIcon />
              </ListItemIcon>
              <ListItemText primary="Black List" />
            </ListItem>
            <ListItem button onClick={this.showZee}>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="White List" />
            </ListItem>
          </List>
        </Drawer>
        <Divider />
        {/* below is where dashboard shows */}
        <Paper>{content}</Paper>
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
