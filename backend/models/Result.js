const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Student = require('./Student');

const Result = sequelize.define('Result', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  studentId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Student,
      key: 'id',
    },
  },
  analytical: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  creative: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  social: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  practical: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  business: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  personality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'results',
  timestamps: true,
});

Result.belongsTo(Student, { foreignKey: 'studentId' });
Student.hasMany(Result, { foreignKey: 'studentId' });

module.exports = Result;
