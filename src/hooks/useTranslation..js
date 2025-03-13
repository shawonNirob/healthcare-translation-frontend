// src/hooks/useTranslation.js
import { useState } from 'react';
import { translateText } from '../services/api';

const useTranslation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [translationResult, setTranslationResult] = useState(null);

  const translate = async (query, preferredLanguage) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await translateText(query, preferredLanguage);
      setTranslationResult(result);
      return result;
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'An error occurred while translating. Please try again.';
      setError(errorMessage);
      return { error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, translationResult, translate };
};

export default useTranslation;