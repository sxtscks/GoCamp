import { useRef, useState, useContext, useEffect } from "react";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "./ChatMessage";
import "./Chat.css";
import { useSelector } from "react-redux";
import { db } from "../../firebase/firebase";
import firebase from 'firebase/app';
import { doc } from "prettier";
const Chat = ({ tripId, messages }) => {
  const [formValue, setFormValue] = useState('')
  const [message, setMessage] = useState([])

  const [currentUser, setCurrentUser] = useState({})

  const currentUserLS = JSON.parse(window.localStorage.getItem('myApp'))

  const scroll = useRef();
  const messagesRef = db.collection('Messages')


  useEffect(() => {
    let currentMessages
    if (tripId) {
      currentMessages = db.collection('Trips').doc(tripId).onSnapshot((doc) => {
        Promise.all(doc.data().messages.map(mesId => {
          return db.collection('Messages').doc(mesId).get().then(doc => ({ ...doc.data(), id: doc.id }))
        })).then(allMessages =>{ 
          console.log({allMessages})
          return Promise.all(allMessages.map(message => db.collection('Users').doc(message.uid).get().then(user => user.data().photo ? user.data().photo : '')
          .then(usersWithPhoto => {
            return allMessages.map((el, i) => ({...el, photo: usersWithPhoto[i]})) })
          ))})
          .then(users => setMessage(users))
      })
    }
  }, [tripId])

  console.log(message);

  const query = messagesRef.orderBy("createdAt").limit(25)

  // useEffect(() => {
  //   let myUser
  //   if (tripId) {
  //     myUser = db.collection('Trips').doc(tripId).onSnapshot((doc) => {
  //       Promise.all(doc.data().persons.map((el) => {
  //         return db.collection('Users').doc(el).get().then(doc => ({...doc.data(), id: doc.id}))
  //       })).then(allUsers => )
  //     }
  //   }
  // }, [])


  const sendMessage = async (event) => {
    event.preventDefault();
    const { uid, photoURL, displayName } = currentUserLS;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      // photoURL,
      displayName,
    }).then((doc) => db.collection('Trips').doc(tripId).update({
      "messages": firebase.firestore.FieldValue.arrayUnion(doc.id),
      "timeModified": Date.now()
    }));
    setFormValue("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  console.log(currentUserLS);


  return (
    <div className="chat">
      <main>
        {message && message.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={scroll} />
      </main>
      <form onSubmit={sendMessage} className="chatForm">
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Введите сообщение"
        />
        <button type="submit" disabled={!formValue}>
          Отправить
        </button>
      </form>
    </div>
  );
};
export default Chat;
