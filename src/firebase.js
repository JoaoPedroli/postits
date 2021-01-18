import app from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

let firebaseConfig = {
  apiKey: "AIzaSyBX2s2lXQqOgwI-YwdUvZWRq5jeMG0djaw",
  authDomain: "postits-b93ef.firebaseapp.com",
  databaseURL: "https://postits-b93ef-default-rtdb.firebaseio.com",
  projectId: "postits-b93ef",
  storageBucket: "postits-b93ef.appspot.com",
  messagingSenderId: "267197392704",
  appId: "1:267197392704:web:d79b2f732339826e4bbca5",
  measurementId: "G-BZBPLQMJFH"
}

class Firebase{
  constructor(){
    // Initialize Firebase
    app.initializeApp(firebaseConfig);

    this.app = app.database()
    this.auth = app.auth()
  }

  isInitialized()
  {
    return new Promise(resolve => {
      app.auth().onAuthStateChanged(resolve)
    })
  }

  getCurrent()
  {
    return app.auth().currentUser && app.auth().currentUser.email
  }

  getCurrentUid()
  {
    return app.auth().currentUser && app.auth().currentUser.uid
  }

  login(email, password)
  {
    return app.auth().signInWithEmailAndPassword(email, password)
  }
}

export default new Firebase()