import React, { useState } from 'react';
import { LIMITED_SUPPORT_LANGUAGES, getLanguageCode } from './languages';
import '../style/TextDisplay.css';

const TextDisplay = ({ title, text, onSpeak, language }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const hasLimitedSupport = LIMITED_SUPPORT_LANGUAGES.includes(language);

  const handleSpeak = () => {
    if (!text) return;
    
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in your browser.');
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    const isLanguageSupported = voices.some(voice => voice.lang.startsWith(getLanguageCode(language)));

    if (!isLanguageSupported) {
      alert(`Sorry, ${language} is not supported for speech synthesis in your browser.`);
      return;
    }

    setIsSpeaking(true);
    
    const handleSpeechEnd = () => {
      setIsSpeaking(false);
    };
    
    window.speechSynthesis.addEventListener('end', handleSpeechEnd);
    onSpeak();
    
    setTimeout(() => {
      window.speechSynthesis.removeEventListener('end', handleSpeechEnd);
      setIsSpeaking(false);
    }, 10000);
  };

  return (
    <div className="text-display">
      <div className="text-header">
        <h3>{title}</h3>
        <button 
          onClick={handleSpeak} 
          className={`speak-button ${isSpeaking ? 'speaking' : ''}`}
          disabled={!text || hasLimitedSupport}
          title={text ? (hasLimitedSupport ? 
            `Listen (Note: ${language} may have limited support)` : 
            "Listen") : 
            "No text to speak"}
        >
          <span style={{ fontSize: 'inherit' }}>🔊</span>
        </button>
      </div>
      <div className="text-content">
        {text ? (
          <p>{text}</p>
        ) : (
          <p className="placeholder-text">Text will appear here...</p>
        )}
      </div>
      {hasLimitedSupport && (
        <div className="language-warning">
          {language} may have limited or no speech synthesis support in your browser.
        </div>
      )}
    </div>
  );
};

export default TextDisplay; 