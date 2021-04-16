import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'
import './Chat.css'
import { useSelector } from 'react-redux'


const ChatMessage = (props) => {

  const myText = props.text 

  const { text, uid, photo, createdAt, displayName } = props.message

  console.log(props.message);

  const currentUser = useSelector(state => state.user)

  const messageClass = uid === currentUser.uid ? 'sent' : 'received'

  const createdData = createdAt?.toDate() ? new Date(createdAt?.toDate()) : new Date()
  const messageData = createdData.toLocaleTimeString('ru-RU')



  return (
    <div className="mesDes my-3">
      <div className={`message-${messageClass} my-3 mx-3`} style={{display: 'flex', alignSelf: 'center'}}>
        <img
          src={
            photo ||
            'https://firebasestorage.googleapis.com/v0/b/go-camp-610d1.appspot.com/o/sherlock-serial-sherlock-bbc-sherlock-holmes-sherlock-she-45.jpg?alt=media&token=af35c728-0041-46b8-a3a3-011de04ce32e'
          }
          width="50px"
          height="50px"
          alt="userpic"
          style={{ borderRadius: '30px' }}
        />
        <p style={{ color: 'white', fontWeight: '500' }}>
        </p>
        <p className="textMes">{myText}</p>
      </div>
    </div>
  )
}
export default ChatMessage
