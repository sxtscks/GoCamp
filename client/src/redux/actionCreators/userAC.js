import firebase from '../../firebase/firebase'

export const userSignUp = (userName, userEmail, userPassword) => async (dispatch, getState) => {
  await firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
    .then(data => {
      firebase.auth().currentUser.updateProfile({
        displayName: userName,
      })
    })
}

export const googleProvider = () => async (dispatch, getState) => {
  const provider = new firebase.auth.GoogleAuthProvider();

  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      const credential = result.credential;

      const token = credential.accessToken;
      const user = result.user;
    })
}

export const sigInFacebook = () => async (dispatch, getState) => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      console.log(result);
      const credential = result.credential;

      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const accessToken = credential.accessToken;
    })
}
export const setUserData = (name, token, uid) => {
  return {
    type: "SET_USER_DATA",
    payload: {
      name, token, uid
    }
  }
}
