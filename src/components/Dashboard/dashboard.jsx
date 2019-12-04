import React, { Component } from "react";
import fire from "../../config/Fire";
import "./styles.css";
import Drawer from "@material-ui/core/Drawer";
import BlockIcon from "@material-ui/icons/Block";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import MySnackbarContentWrapper from "../SnackBar/mySnackbarContentWrapper";

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
  Typography,
  Snackbar
} from "@material-ui/core";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contantStatus: "Dashboard",
      snackBarOpen: false,
      snackBarMessage: "",
      snackType: "info",
      open: false,
      show: null,
      user: {},
      uid: "",
      email: "",
      db: fire.firestore(),
      name: ""
    };
    this.state.uid = fire.auth().onAuthStateChanged(user => {
      this.state.uid = user.uid;
      this.state.email = user.email;
    });
  }

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
    this.init();
    return (
      <div>
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
            <Avatar>{this.state.name}</Avatar>
            <IconButton color="inherit">
              <ExitToAppIcon onClick={this.logout} />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer className="drawerHeader" open={this.state.open}>
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
        <Button onClick={this.showSnackbar}>Test Snackbar</Button>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.snackBarOpen}
          autoHideDuration={5000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant={this.state.snackType}
            message={this.state.snackBarMessage}
          />
        </Snackbar>
      </div>
    );
  }
  handleToggle = e => {
    this.setState({ open: !this.state.open });
  };
  handleError = e => {};
  handleClickAway = () => {
    // console.log("enter ClickAway");
    // this.setState({ open: false });
  };
  showSnackbar = () => {
    this.setState({ snackBarOpen: true });
  };
  // DIY Function here
  showBar = () =>
    this.setState({
      contantStatus: "Dashboard",
      show: "bar",
      open: false
    });
  showFoo = () =>
    this.setState({ contantStatus: "Black List", show: "foo", open: false });
  showZee = () =>
    this.setState({ contantStatus: "White List", show: "zee", open: false });
  logout = () => {
    console.log("Logouting");
    fire.auth().signOut();
    this.sendDataToParent("info", "Logged Out!");
  };
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false, snackBarOpen: false });
  };
  init = () => {
    this.state.name = this.state.email.toUpperCase().substring(0, 1);
  };
  sendDataToParent = (type, message) => {
    this.props.parentCallback(type, message);
    console.log("Dashboard.js -> Parent");
  };
  //Below is use case of db
  addToDB = () => {
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
  };
}

export default Dashboard;
