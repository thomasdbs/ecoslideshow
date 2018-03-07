import React, { Component } from 'react'
import { uploadFile } from './adminFunctions/UploadFile'
import { deleteSlide } from './adminFunctions/DeleteSlide'

class Slide extends Component {

  state = {
    picture:null
  }



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
          <div className="slider__wrap slider__wrap--hacked" >
            <div className="slider__back" style={{ backgroundImage: `url(${this.props.details.picture})` }}></div>
          </div>
          <div className="slider__inner"  style={{ backgroundImage: `url(${this.props.details.picture})` }}>
            <div className="slider__content">
              <input id="inputFileToLoad" type="file" onChange={() => uploadFile()}/>
              <button onClick={() => deleteSlide(this.props.i)}>D</button>
              <div dangerouslySetInnerHTML={{__html: labelH1}}></div>
              <a onClick={ () => this.props.changeSlide()} className="go-to-next">next</a>
            </div>
          </div>
        </div>

    )

  }

}

export default Slide;
