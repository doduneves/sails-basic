/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');

module.exports = {

	attributes: {
    name: {
      type: 'string',
    },
    email: {
	    type: 'email',
	    required: true,
      //isUniqueActive: true
    },
    password: {
      type: 'string',
      required: true
    },
    userlevel: {
      type: 'string',
      required: true,
      enum: ['admin', 'normal'],
      defaultsTo: 'normal'
    },
    active: {
      type: 'boolean',
      required: true,
      defaultsTo: 1
    },

    // override default toJSON
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
	},

  types: {
  // Validação de ser único usuário ativo com o email
    isUniqueActive: function(value){
      User.findOne({active:true, email: value}).exec(function(err, record) {
        if(!record){
          return true;
        }
        return false;
      });
    }
  },

	beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if(err) {
          console.log(err);
          cb(err);
        } else {
          user.password = hash;
          //console.log(hash);
          cb(null, user);
        }
      });
    });
	}

};

