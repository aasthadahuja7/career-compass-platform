const express = require('express');
const { Student } = require('../models');
const router = express.Router();

// POST /api/session - Create student sessions
router.post('/', async (req, res) => {
  try {
    const { name, age, education, preferredSubjects } = req.body;

    if (!name || !age || !education) {
      return res.status(400).json({ 
        error: 'Name, age, and education are required' 
      });
    }

    const student = await Student.create({
      name,
      age: parseInt(age),
      education,
      preferredSubjects: preferredSubjects || null,
    });

    res.status(201).json({
      id: student.id,
      name: student.name,
      age: student.age,
      education: student.education,
      preferredSubjects: student.preferredSubjects,
    });
  } catch (error) {
    console.error('Error creating student session:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
