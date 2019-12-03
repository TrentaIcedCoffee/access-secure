import React, { Component } from "react";
import { Link } from "react-dom";
import fire from "../../config/Fire";
import "./styles.css";
import NaviBar from "./NaviBar";
import DataDisplay from "./dataDisplay";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Button } from "@material-ui/core";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.addToDB = this.addToDB.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.clickOnMenu = this.clickOnMenu.bind(this);
    this.state = {
      contantStatus: "dashboard",
      DrawerVisible: false,
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
  //componentDidMount() {}
  toggleDrawer() {
    this.setState({
      DrawerVisible: !this.state.DrawerVisible
    });
  }
  // this function will be called by NaviBar
  clickOnMenu() {
    this.setState({ DrawerVisible: true });
    console.log("called from children");
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

  render() {
    return (
      <div className="root">
        <CssBaseline />
        <NaviBar
          containerRef={this.state.email}
          statusRef={this.state.contantStatus}
          triggerParentUpdate={this.clickOnMenu}
        />
      </div>
    );
  }
}

export default Dashboard;
