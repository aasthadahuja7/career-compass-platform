'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const demoResults = [
      {
        id: '660e8400-e29b-41d4-a716-446655440001',
        studentId: '550e8400-e29b-41d4-a716-446655440001',
        analytical: 18,
        creative: 6,
        social: 8,
        practical: 12,
        business: 10,
        personality: 'analytical',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440002',
        studentId: '550e8400-e29b-41d4-a716-446655440002',
        analytical: 8,
        creative: 12,
        social: 20,
        practical: 6,
        business: 8,
        personality: 'social',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440003',
        studentId: '550e8400-e29b-41d4-a716-446655440003',
        analytical: 14,
        creative: 8,
        social: 6,
        practical: 18,
        business: 8,
        personality: 'practical',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('results', demoResults);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('results', null, {});
  }
};
