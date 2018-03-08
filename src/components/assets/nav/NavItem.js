import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavItem extends Component {

  render() {

    if (this.props.isLink === true) {
      return (
        <a href={this.props.link} target="_blank" className="tooltip">
          <span className="tooltiptext">{this.props.tooltip}</span>
          <i className={`${this.props.icon}`}></i>
        </a>
      )

    }else {
      return (
        <button onClick={() => this.props.function()} className="tooltip">
          <span className="tooltiptext">{this.props.tooltip}</span>
          <i className={`${this.props.icon}`}></i>
        </button>
      )
    }

  }

}

export default NavItem;
