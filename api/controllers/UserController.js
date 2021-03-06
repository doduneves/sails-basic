/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	index: function(req, res){
		var query = ""
		if(req.method == 'GET' && req.query["search"]){
			query = req.query["search"];
		}

		User.find({active:true, name: {'like': '%'+query+'%'}}).exec(function(err, users){
			res.render('user/index',{'users':users})
		});
	},

	home: function(req, res){
			res.render('user/home');
	},

	show_deleteds: function(req, res){

		var query = ""
		if(req.method == 'GET' && req.query["search"]){
			query = req.query["search"];
		}

		User.find({active:false, name: {'like': '%'+query+'%'}}).exec(function(err, users){
			res.render('user/showdeleteds',{'users':users})
		});
	},

	view: function(req, res){
		var id = req.param("id", null);

		User.findOne(id).exec(function(err,model){
			res.render('user/view',{'model':model})
		});
	},

	create: function(req, res){
		if(req.method == 'POST' && req.param("User", null)!= null){

			if(req.param("User")['confirm-password'] == req.param("User")['password']){
				User.create(req.param("User")).exec(function(err,model){
					if(err){
						req.flash("message","Error on creating User");
						sails.log(err);
						res.redirect('user/create');
					}else{
						req.flash("message","Successfully created");
						res.redirect('user/');

					}
				})
			}else{
					req.flash("message","Wrong confirmed password");
					res.redirect('user/create');				
			}
		}else{
			res.render('user/create');
		}
	},


	update: function(req, res){
		var id = req.param("id", null);

		if(!id){
			res.render('user/index');
			res.send("No user has been found");
		}else{
			User.findOne(id).exec(function(err,model){
				if(req.method == 'POST' && req.param("User", null)!= null){
					var u = req.param("User", null);

					model.name = u.name;
					model.email = u.email;

					model.save(function(err){
						if(err){
							req.flash("message","Error on updating User");
							res.redirect('user/create');
						}else{
							req.flash("message","Successfully updated");
							res.redirect('user/view/'+model.id);
						}
					});
				}else{
					res.render('user/update', {'model':model})
				}
			});
		}

	},

	change_info: function(req, res){
		var id = req.session.passport.user.id;

		User.findOne(id).exec(function(err,model){
			if(req.method == 'POST' && req.param("User", null)!= null){
				var u = req.param("User", null);

				model.name = u.name;
				model.email = u.email;

				model.save(function(err){
					if(err){
						req.flash("message","Error on updating User");
						res.redirect('user/create');
					}else{
						req.flash("message","Successfully updated");
						res.redirect('user/view/'+model.id);
					}
				});
			}else{
				res.render('user/update', {'model':model})
			}
		});
	},

	delete: function(req, res){
		var id = req.param("id",null);

    User.findOne(id).exec(function(err, user) {

    	user.active = 0;

    	user.save(function(err){
				if(err){
					sails.log(err);
					req.flash("message","Error on removing user");
					res.redirect('user/index');
				}else{
					req.flash("message","Successfully removed");
					res.redirect('user/index');
				}
			});


    	/*
      user.destroy(function(err){
      	if(err){
					res.send("Error on deleting user");
				}else{
					req.flash("message","Successfully removed");
					res.redirect('user/index/');
				}
      });
      */

    });
	},

	// Igual a create, mas para fazer diferentes permissões
	signup: function(req, res){
		if(req.method == 'POST' && req.param("User", null)!= null){

			if(req.param("User")['confirm-password'] == req.param("User")['password']){

				User.count().exec(function(err, found){
					if(found == 0){
						req.param("User")['userlevel'] = 'admin';
					}
					

					User.create(req.param("User")).exec(function(err,model){
						if(err){
							res.send("Some error in creating new user.");
						}else{
							Mailer.sendWelcomeMail(model);
							req.flash("message","Signed up succesful. Use your credentials to access the system.");
							res.redirect('login/');

						}
					})
				});


			}else{
					req.flash("message","Wrong confirmed password");
					res.redirect('signup');				
			}
		}else{
			res.render('signup');
		}
	}

};

module.exports.blueprints = {
  actions: true,
  rest: true,
  shortcuts: true
};


