import React from "react";

class Button extends React.Component {

  render() {
    return(
      <button className={this.props.class} onClick={this.props.clickFunc}>{this.props.name}</button>
    )
  }
}

export default Button;
