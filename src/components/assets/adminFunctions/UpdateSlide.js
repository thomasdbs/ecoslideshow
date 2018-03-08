import { database } from '../../firebase'

export const updateSlide = (id, picture, title) => {

  database.ref(`/${localStorage.getItem("ecoslideshow_slideshow")}`)
  .child('slides')
  .child(id)
  .update({
    picture:picture,
    text:title
  })
  .then( (data) => {
    window.location.reload()
  })

}
