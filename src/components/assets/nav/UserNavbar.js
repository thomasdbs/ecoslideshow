import React, { Component } from 'react'
import NavItem from './NavItem'

class UserNavbar extends Component {

  render() {

    const url = this.props.a
    let link = false
    if (url.includes("http") === true) {
      link = true
    }

    return (
      <nav>

        <NavItem
          function={this.props.goHome}
          tooltip="Accueil"
          icon="ion-ios-home-outline"
        />

        {(link === true) && (
          <NavItem
            link={url}
            tooltip="Lien"
            icon="ion-ios-world-outline"
            isLink={true}
          />
        )}

      </nav>
    )

  }

}

export default UserNavbar;
