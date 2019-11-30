import React, { Component } from "react";
import { Link } from "react-router-dom";
import fire from "./config/Fire";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: "",
      password: ""
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
      });
  };
  signup = e => {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        console.log(error);
      });
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="col-md-6">
        <Form>
          <div className="FormGroup">
            <Label htmlFor="exampleInputEmail1">Email address</Label>
            <Input
              value={this.state.email}
              onChange={this.handleChange}
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="FormGroup">
            <Label htmlFor="exampleInputPassword1">Password</Label>
            <Input
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <Button
            type="submit"
            onClick={this.login}
            className="btn btn-primary"
          >
            Login
          </Button>
          <Button
            onClick={this.signup}
            style={{ marginLeft: "25px" }}
            className="btn btn-success"
          >
            Signup
          </Button>
        </Form>
      </div>
    );
  }
}
export default Login;
