var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
bcrypt = require('bcrypt');
 
passport.serializeUser(function(user, done) {
    loggedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        active: user.active,
        userlevel: user.userlevel
    }
    done(null, loggedUser);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        User.findOne({ email: email }).exec(function(err, user) {
            if(err){
                return done(err);
            }
            if(!user){
                return done(null, false, { message: 'Unknown user ' + email });
            }

            bcrypt.compare(password, user.password, function(err, res){
                if(!res)
                    return done(null, false, {message: 'Invalid Password'});
                return done(null, user);
            });
        });
    }
));