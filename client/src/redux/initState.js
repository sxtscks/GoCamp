const initState = {
  user: {
    displayName: '',
    token: '',
    uid: '',
  },
  todos: [
    { id: Date.now(), text: 'топор' },
    { id: Date.now(), text: 'удочки' },
    { id: Date.now(), text: 'водка' },
  ],
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
