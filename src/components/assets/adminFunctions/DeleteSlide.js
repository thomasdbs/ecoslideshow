import { database } from '../../firebase'

export const deleteSlide = id => {

  database.ref(`/${localStorage.getItem("ecoslideshow_slideshow")}`).child('slides').child(id).remove()  

}
