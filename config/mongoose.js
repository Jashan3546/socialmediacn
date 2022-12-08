const mongoose = require("mongoose");

const db = mongoose.connect('mongodb://localhost:27017/codingninjas',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(res => {
    console.log('Database connected');
}).catch(e => {
    console.log('oh no error ' + e);
})

module.exports = db;