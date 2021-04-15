import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'
import './Chat.css'
import { useSelector } from 'react-redux'


const ChatMessage = (props) => {

  const { text, uid, photo, createdAt, displayName } = props.message

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
            'http://planetasharov.ru/upload/shop_1/1/3/4/item_1348/shop_items_catalog_image1348.jpg'
          }
          width="50px"
          height="50px"
          alt="userpic"
          style={{ borderRadius: '30px' }}
        />
        <p style={{ color: 'white', fontWeight: '500' }}>
        </p>
        <p className="textMes">{text}</p>
      </div>
    </div>
  )
}
export default ChatMessage
