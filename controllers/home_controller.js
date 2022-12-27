const post = require('../models/post')
const user = require('../models/users')
//const user = require('../models/users')

module.exports.home = async (req, res) => {
    // console.log(req.cookies);
    // post.find({}, (err, posts) => {
    //     return res.render("home", { posts: posts })
    // })

    // const posts = await post.find({}).populate('user');
    // return res.render("home", { posts: posts })

    try {
        let posts = await post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });
        let users = await user.find({});
        return res.render("home", { posts: posts, all_users: users })

    } catch (error) {
        console.log('error occured in homecontroller', error);
        return;
    }

}