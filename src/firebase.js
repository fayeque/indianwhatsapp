import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyALtUVnaJSVz4wyIiriGz_nvrlysefKbrA",
    authDomain: "indianwhatsapp-6b5a8.firebaseapp.com",
    databaseURL: "https://indianwhatsapp-6b5a8.firebaseio.com",
    projectId: "indianwhatsapp-6b5a8",
    storageBucket: "indianwhatsapp-6b5a8.appspot.com",
    messagingSenderId: "947613426810",
    appId: "1:947613426810:web:8ec0a51685e5acc66487c3",
    measurementId: "G-SWLZY7KTCD"
  };


  const firebaseApp=firebase.initializeApp(firebaseConfig);

  const db=firebaseApp.firestore();

  const auth=firebase.auth();

  const provider=new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;


