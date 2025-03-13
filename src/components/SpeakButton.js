// src/components/SpeakButton.js
import React from 'react';
import '../style/SpeakButton.css';

const SpeakButton = ({ onClick, isListening }) => {
  return (
    <button 
      className={`speak-button-large ${isListening ? 'listening' : ''}`} 
      onClick={onClick}
    >
      {isListening ? '🔴 Listening...' : '🎤 Speak'}
    </button>
  );
};

export default SpeakButton;