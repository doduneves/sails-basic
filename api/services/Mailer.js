module.exports.sendWelcomeMail = function(obj) {
	sails.hooks.email.send(
		"welcomeEmail", 
		{
			Name: obj.name
		},
		{
			to: obj.email,
			subject: "Welcome Email"
		},

		function(err) {sails.log(err || "Mail Sent!");}
	)
}