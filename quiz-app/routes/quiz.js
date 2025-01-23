const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Route: Add a new question
router.post('/add', async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json({ message: 'Question added successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: Get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: Validate the answer
router.post('/validate', async (req, res) => {
  try {
    const { questionId, selectedAnswer } = req.body;
    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.status(200).json({ isCorrect: question.correctAnswer === selectedAnswer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
