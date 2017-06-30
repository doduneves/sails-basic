module.exports = function(req, res, next) {
	if(req.isAuthenticated() && req.session.passport.user.userlevel == 'admin') {
    return next();
	} else {
    req.flash("message","You need to be an Administrator");
    res.redirect('/');
    //return res.send(403, { message: 'You need to log in' });
	}
};