import React, { Component } from "react";
import loginImg from "../../logo.jpeg";
import fire from "../../config/Fire";
import "./styles.css";
import { Snackbar } from "@material-ui/core";
import MySnackbarContentWrapper from "../SnackBar/mySnackbarContentWrapper";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      snackBarOpen: false,
      snackBarType: "info",
      snackBarMessage: "test"
    };
  }
  login = e => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {})
      .catch(error => {
        console.log(error);
        this.setState({
          snackBarOpen: true,
          snackBarType: "error",
          snackBarMessage: "Email and Password not match!"
        });
        this.handleError(error);
      });
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleError = e => {};
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false, snackBarOpen: false });
  };

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                value={this.state.email}
                onChange={this.handleChange}
                type="email"
                name="email"
                placeholder="Enter email"
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
          </div>
        </div>
        <div className="footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.login}
          >
            Login
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

export default Login;
