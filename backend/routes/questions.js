const express = require('express');
const router = express.Router();

// Assessment questions with categories
const questions = [
  {
    id: 1,
    text: "I enjoy analyzing complex problems and finding logical solutions",
    category: "analytical",
    opposite: "creative"
  },
  {
    id: 2,
    text: "I prefer working with my hands to build or repair physical objects",
    category: "practical",
    opposite: "analytical"
  },
  {
    id: 3,
    text: "I often come up with innovative ideas that others haven't considered",
    category: "creative",
    opposite: "practical"
  },
  {
    id: 4,
    text: "I find fulfillment in helping others overcome personal challenges",
    category: "social",
    opposite: "business"
  },
  {
    id: 5,
    text: "I naturally take leadership roles and enjoy organizing group activities",
    category: "business",
    opposite: "social"
  },
  {
    id: 6,
    text: "I prefer systematic approaches with clear steps and predictable outcomes",
    category: "analytical",
    opposite: "creative"
  },
  {
    id: 7,
    text: "I express myself best through artistic or creative mediums",
    category: "creative",
    opposite: "analytical"
  },
  {
    id: 8,
    text: "I enjoy troubleshooting mechanical or technical equipment",
    category: "practical",
    opposite: "social"
  },
  {
    id: 9,
    text: "I feel energized when teaching or mentoring others",
    category: "social",
    opposite: "business"
  },
  {
    id: 10,
    text: " I'm comfortable taking calculated risks to achieve goals",
    category: "business",
    opposite: "social"
  },
  {
    id: 11,
    text: "I prefer working with data and numbers rather than people",
    category: "analytical",
    opposite: "creative"
  },
  {
    id: 12,
    text: "I often see possibilities and connections that others miss",
    category: "creative",
    opposite: "analytical"
  },
  {
    id: 13,
    text: "I enjoy learning how machines and systems work from the inside",
    category: "practical",
    opposite: "social"
  },
  {
    id: 14,
    text: " I'm skilled at mediating conflicts and finding compromises",
    category: "social",
    opposite: "business"
  },
  {
    id: 15,
    text: "I'm motivated by financial success and material achievements",
    category: "business",
    opposite: "social"
  },
  {
    id: 16,
    text: "I prefer evidence-based decision making over intuition",
    category: "analytical",
    opposite: "creative"
  },
  {
    id: 17,
    text: "I enjoy experimenting with new approaches and unconventional methods",
    category: "creative",
    opposite: "analytical"
  },
  {
    id: 18,
    text: "I prefer concrete, tangible results over abstract concepts",
    category: "practical",
    opposite: "social"
  },
  {
    id: 19,
    text: "I prioritize group harmony over individual achievement",
    category: "social",
    opposite: "business"
  },
  {
    id: 20,
    text: "I enjoy competitive environments and striving to be the best",
    category: "business",
    opposite: "social"
  },
  {
    id: 21,
    text: "I find satisfaction in creating efficient systems and processes",
    category: "analytical",
    opposite: "creative"
  },
  {
    id: 22,
    text: "I often daydream about imaginative scenarios and possibilities",
    category: "creative",
    opposite: "analytical"
  },
  {
    id: 23,
    text: "I prefer learning through hands-on experience rather than theory",
    category: "practical",
    opposite: "social"
  },
  {
    id: 24,
    text: "I'm naturally empathetic and can sense others' emotions easily",
    category: "social",
    opposite: "business"
  },
  {
    id: 25,
    text: "I enjoy strategic planning and long-term goal setting",
    category: "business",
    opposite: "social"
  }
];

// GET /api/questions - Return questions list
router.get('/', (req, res) => {
  try {
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
