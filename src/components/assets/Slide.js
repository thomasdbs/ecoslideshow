import React, { Component } from 'react'
import { addSlide } from './adminFunctions/AddSlide'
import { updateSlide } from './adminFunctions/UpdateSlide'
import UserNavbar from './nav/UserNavbar'
import AdminNavbar from './nav/AdminNavbar'

class Slide extends Component {

  state = {
    picture:null,
    addSlide:false,
    editSlide:false,
    title:this.props.details.text,
    p:this.props.details.p,
    a:this.props.details.a
  }

  addSlide = () => {
    this.setState({ addSlide:true, title:'Mon titre', picture:'', p:'Mon contenu', a:'Mon lien' })
    this.props.stopSlideAnimation()
  }

  startEditSlide = () => {
    this.setState({ editSlide:true, picture:'' })
  }

  removeSlideForm = () => {
    this.setState({ addSlide:false , title:this.props.details.text, editSlide:false, p:this.props.details.p, a:this.props.details.a })
    this.props.restartSlideAnimation()
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
    if (this.state.picture !== null && this.state.title !== '') {
      addSlide(this.state.picture,this.state.title, this.state.p, this.state.a, this.props.numberOfSlides)
    }else {
      alert('merci de choisir une photo et un titre')
    }
  }

  submitEdit = () => {
    if (this.state.title !== '') {
      if (this.state.picture === '') {
        updateSlide(this.props.details.id,this.props.details.picture,this.state.title, this.state.p, this.state.a)
      }else {
        updateSlide(this.props.details.id,this.state.picture,this.state.title,this.state.p, this.state.a)
      }
    }else {
      alert('merci de renseigner un titre')
    }
  }

  render() {

    let isActive = 'slider__slide'
    if (this.props.i === 0) {
      isActive = 'slider__slide slider__slide--active'
    }

    let backgroundImage = 'none'
    if (this.state.addSlide === false && this.state.editSlide === false) {
      backgroundImage = `url(${this.props.details.picture})`
    }else if (this.state.editSlide === true) {
      if (this.state.picture !== '') {
        backgroundImage = `url(${this.state.picture})`
      }else {
        backgroundImage = `url(${this.props.details.picture})`
      }
    }else if (this.state.addSlide === true && this.state.picture !== '') {
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
              removeSlideForm={this.removeSlideForm}
              uploadFile={this.uploadFile}
              submitSlide={this.submitSlide}
              submitEdit={this.submitEdit}
              editSlide={this.state.editSlide}
              startEditSlide={this.startEditSlide}
              a={this.state.a}
            />
          )}

          {(this.props.admin !== true) && (
            <UserNavbar
              goHome={this.props.goHome}
              a={this.state.a}
             />
          )}

          <div className="slider__content">

            {(this.state.addSlide === false && this.state.editSlide === false) ?
              <h1>{this.state.title}</h1>
              :
              <input
                className="slider__input"
                type="text"
                placeholder="Titre"
                value={this.state.title}
                onChange={event => this.setState({ title: event.target.value })}
              />
            }

            {(this.state.addSlide === true || this.state.editSlide === true) && (
              <input
                className="slider__input p"
                placeholder="Lien"
                type="url"
                value={this.state.a}
                onChange={event => this.setState({ a: event.target.value })}
              />
            )}

            {(this.state.addSlide === false && this.state.editSlide === false) ?
              <div className="description p" dangerouslySetInnerHTML={{__html: this.props.details.p}}></div>
              :
              <textarea
                className="slider__input p"
                rows="5"
                placeholder="Contenu"
                value={this.state.p}
                onChange={event => this.setState({ p: event.target.value })}
              />
            }

            <a onClick={ () => this.props.changeSlide()} className="go-to-next">next</a>
          </div>
        </div>
      </div>

    )

  }

}

export default Slide
