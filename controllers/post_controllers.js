const post = require('../models/post');
const comment = require('../models/comments')

module.exports.create = async (req, res) => {
    try {
        await post.create({
            content: req.body.content,
            user: req.user._id
        });
        req.flash('success', 'Post Published')
        return res.redirect('back');
    } catch (error) {
        req.flash('error', error);
        return res.redirect('back');

    }
}

module.exports.destroy = async (req, res) => {

    try {
        let foundpost = await post.findById(req.params.id);
        if (foundpost.user == req.user.id) {
            await foundpost.remove();
            await comment.deleteMany({ post: foundpost._id })
            req.flash('success', 'Post and associated comments deleted')

            return res.redirect('back')
        }
        else {
            req.flash('error', 'You cannot delete this post')

            return res.redirect('back')
        }
    } catch (error) {
        req.flash('error', error)
        return res.redirect('back')

    }
}