const post = require('../models/post');
const comment = require('../models/comments')

module.exports.create = (req, res) => {
    post.create({
        content: req.body.content,
        user: req.user._id
    }, (err, post) => {
        if (err) {
            console.log(('error in creatint the post', err));
        }

        return res.redirect('back');
    }
    );
}

module.exports.destroy = (req, res) => {
    post.findById(req.params.id, (err, post) => {
        if (post.user == req.user.id) {
            post.remove();
            comment.deleteMany({ post: post.id }, (err) => {
                return res.redirect('back')
            })
        }
        else {
            return res.redirect('back')
        }
    })
}