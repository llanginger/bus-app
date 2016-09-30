import React from "react";
import ReactDOM from "react-dom";
import DisplayArea from "./DisplayArea";


class App extends React.Component {



  render() {
    return (
      <DisplayArea />
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"))
