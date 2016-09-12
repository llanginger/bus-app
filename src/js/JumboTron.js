import React from "react";

class JumboTron extends React.Component {
  render() {
    return(
      <h3>The Bus is: {this.props.delay}</h3>
    )
  }
}

export default JumboTron;
