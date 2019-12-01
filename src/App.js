import React, { Component } from "react";
import fire from "./config/Fire";
import "./App.css";
import Dashboard from "./components/Dashboard/dashboard";
import { Login, Register } from "./components/Login/index";
//import Login from "./components/Login/login";
//import Register from "./components/Login/register";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true,
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

  changeState() {
    const { isLogginActive } = this.state;
    if (isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }

    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  }
  render() {
    const { user } = this.state;
    const { isLogginActive } = this.state;
    const current = isLogginActive ? "Register" : "Login";
    const currentActive = isLogginActive ? "login" : "register";
    if (user) {
      return <Dashboard />;
    } else {
      return (
        <div className="App">
          <div className="login">
            <div className="container">
              {!user && isLogginActive && (
                <Login containerRef={ref => (this.current = ref)} />
              )}
              {!user && !isLogginActive && (
                <Register containerRef={ref => (this.current = ref)} />
              )}
            </div>
            <RightSide
              current={current}
              containerRef={ref => (this.rightSide = ref)}
              onClick={this.changeState.bind(this)}
            />
          </div>
        </div>
      );
    }
  }
}

const RightSide = props => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default App;
