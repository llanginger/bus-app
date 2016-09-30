import React from "react";
import classNames from "classnames";
import ListItem from "./ListItem";


class Dropdown extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false
    }
  }

  _handleDropDown() {
    this.setState({ open: !this.state.open })
  }

  select(item) {
    this.props.selected = item;
  }


  renderListItems() {
    return this.props.listContent.map((item, i) => <ListItem content={item} key={i}/>)
  }

  render() {

    let dropdownClass = classNames({
      "dropdown": true,
      "open": this.state.open === true,
      "closed": this.state.open === false
    })
    return (
      <div>
        <button onClick={this._handleDropDown.bind(this)}> DropDown </button>
        <ul className={dropdownClass}>
          {this.renderListItems()}
        </ul>
      </div>
    )
  }

}

const t = React.PropTypes

Dropdown.propTypes = {
  listContent: t.array.isRequired
}

export default Dropdown;
