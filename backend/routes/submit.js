const express = require('express');
const { Student, Result } = require('../models');
const router = express.Router();

// Career mapping based on personality type
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

// Personality descriptions
const personalityDescriptions = {
  analytical: 'You have a logical and systematic approach to problem-solving. You excel at analyzing data, identifying patterns, and finding evidence-based solutions.',
  creative: 'You have a natural ability to think outside the box and generate innovative ideas. You excel at artistic expression and creative problem-solving.',
  social: 'You have strong interpersonal skills and enjoy helping others. You excel at understanding people and building meaningful relationships.',
  practical: 'You have hands-on skills and enjoy working with tangible things. You excel at building, fixing, and maintaining physical systems.',
  business: 'You have strong leadership and organizational skills. You excel at managing projects, making strategic decisions, and achieving business goals.'
};

// POST /api/submit - Submit answers and calculate result
router.post('/', async (req, res) => {
  try {
    const { studentId, answers } = req.body;

    if (!studentId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ 
        error: 'Student ID and answers array are required' 
      });
    }

    // Verify student exists
    const student = await Student.findByPk(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Initialize scores
    const scores = {
      analytical: 0,
      creative: 0,
      social: 0,
      practical: 0,
      business: 0
    };

    // Get questions for scoring
    const questionsResponse = await fetch(`${process.env.API_BASE_URL || 'http://localhost:5000'}/api/questions`);
    const questions = await questionsResponse.json();

    // Calculate scores based on answers
    answers.forEach((answer, index) => {
      if (index < questions.length) {
        const question = questions[index];
        const score = getScoreValue(answer.answer);
        
        if (answer.answer === 'Strongly Disagree' || answer.answer === 'Disagree') {
          scores[question.opposite] += score;
        } else {
          scores[question.category] += score;
        }
      }
    });

    // Determine personality type (highest score)
    const personality = Object.keys(scores).reduce((a, b) => 
      scores[a] > scores[b] ? a : b
    );

    // Save result to database
    const result = await Result.create({
      studentId,
      analytical: scores.analytical,
      creative: scores.creative,
      social: scores.social,
      practical: scores.practical,
      business: scores.business,
      personality,
    });

    // Prepare response with career suggestions
    const response = {
      id: result.id,
      student: {
        name: student.name,
        age: student.age,
        education: student.education
      },
      scores,
      personality,
      description: personalityDescriptions[personality],
      careers: careerMapping[personality],
      createdAt: result.createdAt
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error submitting assessment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Helper function to get score value
function getScoreValue(answer) {
  switch (answer) {
    case 'Strongly Agree': return 2;
    case 'Agree': return 1;
    case 'Neutral': return 0;
    case 'Disagree': return 1;
    case 'Strongly Disagree': return 2;
    default: return 0;
  }
}

module.exports = router;
