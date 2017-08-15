'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Format email salah'
        }
      },
      unique: {
        args: true,
        msg: 'Email sudah ada'
      }
    },
    full_name: DataTypes.STRING
  });

  Student.associate = model => {
    Student.belongsToMany(model.Subject, {
      through: 'StudentSubjects'
    })
  }

  return Student;
};
