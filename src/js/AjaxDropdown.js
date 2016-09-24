import React from "react";
import classNames from "classnames";
import ListItem from "./ListItem";
import $ from "jQuery";





class AjaxDropdown extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      listItems: props.listContent,
      ajaxResults: [],
      buttonName: "Dropdown"
    }

    this._changeStop = this._changeStop.bind(this)
  }

  componentDidMount() {
    this.serverRequest = $.ajax({
      url: this.props.ajaxUrl,
      dataType: "jsonp",
    })
    .done (function(data) {

      this.setState({
        ajaxResults: data.data.list,
        buttonName: data.data.list[0].name
      })
      console.log(this.state)
    }.bind(this))
    .fail(function(error) {
      console.log(error)
    });
  }

  _changeStop() {
    console.log("change stop called")
    console.log(this.props.content)
    this.setState({buttonName: this.props.content})
  }
  _sayHello() {
    console.log("hello")
  }

  _handleDropDown() {
    this.setState({ open: !this.state.open })
  }

  select(item) {
    this.props.selected = item;
  }


  renderListItems() {
    let items = [];
    this.state.ajaxResults.map(function(item, i){
      items.push(<ListItem content={item.name} key={i} callback={this._changeStop.bind(this)} />)
    }.bind(this))

    return items;
  }

  render() {

    let dropdownClass = classNames({
      "dropdown": true,
      "open": this.state.open === true,
      "closed": this.state.open === false
    })
    return (
      <div>
        <button onClick={this._handleDropDown.bind(this)}> {this.state.buttonName} </button>
        <ul className={dropdownClass}>
          {this.renderListItems()}
        </ul>
      </div>
    )
  }

}


export default AjaxDropdown;
