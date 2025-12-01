const db = require('../config/db');

class Contact {
  // Create new contact submission
  static async create({ name, email, subject, message }) {
    const query = `
      INSERT INTO contacts (name, email, subject, message, created_at)
      VALUES (?, ?, ?, ?, NOW())
    `;
    
    try {
      const [result] = await db.execute(query, [name, email, subject, message]);
      return result.insertId;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  }

  // Get all contacts
  static async getAll({ limit = 10, offset = 0, unreadOnly = false }) {
    let query = `
      SELECT id, name, email, subject, message, is_read, created_at
      FROM contacts
    `;
    
    if (unreadOnly) {
      query += ' WHERE is_read = 0';
    }
    
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    
    try {
      const [rows] = await db.execute(query, [limit, offset]);
      return rows;
    } catch (error) {
      console.error('Error getting contacts:', error);
      throw error;
    }
  }

  // Get contact by ID
  static async getById(id) {
    const query = `
      SELECT id, name, email, subject, message, is_read, created_at
      FROM contacts
      WHERE id = ?
    `;
    
    try {
      const [rows] = await db.execute(query, [id]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error getting contact by ID:', error);
      throw error;
    }
  }

  // Get count of contacts
  static async getCount({ unreadOnly = false }) {
    let query = 'SELECT COUNT(*) as count FROM contacts';
    
    if (unreadOnly) {
      query += ' WHERE is_read = 0';
    }
    
    try {
      const [rows] = await db.execute(query);
      return rows[0].count;
    } catch (error) {
      console.error('Error getting contact count:', error);
      throw error;
    }
  }

  // Mark contact as read
  static async markAsRead(id) {
    const query = 'UPDATE contacts SET is_read = 1 WHERE id = ?';
    
    try {
      const [result] = await db.execute(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error marking contact as read:', error);
      throw error;
    }
  }

  // Delete contact
  static async delete(id) {
    const query = 'DELETE FROM contacts WHERE id = ?';
    
    try {
      const [result] = await db.execute(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  }
}

module.exports = Contact;
