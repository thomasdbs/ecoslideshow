import React, { Component } from 'react'
import Slide from './Slide'
import { database } from '../firebase'

class Slideshow extends Component {

  state = {
    slides:[],
    slideshow:null,
    loading:false
  }

  componentWillMount() {
    // this.addSlideshow("japan_slideshow","Japan")
    // this.addSlide('japan_slideshow', 'First Firebase Slide')
    // this.addSlide('japan_slideshow', 'Second Firebase Slide')
    // this.addSlide('japan_slideshow', 'Third Firebase Slide')
    // this.getSlideshow('japan_slideshow')
  }

  onSubmit = (event) => {
    this.getSlideshow(this.state.slideshow)
    this.setState({loading:true})

    event.preventDefault()
  }

  getAllSlideshows = () => {
    database.ref('/').once('value').then(function(dataSnapshot) {
      alert(JSON.stringify(dataSnapshot))
    })
  }

  getSlideshow = (id) => {
    database.ref(`/${id}`).once('value').then( (data) => {
      if (data.exists() === true) {
        setTimeout( () => {
          this.setState({ slides: data.child('slides').val(), loading:false })
        }, 1000);
      }else {
        this.setState({ loading:false })
        alert('erreur, merci de saisir un ID valide')
      }
    })
  }

  addSlideshow = (pseudo, name) => {
    database.ref('/').push().pseudo
    const model = this.slideshowStructure(pseudo, name)
    return database.ref('/'+ pseudo).set(model)
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

    if (Object.keys(this.state.slides).length === 0 && this.state.loading === true) {
      return (
        <div>Waiting</div>
      )
    }else if(Object.keys(this.state.slides).length > 0 && this.state.loading === false) {

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
    }else {
      return (
        <div className="admin_background">
          <form className="admin_signin" onSubmit={this.onSubmit}>
            <div>
              <div value={this.state.email} onChange={event => this.setState({slideshow: event.target.value})} className="group">
                <input type="text" required />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Slideshow ID</label>
              </div>
              <br />
              <button type="submit">
                Go
              </button>
            </div>
          </form>
        </div>
      )
    }

  }

}

export default Slideshow;
