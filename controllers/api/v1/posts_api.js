const post = require('../../../models/post')
module.exports.index = async (req, res) => {

    let posts = await post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
    return res.json(200, {
        message: "list of posts",
        posts: posts
    })
}