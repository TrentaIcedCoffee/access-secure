import React, { Component } from "react";
import { Button } from "@material-ui/core";

class WhitelistPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Button onClick={() => this.sendDataToParent("success", "WL")}>
        white
      </Button>
    );
  }

  sendDataToParent = (type, message) => {
    this.props.parentCallback(type, message);
    console.log("whitelistPage.js -> Parent");
  };
}
export default WhitelistPage;
