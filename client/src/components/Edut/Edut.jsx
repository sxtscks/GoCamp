import { db } from "../../firebase/firebase"

const Edut = ({ trip }) => {
  const [people, setPeople] = useState([])

  useEffect(() => {
    trip.persons.map((el) => {
      Promise.all(db.collection('Users').document(el).onSnapshot((doc) => {
        setPeople([...persons, { ...doc.data(), id: doc.id }])
      })


        // return () => {
        //   currentTrip && currentTrip()
      )
    })

  }, [trip.persons])

  return (
    <div>
      <div>EDUT</div>
      {
        people.length ? people.map((el) => {
          return <div className='d-flex'>
            <img src={el.photo} style={{ width: 30, height: 30 }} alt="" />
          </div>
        })
      }
    </div>
  );
}

export default Edut;
