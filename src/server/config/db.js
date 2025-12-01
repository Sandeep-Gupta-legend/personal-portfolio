const mysql = require('mysql2');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

// Create initial connection without database (to create database if it doesn't exist)
const createDatabaseConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 3306,
});

// Initialize database and tables
const initializeDatabase = async () => {
  return new Promise((resolve, reject) => {
    createDatabaseConnection.connect((err) => {
      if (err) {
        console.error('❌ MySQL connection failed:', err.message);
        console.error('\n⚠️  Please check:');
        console.error('   1. MySQL is running');
        console.error('   2. Credentials in server/.env are correct');
        console.error('   3. MySQL server is accessible\n');
        reject(err);
        return;
      }

      console.log('🔌 Connected to MySQL server');

      // Create database if not exists
      const dbName = process.env.DB_NAME || 'portfolio_db';
      createDatabaseConnection.query(
        `CREATE DATABASE IF NOT EXISTS ${dbName}`,
        (err) => {
          if (err) {
            console.error('❌ Error creating database:', err.message);
            reject(err);
            return;
          }

          console.log(`✅ Database "${dbName}" ready`);

          // Use the database
          createDatabaseConnection.query(`USE ${dbName}`, (err) => {
            if (err) {
              console.error('❌ Error using database:', err.message);
              reject(err);
              return;
            }

            // Create tables
            const createTablesQueries = [
              // Contacts table
              `CREATE TABLE IF NOT EXISTS contacts (
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
              ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

              // Page views table
              `CREATE TABLE IF NOT EXISTS page_views (
                id INT AUTO_INCREMENT PRIMARY KEY,
                page VARCHAR(255) NOT NULL,
                referrer VARCHAR(500),
                user_agent TEXT,
                ip_address VARCHAR(45),
                viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_page (page),
                INDEX idx_viewed_at (viewed_at),
                INDEX idx_ip_address (ip_address)
              ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,

              // Project views table
              `CREATE TABLE IF NOT EXISTS project_views (
                id INT AUTO_INCREMENT PRIMARY KEY,
                project_id VARCHAR(100) NOT NULL UNIQUE,
                project_title VARCHAR(255) NOT NULL,
                view_count INT DEFAULT 1,
                last_viewed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_project_id (project_id),
                INDEX idx_view_count (view_count),
                INDEX idx_last_viewed (last_viewed)
              ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
            ];

            let completedQueries = 0;
            const totalQueries = createTablesQueries.length;

            createTablesQueries.forEach((query, index) => {
              createDatabaseConnection.query(query, (err) => {
                if (err) {
                  console.error(`❌ Error creating table ${index + 1}:`, err.message);
                  reject(err);
                  return;
                }

                completedQueries++;

                if (completedQueries === totalQueries) {
                  console.log('✅ All tables created successfully');
                  console.log('   - contacts');
                  console.log('   - page_views');
                  console.log('   - project_views');
                  createDatabaseConnection.end();
                  resolve();
                }
              });
            });
          });
        }
      );
    });
  });
};

// Create connection pool (will be used after initialization)
let pool;
let promisePool;

const createPool = () => {
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

  promisePool = pool.promise();
};

// Test database connection
const testConnection = async () => {
  try {
    const connection = await promisePool.getConnection();
    console.log('✅ Database connection pool ready\n');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection pool failed:', error.message);
    return false;
  }
};

// Initialize everything
const init = async () => {
  try {
    await initializeDatabase();
    createPool();
    await testConnection();
  } catch (error) {
    console.error('❌ Database initialization failed');
    process.exit(1);
  }
};

// Run initialization
init();

// Export a function that returns the pool
module.exports = {
  getPool: () => promisePool,
  query: (...args) => promisePool.query(...args),
  execute: (...args) => promisePool.execute(...args),
};
