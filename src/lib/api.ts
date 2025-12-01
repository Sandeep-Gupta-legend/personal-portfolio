// API utility functions for frontend
import { config } from './config';

// Get API URL from config
const API_BASE_URL = config.apiUrl;

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Contact Form API
export const contactApi = {
  // Submit contact form
  submit: async (formData: ContactFormData): Promise<ApiResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      return {
        success: false,
        message: 'Failed to send message. Please try again later.',
      };
    }
  },

  // Get all submissions (admin only)
  getAll: async (page = 1, limit = 10, unreadOnly = false): Promise<ApiResponse> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/contact/submissions?page=${page}&limit=${limit}&unreadOnly=${unreadOnly}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting submissions:', error);
      return {
        success: false,
        message: 'Failed to retrieve submissions',
      };
    }
  },
};

// Analytics API
export const analyticsApi = {
  // Track page view
  trackPageView: async (page: string): Promise<void> => {
    try {
      await fetch(`${API_BASE_URL}/analytics/pageview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page,
          referrer: document.referrer,
          userAgent: navigator.userAgent,
        }),
      });
    } catch (error) {
      // Silent fail - analytics shouldn't break the app
      console.error('Error tracking page view:', error);
    }
  },

  // Track project view
  trackProjectView: async (projectId: string, projectTitle: string): Promise<void> => {
    try {
      await fetch(`${API_BASE_URL}/analytics/project-view`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId,
          projectTitle,
        }),
      });
    } catch (error) {
      // Silent fail - analytics shouldn't break the app
      console.error('Error tracking project view:', error);
    }
  },

  // Get analytics summary
  getSummary: async (days = 30): Promise<ApiResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics/summary?days=${days}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting analytics:', error);
      return {
        success: false,
        message: 'Failed to retrieve analytics',
      };
    }
  },

  // Get popular projects
  getPopularProjects: async (limit = 10): Promise<ApiResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics/popular-projects?limit=${limit}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting popular projects:', error);
      return {
        success: false,
        message: 'Failed to retrieve popular projects',
      };
    }
  },
};
