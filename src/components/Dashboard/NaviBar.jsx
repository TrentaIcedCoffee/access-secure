import React, { Component } from "react";
import "./styles.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { IconButton, Button, Avatar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import fire from "../../config/Fire";
import { string } from "prop-types";

class NaviBar extends Component {
  constructor(props) {
    super(props);
    //{this.props.containerRef}
    this.logout = this.logout.bind(this);
    this.state = {
      name: ""
    };
  }

  logout() {
    fire.auth().signOut();
  }

  render() {
    console.log(this.props.containerRef);
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
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className="title">
              My Dashboard
            </Typography>
            <Avatar>{this.state.name}</Avatar>
            <Button color="inherit" onClick={this.logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default NaviBar;
