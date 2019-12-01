import React, { Component } from "react";
import fire from "../../config/Fire";

class DataDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      uid: "",
      email: "",
      db: fire.firestore()
    };
  }

  render() {
    return <div></div>;
  }
}

export default DataDisplay;
