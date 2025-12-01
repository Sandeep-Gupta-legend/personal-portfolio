const db = require('../config/db');

class Analytics {
  // Track page view
  static async trackPageView({ page, referrer, userAgent, ipAddress }) {
    const query = `
      INSERT INTO page_views (page, referrer, user_agent, ip_address, viewed_at)
      VALUES (?, ?, ?, ?, NOW())
    `;
    
    try {
      const [result] = await db.execute(query, [page, referrer, userAgent, ipAddress]);
      return result.insertId;
    } catch (error) {
      console.error('Error tracking page view:', error);
      throw error;
    }
  }

  // Track project view
  static async trackProjectView({ projectId, projectTitle }) {
    const query = `
      INSERT INTO project_views (project_id, project_title, viewed_at)
      VALUES (?, ?, NOW())
      ON DUPLICATE KEY UPDATE 
        view_count = view_count + 1,
        last_viewed = NOW()
    `;
    
    try {
      const [result] = await db.execute(query, [projectId, projectTitle]);
      return result.insertId;
    } catch (error) {
      console.error('Error tracking project view:', error);
      throw error;
    }
  }

  // Get analytics summary
  static async getSummary(days = 30) {
    const queries = {
      totalPageViews: `
        SELECT COUNT(*) as count
        FROM page_views
        WHERE viewed_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
      `,
      uniqueVisitors: `
        SELECT COUNT(DISTINCT ip_address) as count
        FROM page_views
        WHERE viewed_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
      `,
      totalContacts: `
        SELECT COUNT(*) as count
        FROM contacts
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
      `,
      totalProjectViews: `
        SELECT SUM(view_count) as count
        FROM project_views
        WHERE last_viewed >= DATE_SUB(NOW(), INTERVAL ? DAY)
      `,
      pageViewsByDay: `
        SELECT DATE(viewed_at) as date, COUNT(*) as views
        FROM page_views
        WHERE viewed_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
        GROUP BY DATE(viewed_at)
        ORDER BY date DESC
      `,
    };

    try {
      const [totalPageViews] = await db.execute(queries.totalPageViews, [days]);
      const [uniqueVisitors] = await db.execute(queries.uniqueVisitors, [days]);
      const [totalContacts] = await db.execute(queries.totalContacts, [days]);
      const [totalProjectViews] = await db.execute(queries.totalProjectViews, [days]);
      const [pageViewsByDay] = await db.execute(queries.pageViewsByDay, [days]);

      return {
        totalPageViews: totalPageViews[0].count || 0,
        uniqueVisitors: uniqueVisitors[0].count || 0,
        totalContacts: totalContacts[0].count || 0,
        totalProjectViews: totalProjectViews[0].count || 0,
        pageViewsByDay,
        period: `${days} days`,
      };
    } catch (error) {
      console.error('Error getting analytics summary:', error);
      throw error;
    }
  }

  // Get popular projects
  static async getPopularProjects(limit = 10) {
    const query = `
      SELECT project_id, project_title, view_count, last_viewed
      FROM project_views
      ORDER BY view_count DESC
      LIMIT ?
    `;
    
    try {
      const [rows] = await db.execute(query, [limit]);
      return rows;
    } catch (error) {
      console.error('Error getting popular projects:', error);
      throw error;
    }
  }
}

module.exports = Analytics;
