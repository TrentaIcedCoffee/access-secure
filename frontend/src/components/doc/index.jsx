import React from 'react';

import './styles.sass';

class Doc extends React.Component {
  
  /* FROM PARENT
    syncRouteCallback
  */
  
  componentDidMount = () => {
    this.props.syncRouteCallback();
  }
  
  render() {
    return (
      <div>Doc Page</div>
    );
  }
}

export default Doc;