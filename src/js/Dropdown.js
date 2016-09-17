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
    let items = [];
    this.props.listContent.map(function(item, i){
      items.push(<ListItem content={item} key={i}/>)
    })

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
        <button onClick={this._handleDropDown.bind(this)}> DropDown </button>
        <ul className={dropdownClass}>
          {this.renderListItems()}
        </ul>
      </div>
    )
  }

}


export default Dropdown;





































//
//
//
//
//
//
//
//
//
// var Dropdown = React.createClass({
//     getInitialState: function() {
//         return {
//             listVisible: false
//         };
//     },
//
//     select: function(item) {
//         this.props.selected = item;
//     },
//
//     show: function() {
//         this.setState({ listVisible: true });
//         document.addEventListener("click", this.hide);
//     },
//
//     hide: function() {
//         this.setState({ listVisible: false });
//         document.removeEventListener("click", this.hide);
//     },
//
//     render: function() {
//         return <div className={"dropdown-container" + (this.state.listVisible ? " show" : "")}>
//             <div className={"dropdown-display" + (this.state.listVisible ? " clicked": "")} onClick={this.show}>
//                 <span style={{ color: this.props.selected.hex }}>{this.props.selected.name}</span>
//                 <i className="fa fa-angle-down"></i>
//             </div>
//             <div className="dropdown-list">
//                 <div>
//                     {this.renderListItems()}
//                 </div>
//             </div>
//         </div>;
//     },
//
//     renderListItems: function() {
//         var items = [];
//         for (var i = 0; i < this.props.list.length; i++) {
//             var item = this.props.list[i];
//             items.push(<div onClick={this.select.bind(null, item)}>
//                 <span style={{ color: item.hex }}>{item.name}</span>
//             </div>);
//         }
//         return items;
//     }
// });


//
// React.render(<Dropdown list={colours} selected={colours[0]} />, document.getElementById("container"));
