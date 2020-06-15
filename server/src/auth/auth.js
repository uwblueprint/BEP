var express    = require('express');
var authRouter = express.Router();
var passport   = require('passport');

var router = function () {
    console.log("Reached authrouter")
    authRouter.route('/login')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function (req, res) {
            res.json({"Status":"Failed"});
            res.redirect('/');
        });
    
    return authRouter;
};

module.exports = router;