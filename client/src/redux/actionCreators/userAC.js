import firebase from '../../firebase/firebase'

export const userSignUp = (userName = '', userEmail = '', userPass = '') => async (dispatch, getState) => {
  await firebase.auth().createUserWithEmailAndPassword(userEmail, userPass)
    .then(data => {
      firebase.auth().currentUser.updateProfile({
        displayName: userName,
      })
    })
  const { user: { token, uid } } = getState()
  dispatch( setUserData(userName, token, uid))
}


export const setUserData = (name, token, uid) => {
  return {
    type: "SET_USER_DATA",
    payload: {
      name, token, uid
    }
  }
}
