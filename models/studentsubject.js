'use strict';
module.exports = function(sequelize, DataTypes) {
  var StudentSubject = sequelize.define('StudentSubject', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER
  });

  StudentSubject.associate = model => {
    StudentSubject.belongsTo(model.Student)
    StudentSubject.belongsTo(model.Subject)
  }

  return StudentSubject;
};
