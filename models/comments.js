const mongoose = require('mongoose')

const commentschema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

},
    {
        timestamps: true
    })

const comment = new mongoose.model('Comment', commentschema);

module.exports = comment;