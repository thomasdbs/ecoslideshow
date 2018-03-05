import React, { Component } from 'react'
import { database } from '../firebase'

class Slide extends Component {

  state = {
    picture:null
  }

  uploadFile = () => {
    const filesSelected = document.querySelector('#inputFileToLoad').files;
    if (filesSelected.length > 0) {
      const fileToLoad = filesSelected[0];

      const fileReader = new FileReader();

      fileReader.onload = (fileLoadedEvent) => {
        var srcData = fileLoadedEvent.target.result;
        this.addSlide('japan_slideshow', srcData, 'Fourth Firebase Slide')
        // var newImage = document.createElement('img');
        // newImage.src = srcData;
        // document.getElementById("imgTest").innerHTML = newImage.outerHTML;
      }
      fileReader.readAsDataURL(fileToLoad);
    }
  }

  addSlide = (id, picture, name) => {
    return new Promise((resolve, reject) => {
      database.ref(`/${id}`).once('value').then((slide) => {
        let slides = slide.child('slides').val() || []
        let key = database.ref(`/${id}`).push().key
        slides.push(this.slideStructure(key, picture, name))
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
              <input id="inputFileToLoad" type="file" onChange={() => this.uploadFile()}/>
              <div dangerouslySetInnerHTML={{__html: labelH1}}></div>
              <a onClick={ () => this.props.changeSlide()} className="go-to-next">next</a>
            </div>
          </div>
        </div>

    )

  }

}

export default Slide;
