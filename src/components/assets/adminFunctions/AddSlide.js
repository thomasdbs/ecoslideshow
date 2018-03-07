import { database } from '../../firebase'

export const addSlide = (id, picture, name) => {

  return new Promise((resolve, reject) => {

    database.ref(`/${id}`).once('value').then((slide) => {

      let slides = slide.child('slides').val() || []

      let key = database.ref(`/${id}`).push().key

      slides.push({ id:key, picture:picture, text:name })

      database.ref(`/${id}/slides`).set(slides)
      .then( res => {resolve(res)})
      .catch( error => {reject(error)})

    })

  })

}
