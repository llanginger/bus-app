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
console.log('fuck:', this.props.key)
    return(
      <li onClick={this.props.callback} key={this.props.key} className="listItem">{this.props.content}</li>
    )
  }
}

const t = React.PropTypes

ListItem.propTypes = {
  callback: t.func.isRequired,
  key: t.string.isRequired,
  content: t.string.isRequired
}

ListItem.defaultProps = {
  callback: () => {},
  key: '',
  content: ''
}

export default ListItem;
