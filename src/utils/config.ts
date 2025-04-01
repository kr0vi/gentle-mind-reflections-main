// Configuration settings for the application

/**
 * Gemini API key - can be set via environment variable
 * In production, this should be set via environment variables
 * For local development, you can set it here directly (not recommended for public repos)
 */
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

/**
 * Gemini API URL
 */
export const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

/**
 * Max tokens to generate in the response
 */
export const MAX_OUTPUT_TOKENS = 1024;

/**
 * Whether to use fallback responses instead of API
 * Useful for development without an API key
 */
export const USE_FALLBACK_RESPONSES = !GEMINI_API_KEY; 