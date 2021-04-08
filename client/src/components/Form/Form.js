import { useState } from "react";
import firebase from '../../utill/firebase'
import { auth } from '../../utill/firebase'


// import firebase from 'firebase/app';
// import 'firebase/<PACKAGE>';

const Form = () => {
  const [user, setUser] = useState({ password: '', name: '', email: '' })

  const inputHandler = (e) => {
    console.log({ [e.target.name]: e.target.value });
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const userSignup = async () => {
    await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(data => {
        console.log('here', data);
        firebase.auth().currentUser.updateProfile({
          displayName: user.name,
        })
        
      //  firebase.app.auth.MultiFactorSession()

        // firebase.database().ref('users').set({
        //   generalInfo: {
        //     countOfGames: 0,
        //     countOfSteps: 0,
        //     spentTime: 0,
        //   },
        //   bestGame: {
        //     date: 0,
        //     spentTime: 0,
        //     countOfSteps: 0,
        //   },
        // });
      })
  }
  const createUser = (e) => {
    e.preventDefault()
    userSignup()
    // console.log('Bla');
    // db.collection('users').add({
    //   user
    // })
    //   .then(() => {
    //     console.log('Success');
    //   })
    // const userRef = firebase.database().ref('users');
    // console.log({ userRef })
    // const newUser = {
    //   name: user.name,
    //   email: user.email,
    //   password: user.password
    // }
    // console.log('user');
    // userRef.push(newUser)
    setUser({ name: '', email: '', password: '' })
  }


  return (
    < div >
      <form>
        <input onChange={inputHandler} value={user.name} name="name" placeholder="name" />
        <input onChange={inputHandler} value={user.email} name="email" placeholder="email" />
        <input onChange={inputHandler} value={user.password} name="password" placeholder="pass" />

        <button onClick={createUser} >send</button>
      </form>
    </div >
  );
}

export default Form;
