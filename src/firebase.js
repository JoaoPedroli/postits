import app from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

let firebaseConfig = {
  // config
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
