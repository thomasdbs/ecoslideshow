import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBMhRARyogK82xJ9p53LM5VQocmEhcwAN4",
  authDomain: "ecoslideshow.firebaseapp.com",
  databaseURL: "https://ecoslideshow.firebaseio.com",
  projectId: "ecoslideshow",
  storageBucket: "",
  messagingSenderId: "836534538735"
}

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
};
