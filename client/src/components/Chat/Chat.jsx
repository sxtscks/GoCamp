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

const Chat = ({ tripId, message }) => {
  const [formValue, setFormValue] = useState('')
  const [messages, setMessages] = useState([])
  // const currentUser = useSelector(state => state.user)
  const currentUser = JSON.parse(window.localStorage.getItem('myApp'))
  const scroll = useRef();
  const messagesRef = db.collection('Messages')

  useEffect(() => {
    let currentTrip

    currentTrip = message && message.map((mes => db.collection('Messages').doc(mes).get().then((doc => ({ ...doc.data(), id: doc.id }))))).then((allMessages)=> setMessages({...messages, allMessages}))

    return () => {
      currentTrip && currentTrip()
    }
  }, [])

  const query = messagesRef.orderBy("createdAt").limit(25)

  // const [messages] = useCollectionData(query, { idField: "id" }) //возвращает массив объектов, где каждый объект - сообщение


  const sendMessage = async (event) => {
    event.preventDefault();
    const { uid, photoURL, displayName } = currentUser;
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

  return (
    <div className="chat">
      <main>
        {messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

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
