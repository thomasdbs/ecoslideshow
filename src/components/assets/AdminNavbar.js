import React, { Component } from 'react'
import { Redirect } from 'react-router'

class AdminNavbar extends Component {

  render() {

    return (
      <nav>
        <button onClick={() => this.props.goHome()}>
          <i className="ion-ios-home-outline"></i>
        </button>
      </nav>
    )

  }

}

export default AdminNavbar;
