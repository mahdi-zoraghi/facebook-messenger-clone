import firebase from "firebase/app"

import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDaOvBvJunzGuB-5kM38nd4rxFlLbYoVaY",
  authDomain: "facebook-messenger-clone-72213.firebaseapp.com",
  projectId: "facebook-messenger-clone-72213",
  storageBucket: "facebook-messenger-clone-72213.appspot.com",
  messagingSenderId: "1061401867427",
  appId: "1:1061401867427:web:2ea25cb01e85ce5e8c3b16",
  measurementId: "G-SJWJ0MMMR7",
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()

export { db }
