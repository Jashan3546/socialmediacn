const comment = require('../models/comments');
const post = require('../models/post');

module.exports.createComment = (req, res) => {
    post.findById(req.body.post, (err, post) => {
        console.log(req.body.post);
        console.log(post);
        if (err) {
            console.log('error in finding post', err);
        }
        if (post) {
            comment.create({
                comment: req.body.content,
                post: req.body.post,
                user: req.user._id

            }, (err, comment) => {
                if (err) {
                    console.log("error while creating comment", err);
                }
                post.comments.push(comment);
                post.save();
                return res.redirect('/');
            })
        }
    })
}

module.exports.destroy = (req, res) => {
    comment.findById(req.params.id).populate('post').exec((err, comment) => {
        // console.log(comment.post);
        // console.log(comment.post.user);
        // console.log(req.user);
        // console.log(comment.user);
        if (comment.user == req.user.id || comment.post.user == req.user.id) {
            const postid = comment.post;
            comment.remove();

            post.findByIdAndUpdate(postid, { $pull: { comments: req.params.id } }, (err, post) => {
                return res.redirect('back');
            })
        }
        else {
            return res.redirect('back');
        }
    })
}