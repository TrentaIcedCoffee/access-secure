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
import LogsPage from "./logsPage";
import BlacklistPage from "./blacklistPage";
import WhitelistPage from "./whitelistPage";

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
      snackBarMessage: "test",
      snackType: "info",
      open: false,
      show: "dashboard",
      uid: "",
      email: "",
      db: fire.firestore(),
      name: "",
      user: {}
    };
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        this.state.uid = user.uid;
        this.state.email = user.email;
      }
    });
  }

  render() {
    // decide which page to show
    let content = null;
    switch (this.state.show) {
      case "dashboard":
        content = (
          <LogsPage
            parentCallback={this.callbackFunction}
            uid={this.state.uid}
          />
        );
        break;
      case "blacklist":
        content = <BlacklistPage parentCallback={this.callbackFunction} />;
        break;
      case "whitelist":
        content = <WhitelistPage parentCallback={this.callbackFunction} />;
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
              onClick={this.handleToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className="title">
              {this.state.contantStatus}
            </Typography>
            <Avatar>{this.state.name}</Avatar>
            <IconButton color="inherit" onClick={this.logout}>
              <ExitToAppIcon />
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
            <ListItem button onClick={this.showDashboard}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={this.showBlacklist}>
              <ListItemIcon>
                <BlockIcon />
              </ListItemIcon>
              <ListItemText primary="Black List" />
            </ListItem>
            <ListItem button onClick={this.showWhitelist}>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="White List" />
            </ListItem>
          </List>
        </Drawer>
        <Divider />
        {/* below is where dashboard shows */}
        <Typography>{content}</Typography>
        {/* <Snackbar
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
        </Snackbar> */}
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
  // this function can take data from children
  callbackFunction = (type, message) => {
    // this.setState({
    //   snackBarOpen: true,
    //   snackBarType: type,
    //   snackBarMessage: message
    // });
    this.sendDataToParent(type, message);
  };
  // DIY Function here
  showDashboard = () =>
    this.setState({
      contantStatus: "Dashboard",
      show: "dashboard",
      open: false
    });
  showBlacklist = () =>
    this.setState({
      contantStatus: "Black List",
      show: "blacklist",
      open: false
    });
  showWhitelist = () =>
    this.setState({
      contantStatus: "White List",
      show: "whitelist",
      open: false
    });
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
  // Key function to use App.js.SnackBar
  sendDataToParent = (type, message) => {
    this.props.parentCallback(type, message);
    console.log("Dashboard.js -> Parent");
  };
}

export default Dashboard;
