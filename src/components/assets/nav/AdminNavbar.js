import React, { Component } from 'react'
import NavItem from './NavItem'
import { deleteSlide } from '../adminFunctions/DeleteSlide'

class AdminNavbar extends Component {

  render() {

    return (
      <nav>

        {(this.props.isNewSlide === false && this.props.editSlide === false) && (
          <NavItem
            function={this.props.goHome}
            tooltip="Accueil"
            icon="ion-ios-home-outline"
          />
        )}

        {(this.props.isNewSlide === false && this.props.editSlide === false) && (
          <NavItem
            function={this.props.addSlide}
            tooltip="Ajouter un slide"
            icon="ion-ios-plus-outline"
          />
        )}

        {(this.props.isNewSlide === false && this.props.editSlide === false) && (
          <NavItem
            function={this.props.startEditSlide}
            tooltip="Modifier ce slide"
            icon="ion-ios-compose-outline"
          />
        )}

        {(this.props.isNewSlide === true || this.props.editSlide === true) && (
          <button className="file-upload">
            <i className="ion-ios-camera-outline"></i>
            {/* <span className="tooltiptext">Importer une photo</span> */}
            <input id="inputFileToLoad" onChange={() => this.props.uploadFile()} className="upload" type="file" />
          </button>
        )}

        {(this.props.isNewSlide === true) && (
          <NavItem
            function={this.props.submitSlide}
            tooltip="Valider"
            icon="ion-ios-checkmark-outline"
          />
        )}

        {(this.props.editSlide === true) && (
          <NavItem
            function={this.props.submitEdit}
            tooltip="Valider"
            icon="ion-ios-checkmark-outline"
          />
        )}

        {(this.props.isNewSlide === false && this.props.editSlide === false) ?
          <NavItem
            function={() => deleteSlide(this.props.slide)}
            tooltip="Supprimer ce slide"
            icon="ion-ios-close-outline"
          />
          :
          <NavItem
            function={this.props.removeSlideForm}
            tooltip="Annuler ce slide"
            icon="ion-ios-close-outline"
          />
        }

      </nav>
    )

  }

}

export default AdminNavbar;
