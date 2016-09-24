import React from "react";
import classNames from "classnames";

class ListItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  _clicked() {
    alert(this.props.content)
  }

  render() {
    let listName = this.props.content;
    return(
      <li onClick={this.props.callback} key={this.props.key} className="listItem">{this.props.content}</li>
    )
  }
}

export default ListItem;
