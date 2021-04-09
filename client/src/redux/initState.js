const initState = {
  user: {
    displayName: '',
    token: '',
    uid: '',
  },
  todos: [
    {id:'32312sdsf', text:'топор',important:false, confirmed:false },
    {id:'vvdsfbs', text:'удочки',important:false, confirmed:false },
    {id:'bbdfbgwc', text:'водка',important:false, confirmed:false },
  ],
  ring: 20,
  trip: {},
  recommends: [],
  trips: [
    {
      name: 'Поездка на Алтай',
      author: 'Игорь',
      date: '21.04.2021 - 29.04.2021',
      persons: ['Андрей', 'Ирина', 'Николай'],
      id: Date.now()
    },
    {
      name: 'Рыбалка в подмосковье',
      author: 'Николай',
      date: '01.05.2021 - 03.05.2021',
      persons: ['Алексей', 'Федя'],
      id: Date.now()
    },
    {
      name: 'Восхождение на Эльбрус',
      author: 'Георгий',
      date: '09.01.2021 - 16.04.2021',
      persons: ['Николай', 'Илья', 'Аяна'],
      id: Date.now()
    }
  ],
}

export default initState
