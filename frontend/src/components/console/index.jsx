import React from "react";

import Account from "./account/";
import Cards from "./cards/";
import greyGear from "./assets/grey_gear.png";
import greytintLogo from "./assets/greytint_logo.png";

import "./styles.sass";

class Console extends React.Component {
  /* FROM PARENT
    user
    db
    auth
    syncRouteCallback
  */

  componentDidMount = () => {
    this.props.syncRouteCallback();
  };

  render = () => {
    const { user, db, auth } = this.props;
    return (
      <div>
        <div className="cardPagePhoto">
          {/* <img className="leftPhoto" src={greytintLogo} alt="greyLogo" /> */}
          {/* <img className="rightPhoto" src={greyGear} alt="greyGear" /> */}
        </div>
        {user ? <Cards db={db} user={user} /> : <Account db={db} auth={auth} />}
      </div>
    );
  };
}

export default Console;
