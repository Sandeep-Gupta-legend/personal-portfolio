const Analytics = require('../models/Analytics');

// Track page view
exports.trackPageView = async (req, res) => {
  try {
    const { page, referrer, userAgent } = req.body;
    const ipAddress = req.ip || req.connection.remoteAddress;

    await Analytics.trackPageView({
      page,
      referrer,
      userAgent,
      ipAddress,
    });

    res.status(201).json({
      success: true,
      message: 'Page view tracked',
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
    // Don't fail the request for analytics
    res.status(200).json({
      success: false,
      message: 'Failed to track page view',
    });
  }
};

// Track project view
exports.trackProjectView = async (req, res) => {
  try {
    const { projectId, projectTitle } = req.body;

    if (!projectId || !projectTitle) {
      return res.status(400).json({
        success: false,
        message: 'Project ID and title are required',
      });
    }

    await Analytics.trackProjectView({
      projectId,
      projectTitle,
    });

    res.status(201).json({
      success: true,
      message: 'Project view tracked',
    });
  } catch (error) {
    console.error('Error tracking project view:', error);
    res.status(200).json({
      success: false,
      message: 'Failed to track project view',
    });
  }
};

// Get analytics summary
exports.getAnalyticsSummary = async (req, res) => {
  try {
    const { days = 30 } = req.query;

    const summary = await Analytics.getSummary(parseInt(days));

    res.json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error('Error getting analytics summary:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve analytics',
    });
  }
};

// Get popular projects
exports.getPopularProjects = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const projects = await Analytics.getPopularProjects(parseInt(limit));

    res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error('Error getting popular projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve popular projects',
    });
  }
};
