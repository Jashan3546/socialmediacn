const comment = require('../models/comments');
const post = require('../models/post');

module.exports.createComment = async (req, res) => {

    try {
        let foundpost = await post.findById(req.body.post);
        console.log(req.body.post);
        console.log(foundpost);
        if (foundpost) {
            let createdcomment = await comment.create({
                comment: req.body.content,
                post: req.body.post,
                user: req.user._id

            })
            foundpost.comments.push(createdcomment);
            await foundpost.save();
            req.flash('success', 'Comment Added')
            return res.redirect('/');
        }
    } catch (error) {
        req.flash('error', error);
        return res.redirect('/');


    }

    // post.findById(req.body.post, (err, post) => {
    //     console.log(req.body.post);
    //     console.log(post);
    //     if (err) {
    //         console.log('error in finding post', err);
    //     }
    //     if (post) {
    //         comment.create({
    //             comment: req.body.content,
    //             post: req.body.post,
    //             user: req.user._id

    //         }, (err, comment) => {
    //             if (err) {
    //                 console.log("error while creating comment", err);
    //             }
    //             post.comments.push(comment);
    //             post.save();
    //             return res.redirect('/');
    //         })
    //     }
    // })
}

module.exports.destroy = async (req, res) => {
    try {
        let foundcomment = await comment.findById(req.params.id).populate('post')
        if (foundcomment.user == req.user.id || foundcomment.post.user == req.user.id) {
            const postid = foundcomment.post;
            await foundcomment.remove();

            await post.findByIdAndUpdate(postid, { $pull: { comments: req.params.id } })
            req.flash('success', 'Comment Deleted')

            return res.redirect('back');
        }
        else {
            req.flash('error', 'You cannot delete this comment')

            return res.redirect('back');
        }
    } catch (error) {
        req.flash('error', error)
        return res.redirect('back');

    }
}