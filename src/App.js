import React, { Component } from "react";
import fire from "./config/Fire";
import "./App.css";
//import Login from "./Login";
import Home from "./Home";
import Login from "./components/Login/login";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.setState({ user });
        //localStorage.setItem('user',user.uid);
      } else {
        this.setState({ user: null });
        //localStorage.removeItem('user');
      }
    });
  }

  render() {
    //return <div className="App">{this.state.user ? <Home /> : <Login />}</div>;
    return (
      <div className="App">
        <div className="login">
          <div className="container">
            {this.state.user ? <Home /> : <Login />}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
