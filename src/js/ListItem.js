import React from "react";
import classNames from "classnames";

class ListItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false
    }
  }

  _clicked() {
    alert(this.props.content)
  }

  render() {
    return(
      <li onClick={this._clicked.bind(this)} key={this.props.key} className="listItem">{this.props.content}</li>
    )
  }
}

export default ListItem;
