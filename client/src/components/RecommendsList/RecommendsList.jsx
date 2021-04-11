// import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import Recs from "../Recs/Recs"
// import { getCurrentRec } from "../../redux/actionCreators/recsAC"
import TripPage from "../TripPage/TripPage"

function RecommendsList() {

  const dispatch = useDispatch()
  const { id } = useParams()
  // const [recs, setRecs] = useState({})

  const categoriesList = useSelector(state => state.recommends)

  const currentRec = categoriesList.find((el) => el.id === id)

  console.log(currentRec);


  // useEffect(() => {
  //   setRecs(dispatch(getCurrentRec(id)))
  // }, [])

  return (
    <div className='container' style={{ marginTop: '5%' }} >
      <div>
        <h2>Рекоммендации: </h2>
      </div>
      {
        currentRec.topics.length ?
          currentRec.topics.map((theme) => <Recs key={theme.id} title={theme.title} temp={theme.averageTemp} places={theme.places} advices={theme.advices} id={theme.id} />)
          : <h1>Ой, что-то пошло не так :(</h1>
      }
    </div>
  )
}

export default RecommendsList
