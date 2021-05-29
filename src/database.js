const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://jagama:abc123xyz@a-la-mesa.0omuj.mongodb.net/a-la-mesa?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(db => console.log('Base de datos conectada'))
    .catch(err => console.error(err));