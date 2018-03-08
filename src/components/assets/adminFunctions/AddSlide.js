import { database } from '../../firebase'
import { unicKey } from './UnicKey'

export const addSlide = (picture, name, numberOfSlides) => {

  const unicID = unicKey() + unicKey() + '-' + unicKey() + '-' + unicKey() + '-' + unicKey() + '-' + unicKey() + unicKey() + unicKey()

  const slidePositionKey = numberOfSlides + unicID

  return database.ref(`/${localStorage.getItem("ecoslideshow_slideshow")}/slides/${slidePositionKey}`).set({ id:slidePositionKey, picture:picture, text:name })

}
