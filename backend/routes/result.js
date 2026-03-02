const express = require('express');
const { Result, Student } = require('../models');
const router = express.Router();

// Career mapping and descriptions (same as in submit.js)
const careerMapping = {
  analytical: [
    'Software Developer',
    'Data Analyst',
    'Engineer',
    'Scientist',
    'Research Analyst',
    'Financial Analyst'
  ],
  creative: [
    'UI/UX Designer',
    'Animator',
    'Writer',
    'Graphic Designer',
    'Content Creator',
    'Art Director'
  ],
  social: [
    'Teacher',
    'Psychologist',
    'HR Manager',
    'Counselor',
    'Social Worker',
    'Healthcare Professional'
  ],
  practical: [
    'Mechanical Technician',
    'Electrician',
    'Civil Supervisor',
    'Field Engineer',
    'Construction Manager',
    'Maintenance Technician'
  ],
  business: [
    'Entrepreneur',
    'Marketing Manager',
    'Sales Manager',
    'Business Analyst',
    'Product Manager',
    'Management Consultant'
  ]
};

const personalityDescriptions = {
  analytical: 'You have a logical and systematic approach to problem-solving. You excel at analyzing data, identifying patterns, and finding evidence-based solutions.',
  creative: 'You have a natural ability to think outside the box and generate innovative ideas. You excel at artistic expression and creative problem-solving.',
  social: 'You have strong interpersonal skills and enjoy helping others. You excel at understanding people and building meaningful relationships.',
  practical: 'You have hands-on skills and enjoy working with tangible things. You excel at building, fixing, and maintaining physical systems.',
  business: 'You have strong leadership and organizational skills. You excel at managing projects, making strategic decisions, and achieving business goals.'
};

// GET /api/result/:id - Fetch saved result
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Result.findByPk(id, {
      include: [{
        model: Student,
        attributes: ['name', 'age', 'education', 'preferredSubjects']
      }]
    });

    if (!result) {
      return res.status(404).json({ error: 'Result not found' });
    }

    const response = {
      id: result.id,
      student: result.Student,
      scores: {
        analytical: result.analytical,
        creative: result.creative,
        social: result.social,
        practical: result.practical,
        business: result.business
      },
      personality: result.personality,
      description: personalityDescriptions[result.personality],
      careers: careerMapping[result.personality],
      createdAt: result.createdAt
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching result:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
