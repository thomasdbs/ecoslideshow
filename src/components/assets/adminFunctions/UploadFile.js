import { addSlide } from './AddSlide'

export const uploadFile = numberOfSlides => {

  const filesSelected = document.querySelector('#inputFileToLoad').files;

  if (filesSelected.length > 0) {
    const fileToLoad = filesSelected[0];

    const fileReader = new FileReader();

    fileReader.onload = (fileLoadedEvent) => {
      var srcData = fileLoadedEvent.target.result;
      addSlide(srcData, 'Another Firebase Slide', numberOfSlides)
    }

    fileReader.readAsDataURL(fileToLoad);

  }

}
