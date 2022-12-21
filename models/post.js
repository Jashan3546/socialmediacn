const mongoose = require('mongoose');
const { schema } = require('./users');

const postschema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //creating an array of comments in the post
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
    {
        timestamps: true
    })

const post = new mongoose.model('Post', postschema);

module.exports = post;