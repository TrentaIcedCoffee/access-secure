import React, { Component } from "react";
import loginImg from "../../logo.jpeg";
import fire from "../../config/Fire";
import { Snackbar } from "@material-ui/core";
import MySnackbarContentWrapper from "../SnackBar/mySnackbarContentWrapper";

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: "",
      password: "",
      repassword: "",
      snackBarOpen: false,
      snackBarType: "info",
      snackBarMessage: "test"
    };
  }
  signup = e => {
    if (this.state.password != this.state.repassword) {
      console.error("Password not match");
      this.setState({
        snackBarOpen: true,
        snackBarType: "error",
        snackBarMessage: "Passwordes not match!"
      });
      return;
    } else if (this.state.password.length < 6) {
      console.error("Password too short");
      this.setState({
        snackBarOpen: true,
        snackBarType: "warning",
        snackBarMessage: "Password cannot be shorter than 6!"
      });
      return;
    }
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.sendDataToParent("success", "Register Success!"))
      .catch(error => {
        console.log(error);
        this.setState({
          snackBarOpen: true,
          snackBarType: "error",
          snackBarMessage: error
        });
      });
  };
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false, snackBarOpen: false });
  };
  sendDataToParent = (type, message) => {
    this.props.parentCallback(type, message);
    console.log("Register.js -> Parent");
  };
  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                placeholder="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                name="password"
                placeholder="password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Re Enter Password</label>
              <input
                value={this.state.repassword}
                onChange={this.handleChange}
                type="password"
                name="repassword"
                placeholder="Reenter password"
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={this.signup}>
            Register
          </button>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.snackBarOpen}
          autoHideDuration={5000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant={this.state.snackBarType}
            message={this.state.snackBarMessage}
          />
        </Snackbar>
      </div>
    );
  }
}

export default Register;
