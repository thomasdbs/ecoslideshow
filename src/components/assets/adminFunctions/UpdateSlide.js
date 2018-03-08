import { database } from '../../firebase'

export const updateSlide = (id, picture, title, p, a) => {

  database.ref(`/${localStorage.getItem("ecoslideshow_slideshow")}`)
  .child('slides')
  .child(id)
  .update({
    picture:picture,
    p:p,
    a:a,
    text:title
  })
  .then( (data) => {
    window.location.reload()
  })

}
