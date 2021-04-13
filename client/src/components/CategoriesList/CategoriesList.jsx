import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getRecs } from "../../redux/actionCreators/recsAC"

function CategoriesList() {

  const categoriesList = useSelector(state => state.recommends)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRecs(categoriesList))
  }, [])


  return (
    <div className='container' style={{ marginTop: '5%' }} >
      <div>
        <h2>Категории:</h2>
      </div>
      {/* {
        categoriesList.length ?
          categoriesList.map((category) => <Categories key={category.id} title={category.title} id={category.id} />)
          : <h1>Ой, что-то пошло не так :(</h1>
      } */}

    </div>
  )
}

export default CategoriesList
