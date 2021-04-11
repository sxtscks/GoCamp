user={
    name: String,
    email: String,
    password: String,
    image: String,
    lastTrips: [],
    futureTrips: [],
    friends: [],
}

tripRecomendation={
    name: String,
    about: String,
    weather: String,
    specials: String,
    photo:[],
}

currentTrip={
    name: String,
    author: {
        type: Object.Id,
        ref: 'User'
    },
    date: String,
    persons: [],
    benzin: Number,
    markBenzin: [],
    wayLength: Number,
    checkList: {
        type:Object.id,
        ref:'CheckList'
    }
}

checkList={
    items: []
}

item={
    name: String,
    important: Boolean,
    confirmed: Boolean,
    whoTakes: {
        type: Object.Id,
        ref:'User',
    },
}