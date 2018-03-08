import React, { Component } from 'react'
import NavItem from './NavItem'

class UserNavbar extends Component {

  render() {

    return (
      <nav>

          <NavItem
            function={this.props.goHome}
            tooltip="Accueil"
            icon="ion-ios-home-outline"
          />

      </nav>
    )

  }

}

export default UserNavbar;
