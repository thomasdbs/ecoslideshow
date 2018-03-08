import { database } from '../../firebase'

export const deleteSlide = id => {

  const deletedSlide = database.ref(`/${localStorage.getItem("ecoslideshow_slideshow")}`).child('slides').child(id).remove().then( (data) => {
    window.location.reload()
  })

  alert(deletedSlide)
}
