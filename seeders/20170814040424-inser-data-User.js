'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [{
      username: 'teacher',
      password: 'teacher',
      role: 'teacher',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'academic',
      password: 'academic',
      role: 'academic',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'headmaster',
      password: 'headmaster',
      role: 'headmaster',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
