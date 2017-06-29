module.exports = function(req, res, next) {
	if(req.isAuthenticated()) {
    return next();
	} else {
    req.flash("message","You need to log in");
    res.redirect('/login');
    //return res.send(403, { message: 'You need to log in' });
	}
};