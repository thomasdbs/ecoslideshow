import React, { Component } from 'react'
import Slide from './Slide'
import { database } from '../firebase'
import { Redirect } from 'react-router'

class Slideshow extends Component {

  state = {
    slides:[],
    slideshow:null,
    loading:true,
    redirectToHome:false,
    redirectToAdmin:false
  }

  getAllSlideshows = () => {
    database.ref('/').once('value').then(function(dataSnapshot) {
      alert(JSON.stringify(dataSnapshot))
    })
  }

  getSlideshow = (id) => {
    database.ref(`/${id}`).once('value').then( (data) => {
      if (data.exists() === true) {
        this.setState({ slides: data.child('slides').val(), loading:false })
      }else {
        if (this.props.admin === true) {
          localStorage.removeItem("ecoslideshow_admin_token")
          this.setState({ redirectToAdmin:true })
        }else {
          localStorage.removeItem("ecoslideshow_token")
          this.setState({ redirectToHome:true })
        }
      }
    })
  }

  addSlideshow = (pseudo, admin_password, name) => {
    database.ref('/').push().pseudo
    const model = this.slideshowStructure(admin_password, pseudo, name)
    return database.ref('/'+ pseudo).set(model)
  }

  slideshowStructure = (admin_password, pseudo, name) => ({
    admin_password: admin_password,
    id: pseudo,
    name: name,
    slides: []
  })

  componentDidMount() {
    this.getSlideshow(this.props.slideshow)
    for (var i=1; i <= this.state.slides; i++){
      document.querySelector('.slider__indicators').innerHTML += `<div class="slider__indicator" data-slide="${i}"></div>`
    }
    window.addEventListener("keydown", this.onKeyPress)
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyPress)
  }

  onKeyPress = (event) => {
    if(event.key === 'ArrowDown' || event.key === 'ArrowLeft'){
      this.changeSlide(true);
    }else if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
      this.changeSlide()
    }
  }

  goToSlide = newSlide => {
    document.querySelectorAll('.slider__slide').forEach( (s) => s.classList.remove('slider__slide--active') )
    document.querySelector(`.slider__slide[data-slide="${newSlide}"]`).classList.add('slider__slide--active')
  }

  changeSlide = ( previous = false) => {
    let currentSlide = Number(document.querySelector('.slider__slide--active').dataset.slide)
    if (previous === true) {
      currentSlide --
      if (currentSlide < 1) {
        currentSlide = Object.keys(this.state.slides).length
      }
    }else {
      currentSlide ++
      if (currentSlide > Object.keys(this.state.slides).length) {
        currentSlide = 1
      }
    }
    this.goToSlide(currentSlide)
  }

  goHome = () => {
    localStorage.removeItem("ecoslideshow_slideshow")
    if (this.props.admin === true) {
      this.setState({ redirectToAdmin:true })
    }else {
      this.setState({ redirectToHome:true })
    }
  }

  render() {

    if (this.state.redirectToHome === true) {
      return (
        <Redirect to="/" />
      )
    }else if (this.state.redirectToAdmin === true) {
      return (
        <Redirect to="/admin" />
      )
    }else {
      if (Object.keys(this.state.slides).length === 0 && this.state.loading === true) {
        return (
          <div>Waiting</div>
        )
      }else {

        let i = 0
        const posts = Object
        .keys(this.state.slides)
        .map(key =>
          <Slide
            numberOfSlides={Object.keys(this.state.slides).length}
            i={i++}
            key={key}
            details={this.state.slides[key]}
            changeSlide={this.changeSlide}
            admin={this.props.admin}
            goHome={this.goHome}
          />
        )

        return (

          <div className="slider">
            {posts}
            <div className="slider__indicators"></div>
          </div>

        )
      }
    }

  }

}

export default Slideshow;
