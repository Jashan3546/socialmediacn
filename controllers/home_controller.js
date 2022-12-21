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

    post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec((err, posts) => {
            user.find({}, (err, users) => {
                if (err) {
                    console.log('error occured', err);
                }
                return res.render("home", { posts: posts, all_users: users })
            })

        })


}