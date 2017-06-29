module.exports.email = {
	service: "Mailgun",
	auth: {
		user: "postmaster@sandbox2839a7b3eb764e4da892626e30bfd4a3.mailgun.org", 
		pass: "1ceb2e75bf1e17ceb6decc89a400badb"
	},
	templateDir: "views/emailTemplates",
	from: "no-reply@sails-basic.com",
	testMode: false,
	ssl: true
}