'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const demoStudents = [
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        name: 'Alex Johnson',
        age: 22,
        education: 'Undergraduate',
        preferredSubjects: 'Computer Science, Mathematics',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        name: 'Sarah Williams',
        age: 25,
        education: 'Graduate',
        preferredSubjects: 'Psychology, Sociology',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        name: 'Mike Chen',
        age: 20,
        education: 'Undergraduate',
        preferredSubjects: 'Engineering, Physics',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('students', demoStudents);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('students', null, {});
  }
};
