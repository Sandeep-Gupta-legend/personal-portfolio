-- Portfolio Database Schema
-- Author: Sandeep Rammilan Gupta
-- Created: 2025-10-26

-- Create database (run this first)
CREATE DATABASE IF NOT EXISTS portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE portfolio_db;

-- Table: contacts
-- Stores contact form submissions
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_created_at (created_at),
  INDEX idx_is_read (is_read),
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: page_views
-- Tracks page views and visitor analytics
CREATE TABLE IF NOT EXISTS page_views (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page VARCHAR(255) NOT NULL,
  referrer VARCHAR(500),
  user_agent TEXT,
  ip_address VARCHAR(45),
  viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_page (page),
  INDEX idx_viewed_at (viewed_at),
  INDEX idx_ip_address (ip_address)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: project_views
-- Tracks individual project views
CREATE TABLE IF NOT EXISTS project_views (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id VARCHAR(100) NOT NULL UNIQUE,
  project_title VARCHAR(255) NOT NULL,
  view_count INT DEFAULT 1,
  last_viewed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_project_id (project_id),
  INDEX idx_view_count (view_count),
  INDEX idx_last_viewed (last_viewed)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional: Create a user for the application
-- Replace 'your_password' with a strong password
-- CREATE USER 'portfolio_user'@'localhost' IDENTIFIED BY 'your_password';
-- GRANT ALL PRIVILEGES ON portfolio_db.* TO 'portfolio_user'@'localhost';
-- FLUSH PRIVILEGES;

-- Insert sample data (optional - for testing)
-- INSERT INTO contacts (name, email, subject, message) VALUES
-- ('John Doe', 'john@example.com', 'Test Subject', 'This is a test message'),
-- ('Jane Smith', 'jane@example.com', 'Another Test', 'Another test message');

-- View to get unread contacts count
CREATE OR REPLACE VIEW unread_contacts_count AS
SELECT COUNT(*) as unread_count
FROM contacts
WHERE is_read = FALSE;

-- View to get recent activity summary
CREATE OR REPLACE VIEW recent_activity AS
SELECT 
  (SELECT COUNT(*) FROM contacts WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)) as contacts_last_7_days,
  (SELECT COUNT(*) FROM page_views WHERE viewed_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)) as views_last_7_days,
  (SELECT COUNT(DISTINCT ip_address) FROM page_views WHERE viewed_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)) as unique_visitors_last_7_days;
