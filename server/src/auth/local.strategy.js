var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function () {
    console.log("Reached localstrategy")
    passport.use(new LocalStrategy({
            usernameField: 'user',
            passwordField: 'pass'
        },
        function (username, password, done) {
            console.log("Reached local strategy internal func")
            var user = {
                username: username,
                password: password
            };
        //Hardcoded credentials for testing here.
        //Inject salesforce db query here
        if (user.username === 'foo' && user.password === 'bar') {
            done(null, user);
        } else {
            done(null, false);
        }
    }));
};