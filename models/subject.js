'use strict';
module.exports = function(sequelize, DataTypes) {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  });

  Subject.associate = (model) => {
    Subject.hasMany(model.Teacher)
    Subject.belongsToMany(model.Student, {
      through: 'StudentSubjects'
    })
  }

  return Subject;
};
