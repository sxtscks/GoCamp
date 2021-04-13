import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import firebase from '../firebase/firebase'


const UserContext = createContext()


const UserContextProvider = ({ children }) => {

  // const [currentUser, setCurrentUser] = useState({displayName: '', refreshToken: '', uid: ''})

  // const currentTrips = db.collection('Users').doc(user.uid)
  //   .collection('futureTrips')
  //   .onSnapshot((querySnapshot) => {
  //     setMyTrips(querySnapshot.docs.map((trip) => ({ ...trip.data(), id: trip.id })))
  //   })

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((async (user) => {
  //     if (user) {
  //       setCurrentUser(user?.displayName, user?.refreshToken, user?.uid)
  //       await updateDbUser(user)
  //     }
  //   }))
  // }, [])


  // const updateDbUser = async (sdkUser) => {
  //   await db.collection('Users').doc(sdkUser.uid).set(
  //     {
  //       name: sdkUser.displayName,
  //       email: sdkUser.email,
  //       // photoURL: sdkUser.photoURL,
  //     },
  //     { merge: true }
  //   );
  // };





  return (
    <UserContext.Provider value={{
      // currentUser,
      // setCurrentUser
    }} >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider

const useUserContext = () => useContext(UserContext)

export {
  useUserContext,
}
