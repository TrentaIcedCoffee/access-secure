import React, { Component } from "react";
import { Button } from "@material-ui/core";

class BlacklistPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Button onClick={() => this.sendDataToParent("warn", "Success!")}>
        test for bl
      </Button>
    );
  }

  sendDataToParent = (type, message) => {
    this.props.parentCallback(type, message);
    console.log("blacklistPage -> Parent");
  };
}
export default BlacklistPage;
