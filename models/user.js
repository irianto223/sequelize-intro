'use strict';

const encrypt = require('../helpers/encrypt')

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: {
        args: true, // tidak harus ada, karena di skema databasenya column ini sudah di-set unique
        msg: 'Username sudah ada.'
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password tidak boleh kosong.'
        }
      }
    },
    role: DataTypes.STRING,
    secret: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
      unique: {
        args: true,
        msg: 'secret harus unique'
      }
    }
  }, {
    // classMethods: {
    //   associate: function(models) {
    //     // associations can be defined here
    //   }
    // }
    hooks: {
      beforeCreate: user => {
        user.password = encrypt(user.secret, user.password)
      }
    }
  });
  return User;
};
