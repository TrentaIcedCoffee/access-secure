import React, { Component } from "react";
import loginImg from "../../logo.jpeg";
import fire from "../../config/Fire";
import "./styles.css";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      warning: "123"
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
        this.handleError(error);
      });
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleError = e => {};

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
          <div className="warning">{this.state.warning}</div>
        </div>
      </div>
    );
  }
}

export default Login;
