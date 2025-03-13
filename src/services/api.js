// src/services/api.js
import axios from "axios";

// Use environment variable with fallback
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://healthcare-translation-backend-production.up.railway.app';

// Create an axios instance with common configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

/**
 * Send a translation request to the backend
 * @param {string} query - The text to translate
 * @param {string} preferredLanguage - The target language
 * @returns {Promise<Object>} - The translation response
 */
export const translateText = async (query, preferredLanguage) => {
  try {
    // Validate inputs
    if (!query || typeof query !== 'string') {
      throw new Error('Invalid query text');
    }
    
    if (!preferredLanguage || typeof preferredLanguage !== 'string') {
      throw new Error('Invalid preferred language');
    }
    
    console.log(`Sending translation request to: ${API_BASE_URL}`);
    console.log(`Request data: "${query}" to ${preferredLanguage}`);
    
    const response = await apiClient.post('/ai/translate', {
      query,
      preferred_language: preferredLanguage,
    });
    
    return response.data;
  } catch (error) {
    console.error("Translation API error:", error);
    throw error; // Re-throw to allow the hook to handle it
  }
};

// For backward compatibility (can be removed later)
export const sendSpeechToBackend = translateText;