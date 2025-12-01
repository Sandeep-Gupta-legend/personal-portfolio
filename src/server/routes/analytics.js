const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// POST - Track page view
router.post('/pageview', analyticsController.trackPageView);

// POST - Track project view
router.post('/project-view', analyticsController.trackProjectView);

// GET - Get analytics summary
router.get('/summary', analyticsController.getAnalyticsSummary);

// GET - Get popular projects
router.get('/popular-projects', analyticsController.getPopularProjects);

module.exports = router;
