const initState = {
  user: {
    name: '',
    token: '',
    uid: '',
  },
  todos: [
    {id:Date.now(), text:'топор'},
  {id:Date.now(), text:'удочки'},
  {id:Date.now(), text:'водка'},
  ],
  trip: {},
  recommends: [],
}

export default initState
