var passport = require('passport');

module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());
    console.log("Initialized Passposrt and Sess")
    passport.serializeUser(function (user, done) {
        console.log("User Serialized")
        done(null, user);
    });
    
    passport.deserializeUser(function (user, done) {
        console.log("User Deserialized")
        done(null, user);
    });
    
    require('./local.strategy.js')();
};