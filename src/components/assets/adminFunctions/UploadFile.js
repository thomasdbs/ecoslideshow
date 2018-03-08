import { addSlide } from './AddSlide'

export const uploadFile = () => {

  const filesSelected = document.querySelector('#inputFileToLoad').files

  if (filesSelected.length > 0) {
    const fileToLoad = filesSelected[0]

    const fileReader = new FileReader()

    fileReader.onload = (fileLoadedEvent) => {
      const base64 = fileLoadedEvent.target.result
      return base64
      // addSlide(srcData, 'Another Firebase Slide', numberOfSlides)
    }

    fileReader.readAsDataURL(fileToLoad)

  }

}
