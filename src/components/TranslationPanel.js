// src/components/TranslationPanel.js
import React, { useState, useEffect, useRef } from 'react';
import LanguageSelector from './LanguageSelector';
import TextDisplay from './TextDisplay';
import SpeakButton from './SpeakButton';
import { sendSpeechToBackend } from '../services/api';
import { getLanguageCode } from './languages';
import '../style/TranslationPanel.css';

const TranslationPanel = () => {
  const [inputLanguage, setInputLanguage] = useState('English');
  const [outputLanguage, setOutputLanguage] = useState('Spanish');
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [manualInput, setManualInput] = useState('');
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);

  // Speech recognition setup
  const [recognition, setRecognition] = useState(null);

  // Add a ref to track the current output language
  const outputLanguageRef = useRef(outputLanguage);

  // Update the ref whenever outputLanguage changes
  useEffect(() => {
    outputLanguageRef.current = outputLanguage;
    console.log(`Output language updated to: ${outputLanguage}`);
  }, [outputLanguage]);

  useEffect(() => {
    // Check if speech recognition is supported
    const isSpeechRecognitionSupported = 
      'SpeechRecognition' in window || 
      'webkitSpeechRecognition' in window;
    
    setIsSpeechSupported(isSpeechRecognitionSupported);
    
    if (isSpeechRecognitionSupported) {
      try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognitionInstance = new SpeechRecognition();
        
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = getLanguageCode(inputLanguage);
        
        recognitionInstance.onstart = () => {
          setIsListening(true);
          setError(null);
          // Clear text fields when starting new speech recognition
          setOriginalText('');
          setTranslatedText('');
          setManualInput(''); // Clear the manual input as well
        };
        
        recognitionInstance.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setOriginalText(transcript);
          handleTranslate(transcript);
        };
        
        recognitionInstance.onerror = (event) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
          
          if (event.error === 'not-allowed') {
            setError('Microphone access denied. Please allow microphone access in your browser settings or use the text input below.');
          } else if (event.error === 'network') {
            setError('Network error. Please check your connection and try again or use the text input below.');
          } else {
            setError('Speech recognition failed. Please try using the text input below instead.');
          }
        };
        
        recognitionInstance.onend = () => {
          setIsListening(false);
        };
        
        setRecognition(recognitionInstance);
      } catch (err) {
        console.error('Error initializing speech recognition:', err);
        setIsSpeechSupported(false);
      }
    }
  }, [inputLanguage]);

  // Update the useEffect to log language changes
  useEffect(() => {
    // Log when output language changes
    console.log(`Output language changed to: ${outputLanguage}`);
    
    // Reset translated text when language changes
    setTranslatedText('');
    
    if (recognition) {
      recognition.lang = getLanguageCode(inputLanguage);
    }
    
    // Force a re-render when language changes to ensure state is updated
    const forceUpdate = () => {};
    forceUpdate();
  }, [inputLanguage, outputLanguage, recognition]);

  // Add a useEffect to handle initial setup and language changes
  useEffect(() => {
    // This will run when the component mounts and whenever outputLanguage changes
    console.log(`Output language is now: ${outputLanguage}`);
    
    // Reset translated text when language changes
    if (translatedText) {
      setTranslatedText('');
    }
  }, [outputLanguage]);

  // Separate useEffect for speech recognition to avoid unnecessary re-initialization
  useEffect(() => {
    if (recognition) {
      recognition.lang = getLanguageCode(inputLanguage);
    }
  }, [inputLanguage, recognition]);

  const handleTranslate = async (text) => {
    if (!text.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Use the ref value to ensure we have the current language
      const currentLanguage = outputLanguageRef.current;
      console.log(`Translating to: ${currentLanguage}`);
      
      const result = await sendSpeechToBackend(text, currentLanguage);
      
      if (result.error) {
        setError(result.error);
      } else {
        setTranslatedText(result.translated_text);
      }
    } catch (err) {
      setError('Translation failed. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = () => {
    if (!recognition) {
      setError('Speech recognition is not supported in your browser. Please use the text input below.');
      return;
    }
    
    try {
      // Reset previous results
      setOriginalText('');
      setTranslatedText('');
      setManualInput(''); // Clear the manual input when using speak button
      setError(null);
      
      // Update language before starting
      recognition.lang = getLanguageCode(inputLanguage);
      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setError('Could not start speech recognition. Please use the text input below.');
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualInput.trim()) {
      // Log the current state before translation
      console.log(`Current output language before translation: ${outputLanguage}`);
      
      setOriginalText(manualInput);
      // Pass the current outputLanguage explicitly
      handleTranslate(manualInput);
      
      // Clear the input after submission
      setManualInput('');
    }
  };

  const handleSpeakOriginal = () => {
    if (!originalText) return;
    
    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const speech = new SpeechSynthesisUtterance(originalText);
      speech.lang = getLanguageCode(inputLanguage);
      speech.rate = 1.0; // Normal speed
      speech.pitch = 1.0; // Normal pitch
      speech.volume = 1.0; // Full volume
      
      // Add error handling
      speech.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setError('Failed to play speech. Your browser might not support this feature.');
      };
      
      window.speechSynthesis.speak(speech);
    } catch (err) {
      console.error('Text-to-speech error:', err);
      setError('Text-to-speech is not supported in your browser.');
    }
  };

  const handleSpeakTranslated = () => {
    if (!translatedText) return;
    
    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const speech = new SpeechSynthesisUtterance(translatedText);
      speech.lang = getLanguageCode(outputLanguage);
      speech.rate = 1.0; // Normal speed
      speech.pitch = 1.0; // Normal pitch
      speech.volume = 1.0; // Full volume
      
      // Add error handling
      speech.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setError('Failed to play speech. Your browser might not support this feature.');
      };
      
      window.speechSynthesis.speak(speech);
    } catch (err) {
      console.error('Text-to-speech error:', err);
      setError('Text-to-speech is not supported in your browser.');
    }
  };

  return (
    <div className="translation-panel">
      <div className="panel-header">
        <h2>Healthcare Translation</h2>
        <p>Speak or type medical terms for instant translation</p>
      </div>
      
      <div className="panel-content">
        <LanguageSelector
          key={`language-selector-${inputLanguage}-${outputLanguage}`}
          inputLanguage={inputLanguage}
          setInputLanguage={setInputLanguage}
          outputLanguage={outputLanguage}
          setOutputLanguage={setOutputLanguage}
        />
        
        <div className="text-displays">
          <TextDisplay 
            title={`Original Text (${inputLanguage})`} 
            text={originalText} 
            onSpeak={handleSpeakOriginal}
            language={inputLanguage}
          />
          
          <TextDisplay 
            title={`Translated Text (${outputLanguage})`} 
            text={translatedText} 
            onSpeak={handleSpeakTranslated}
            language={outputLanguage}
          />
        </div>
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        
        {/* Text input as fallback */}
        <div className="manual-input-container">
          <form onSubmit={handleManualSubmit}>
            <input
              type="text"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              placeholder="Type your text here..."
              className="manual-input"
            />
            <button 
              type="submit" 
              className="submit-button" 
              disabled={!manualInput.trim() || isLoading}
            >
              Translate
            </button>
          </form>
        </div>
        
        {isSpeechSupported && (
          <div className="speak-button-container">
            <SpeakButton onClick={handleSpeak} isListening={isListening} />
          </div>
        )}
        
        {isLoading && <p className="loading-indicator">Translating...</p>}
      </div>
    </div>
  );
};

export default TranslationPanel;