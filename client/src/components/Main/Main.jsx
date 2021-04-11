import { useSelector } from "react-redux"

function Main() {

  const user = useSelector(state => state.user)

  console.log(user, "USER STATE");
  return (
    <div>
      <h1>Главная</h1>
    </div>
  )
}

export default Main
