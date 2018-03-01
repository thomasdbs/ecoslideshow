import React, { Component } from 'react'

class Slide extends Component {

  render() {

    let isActive = 'slider__slide'
    if (this.props.i === 0) {
      isActive = 'slider__slide slider__slide--active'
    }

    return (

        <div className={isActive} data-slide={this.props.i+1}>
          <div className="slider__wrap slider__wrap--hacked">
            <div className="slider__back"></div>
          </div>
          <div className="slider__inner">
            <div className="slider__content">
              <h1>{this.props.details.text}</h1>
              <a onClick={ () => this.props.changeSlide()} className="go-to-next">next</a>
            </div>
          </div>
        </div>

    )

  }

}

export default Slide;
