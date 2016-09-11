import React from "react";
import BusAnim from "./BusAnim";
import Button from "./Button";
import classNames from "classnames";

class DisplayArea extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      color: "green"
    }
  }

  setRed() {
    console.log(this.state.color)
    if (this.state.color === "green") {
      return this.setState({color: "red"})
    } else {
      return this.setState({color: "green"})
    }

  }

  render() {
    var daClass = classNames({
      "displayArea": true,
      "green": this.state.color === "green",
      "red": this.state.color === "red"
    })
    return(
      <div className={daClass} >
        <BusAnim />
        <Button name="set to red" clickFunc={this.setRed.bind(this)} />
      </div>
    )
  }
}

export default DisplayArea;
