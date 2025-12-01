const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// POST - Submit contact form
router.post('/submit', contactController.submitContactForm);

// GET - Get all contact submissions (admin)
router.get('/submissions', contactController.getAllSubmissions);

// GET - Get contact submission by ID
router.get('/submissions/:id', contactController.getSubmissionById);

// PUT - Mark submission as read
router.put('/submissions/:id/read', contactController.markAsRead);

// DELETE - Delete submission
router.delete('/submissions/:id', contactController.deleteSubmission);

module.exports = router;
