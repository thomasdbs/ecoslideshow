import React, { Component } from 'react'
import { uploadFile } from './adminFunctions/UploadFile'
import { deleteSlide } from './adminFunctions/DeleteSlide'
import { addSlide } from './adminFunctions/AddSlide'
import UserNavbar from './nav/UserNavbar'
import AdminNavbar from './nav/AdminNavbar'

class Slide extends Component {

  state = {
    picture:null,
    addSlide:false,
    title:this.props.details.text
  }

  addSlide = () => {
    this.setState({ addSlide:true, title:'Mon titre', picture:'' })
    this.props.addSlide()
  }

  deleteNewSlide = () => {
    this.setState({ addSlide:false , title:this.props.details.text })
    this.props.deleteNewSlide()
  }

  uploadFile = () => {

    const filesSelected = document.querySelector('#inputFileToLoad').files

    if (filesSelected.length > 0) {
      const fileToLoad = filesSelected[0]

      const fileReader = new FileReader()

      fileReader.onload = (fileLoadedEvent) => {
        const base64 = fileLoadedEvent.target.result
        this.setState({ picture:base64 })
      }

      fileReader.readAsDataURL(fileToLoad)

    }

  }

  submitSlide = () => {
    addSlide(this.state.picture,this.state.title, this.props.numberOfSlides)
  }

  render() {

    let isActive = 'slider__slide'
    if (this.props.i === 0) {
      isActive = 'slider__slide slider__slide--active'
    }

    let backgroundImage = 'none'
    if (this.state.addSlide === false) {
      backgroundImage = `url(${this.props.details.picture})`
    }else if (this.state.picture !== null) {
      backgroundImage = `url(${this.state.picture})`
    }

    return (

      <div className={isActive} data-slide={this.props.i+1}>
        <div className="slider__wrap slider__wrap--hacked" >
          <div className="slider__back" style={{ backgroundImage: backgroundImage }}></div>
        </div>
        <div className="slider__inner"  style={{ backgroundImage: backgroundImage }}>

          {(this.props.admin === true) && (
            <AdminNavbar
              addSlide={this.addSlide}
              numberOfSlides={this.props.numberOfSlides}
              slide={this.props.details.id}
              goHome={this.props.goHome}
              isNewSlide={this.state.addSlide}
              deleteNewSlide={this.deleteNewSlide}
              uploadFile={this.uploadFile}
              submitSlide={this.submitSlide}
            />
          )}

          {(this.props.admin !== true) && (
            <UserNavbar goHome={this.props.goHome} />
          )}

          <div className="slider__content">

            {(this.state.addSlide === false) ?
              <h1>{this.state.title}</h1>
              :
              <input
                className="slider__input"
                type="text"
                value={this.state.title}
                onChange={event => this.setState({ title: event.target.value })}
              />
            }
            {/* <div dangerouslySetInnerHTML={{__html: labelH1}}></div> */}

            <a onClick={ () => this.props.changeSlide()} className="go-to-next">next</a>
          </div>
        </div>
      </div>

    )

  }

}

export default Slide
