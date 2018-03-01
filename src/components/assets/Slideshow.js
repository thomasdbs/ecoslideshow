import React, { Component } from 'react'
import Slide from './Slide'

class Slideshow extends Component {

  state = {
    slides:{
      one: { slide:1, picture:'null', text:'One' },
      two: { slide:2, picture:'null', text:'Two' },
      three: { slide:3, picture:'null', text:'Three' }
    },
    lastScrollTop:0
  }

  componentDidMount() {
    for (var i=1; i <= this.state.slides; i++){
      document.querySelector('.slider__indicators').innerHTML += `<div class="slider__indicator" data-slide="${i}"></div>`
    }
    window.addEventListener("keydown", this.onKeyPress)
    // window.addEventListener("scroll", this.onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyPress)
    // window.removeEventListener("scroll", this.onScroll)

  }

  // onScroll = (event) => {
  //   var st = window.pageYOffset || document.documentElement.scrollTop
  //   if (st > this.state.lastScrollTop){
  //     // downscroll code
  //   } else {
  //     // upscroll code
  //   }
  //   if (document.documentElement.scrollTop <= 50) {
  //     // alert('top')
  //   }
  //   this.setState({ lastScrollTop:st })
  // }

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

    let i = 0
    const posts = Object
    .keys(this.state.slides)
    .map(key => <Slide i={i++} key={key} details={this.state.slides[key]} changeSlide={this.changeSlide} />)
    ;

    // const posts = () => {
    //   for (var i = 0; i < this.state.slides; i++) {
    //     return i
    //   }
    // }

    return (

      <div className="slider">
        {posts}
        <div className="slider__indicators"></div>
      </div>

    )

  }

}

export default Slideshow;
