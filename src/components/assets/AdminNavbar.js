import React, { Component } from 'react'
import NavItem from './NavItem'
import { deleteSlide } from './adminFunctions/DeleteSlide'
import { uploadFile } from './adminFunctions/UploadFile'

class AdminNavbar extends Component {

  render() {

    return (
      <nav>
        <NavItem
          function={this.props.goHome}
          tooltip="Accueil"
          icon="ion-ios-home-outline"
        />
        <NavItem
          function={() => deleteSlide(this.props.slide)}
          tooltip="Supprimer ce slide"
          icon="ion-ios-close-outline"
        />
        <button className="file-upload">
          <i className="ion-ios-camera-outline"></i>
          <span className="tooltiptext">Importer une photo</span>
          <input id="inputFileToLoad" onChange={() => uploadFile(this.props.numberOfSlides)} className="upload" type="file" />
        </button>
      </nav>
    )

  }

}

export default AdminNavbar;
