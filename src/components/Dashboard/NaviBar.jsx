import React, { Component } from "react";
import "./styles.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { IconButton, Button, Avatar, Menu, MenuItem } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import fire from "../../config/Fire";

class NaviBar extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      status: "",
      name: ""
    };
    console.log("we get " + this.props.statusRef + " from parent");
    if (this.props.statusRef === "dashboard") {
      this.state.status = "Dashboard";
    } else if (this.props.statusRef === "blacklist") {
      this.state.status = "BlackList";
    } else if (this.props.statusRef === "whitelist") {
      this.state.status = "WhiteList";
    }
  }
  logout() {
    console.log("Logouting");
    fire.auth().signOut();
  }
  render() {
    this.state.name = this.props.containerRef.substring(0, 2);
    return (
      <div className="root">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className="menuButton"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon Button onClick={this.props.triggerParentUpdate} />
            </IconButton>
            <Typography variant="h6" className="title">
              {this.state.status}
            </Typography>
            <Avatar>{this.state.name}</Avatar>
            <IconButton color="inherit">
              <ExitToAppIcon onClick={this.logout} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default NaviBar;
