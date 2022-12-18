const users = require("../models/users")

module.exports.users = (req, res) => {
    res.render("user_profile")
}

module.exports.signup = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/users/profile")
    }
    return res.render("signup")
}

module.exports.signin = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/users/profile")
    }
    return res.render("signin")
}

module.exports.create = (req, res) => {
    if (req.body.password != req.body.confirm_password) {
        res.redirect("back");
    }
    users.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            console.log("error in finding user in signing up", err);
            return;
        }
        if (!user) {
            users.create(req.body, (err, user) => {
                if (err) {
                    console.log("error in finding user in signing up", err);
                    retrun;
                }
                res.redirect("/users/signin");
            });
        }
        else {
            res.redirect("back")
        }
    })
}

module.exports.createSession = (req, res) => {
    return res.redirect("/")
}

module.exports.destroySessin = (req, res) => {
    req.logout(() => { });
    return res.redirect('/')
}