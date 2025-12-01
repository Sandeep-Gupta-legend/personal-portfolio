// Configuration file for the portfolio website
// Update these values according to your setup

export const config = {
  // API Configuration
  // When backend is running locally, use: 'http://localhost:5000/api'
  // When deployed, use your production API URL: 'https://api.yourname.com/api'
  apiUrl: 'http://localhost:5000/api',
  
  // Feature Flags
  features: {
    // Enable/disable backend integration
    // Set to false to use localStorage for demo purposes
    useBackend: true,
    
    // Enable/disable analytics tracking
    enableAnalytics: true,
  },
  
  // Contact Information
  contact: {
    email: 'sandeep.gupta@email.com',
    phone: '+91 1234567890',
    location: 'India',
  },
  
  // Social Media Links
  social: {
    github: 'https://github.com',
    linkedin: 'https://www.linkedin.com/in/sandeep-gupta-937673371/',
    twitter: 'https://twitter.com',
  },
};
