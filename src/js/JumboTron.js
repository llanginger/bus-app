import React from "react";

class JumboTron extends React.Component {
  render() {
    return(
      <div>
        <h3>The Bus is: {this.props.delay}</h3>
        <h4>Is {this.props.delayedBy} minutes behind schedule</h4>
        <h4>and is {this.props.timeToStop} away</h4>
      </div>
    )
  }
}

export default JumboTron;
