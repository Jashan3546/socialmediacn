const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/codingninjas').then(res => {
    console.log('Database connected');
}).catch(e => {
    console.log('oh no error ' + e);
})

const db = mongoose.connection;

db.once("open", () => {
    console.log('mongo connected ');
})



module.exports = db;