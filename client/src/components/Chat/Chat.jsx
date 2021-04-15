import { useRef, useState, useContext } from "react";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "./ChatMessage";
import "./Chat.css";
import { useSelector } from "react-redux";
import { db } from "../../firebase/firebase";
import firebase from 'firebase/app';

const Chat = ({ id }) => {
  const [formValue, setFormValue] = useState('')
  // const currentUser = useSelector(state => state.user)
const currentUser  = JSON.parse(window.localStorage.getItem('myApp'))
  const scroll = useRef();
  console.log(currentUser, 'CurrentUser');
  const messagesRef = db.collection('messages')
  //.doc(currentUser?.uid).collection('futureTrips').doc(id).collection('messages')

  const query = messagesRef.orderBy("createdAt").limit(25)

  const [messages] = useCollectionData(query, { idField: "id" }) //возвращает массив объектов, где каждый объект - сообщение


  const sendMessage = async (event) => {
    event.preventDefault();
    const { uid, photoURL, displayName } = currentUser;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      // photoURL,
      displayName,
    });

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
