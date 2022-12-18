const mongoose = require('mongoose');

const postschema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
},
    {
        timestamps: true
    })

const post = new mongoose.model('Post', postschema);

module.exports = post;