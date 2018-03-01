import React, { Component } from 'react'
import Slide from './Slide'
import { database } from '../firebase'

class Slideshow extends Component {

  state = {
    slides:[]
  }

  componentWillMount() {
    // this.addSlideshow("Japon")
    // this.addSlide('-L6WFjXM2kEToDpUyNXY', 'First Firebase Slide')
    // this.addSlide('-L6WFjXM2kEToDpUyNXY', 'Second Firebase Slide')
    this.getSlideshow('-L6WFjXM2kEToDpUyNXY')
  }

  getAllSlideshows = () => {
    database.ref('/').once('value').then(function(dataSnapshot) {
      alert(JSON.stringify(dataSnapshot))
    })
  }

  getSlideshow = (id) => {
    database.ref(`/${id}`).once('value').then( (dataSnapshot) => {
      this.setState({ slides: dataSnapshot.child('slides').val() })
    })
  }

  addSlideshow = (name) => {
    const key = database.ref('/').push().key
    const model = this.slideshowStructure(key, name)
    return database.ref('/'+ key).set(model)
  }

  slideshowStructure = (id, name) => ({
    id: id,
    name: name,
    slides: []
  })

  addSlide = (id, name) => {
    return new Promise((resolve, reject) => {
      database.ref(`/${id}`).once('value').then((slide) => {
        let slides = slide.val().slides || []
        let key = database.ref(`/${id}`).push().key
        slides.push(this.slideStructure(key, 'test.png', name))
        database.ref(`/${id}/slides`).set(slides)
        .then( res => {resolve(res)})
        .catch( error => {reject(error)})
      })
    })
  }

  slideStructure = (id, picture, name) => {
    return {
      id: id,
      picture: picture,
      text: name
    }
  }

  componentDidMount() {
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


  render() {

    if (Object.keys(this.state.slides).length === 0) {
      return (
        <div>Waiting</div>
      )
    }else {

      let i = 0
      const posts = Object
      .keys(this.state.slides)
      .map(key => <Slide i={i++} key={key} details={this.state.slides[key]} changeSlide={this.changeSlide} admin={this.props.admin} />)
      ;

      return (

        <div className="slider">
          {posts}
          <div className="slider__indicators"></div>
        </div>

      )
    }

  }

}

export default Slideshow;
