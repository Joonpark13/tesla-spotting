import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCJf-LvV8GolejrUWuPsRUpHOgOY9OcacI",
  authDomain: "tesla-spotting.firebaseapp.com",
  databaseURL: "https://tesla-spotting.firebaseio.com",
  projectId: "tesla-spotting",
  storageBucket: "tesla-spotting.appspot.com",
  messagingSenderId: "747911069867"
};
const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;
