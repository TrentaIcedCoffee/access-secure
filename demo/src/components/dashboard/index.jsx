import React from 'react';

class Dashboard extends React.Component {
  render = () => {
    return (
      <div>
        Dashboard {this.props.match.params.appId}
      </div>
    );
  }
}

export default Dashboard;