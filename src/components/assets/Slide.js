import React, { Component } from 'react'

class Slide extends Component {

  render() {

    let isActive = 'slider__slide'
    if (this.props.i === 0) {
      isActive = 'slider__slide slider__slide--active'
    }

    let labelH1 = this.props.details.text
    if(this.props.admin === true){
      labelH1 = `<input class="slider__input" type="text" placeholder="contenu" maxlength="28" value="${this.props.details.text}" />`
    }

    return (

        <div className={isActive} data-slide={this.props.i+1}>
          <div className="slider__wrap slider__wrap--hacked">
            <div className="slider__back"></div>
          </div>
          <div className="slider__inner">
            <div className="slider__content">
              <div dangerouslySetInnerHTML={{__html: labelH1}}></div>
              <a onClick={ () => this.props.changeSlide()} className="go-to-next">next</a>
            </div>
          </div>
        </div>

    )

  }

}

export default Slide;
