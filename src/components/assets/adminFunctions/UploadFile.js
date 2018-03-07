import { addSlide } from './AddSlide'

export const uploadFile = () => {

  const filesSelected = document.querySelector('#inputFileToLoad').files;

  if (filesSelected.length > 0) {
    const fileToLoad = filesSelected[0];

    const fileReader = new FileReader();

    fileReader.onload = (fileLoadedEvent) => {
      var srcData = fileLoadedEvent.target.result;
      addSlide(localStorage.getItem("ecoslideshow_slideshow"), srcData, 'Another Firebase Slide')
    }

    fileReader.readAsDataURL(fileToLoad);

  }

}
