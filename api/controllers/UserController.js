/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	index: function(req, res){
		User.find().exec(function(err, users){
			res.render('user/index',{'users':users})
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
			User.create(req.param("User")).exec(function(err,model){
				if(err){
					res.send("Some error in creating new user.");
				}else{
					req.flash("message","Successfully created");
					res.redirect('user/');

				}
			})
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
					model.password = u.password;

					model.save(function(err){
						if(err){
							res.send("Error on update user");
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

	delete: function(req, res){
		var id = req.param("id",null);

    User.findOne(id).exec(function(err, user) {

      user.destroy(function(err){
      	if(err){
					res.send("Error on deleting user");
				}else{
					req.flash("message","Successfully removed");
					res.redirect('user/index/');
				}
      });
    });
	}

};
