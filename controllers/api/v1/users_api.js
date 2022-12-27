const users = require('../../../models/users');
const jwt = require('jsonwebtoken');

module.exports.createsession = async (req, res) => {
    try {
        const user = await users.findOne({ email: req.body.email });
        if (!user || user.password != req.body.password) {
            return res.json(422, {
                message: 'Invalid Username or Password'
            });
        }
        return res.json(200, {
            message: 'signin successful here is your token please keep it safe',
            data: {
                token: jwt.sign(user.toJSON(), 'social', { expiresIn: 100000 })
            }
        })
    } catch (error) {
        return res.json(500, {
            message: 'internal server error'
        })
    }

}