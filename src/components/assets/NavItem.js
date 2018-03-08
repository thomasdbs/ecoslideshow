import React, { Component } from 'react'

class NavItem extends Component {

  render() {

    return (
      <button onClick={() => this.props.function()} className="tooltip">
        <span className="tooltiptext">{this.props.tooltip}</span>
        <i className={`${this.props.icon}`}></i>
      </button>
    )

  }

}

export default NavItem;
