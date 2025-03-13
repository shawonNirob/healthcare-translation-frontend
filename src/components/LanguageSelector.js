import React from 'react';
import { LANGUAGES } from './languages';
import '../style/LanguageSelector.css';

const LanguageSelector = ({ inputLanguage, setInputLanguage, outputLanguage, setOutputLanguage }) => {
  // Add immediate state update handlers
  const handleInputLanguageChange = (e) => {
    const newLanguage = e.target.value;
    console.log(`Setting input language to: ${newLanguage}`);
    setInputLanguage(newLanguage);
  };

  const handleOutputLanguageChange = (e) => {
    const newLanguage = e.target.value;
    console.log(`Setting output language to: ${newLanguage}`);
    setOutputLanguage(newLanguage);
  };

  return (
    <div className="language-selector">
      <div className="language-select">
        <label htmlFor="input-language">Input Language:</label>
        <select
          id="input-language"
          value={inputLanguage}
          onChange={handleInputLanguageChange}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
      <div className="language-select">
        <label htmlFor="output-language">Output Language:</label>
        <select
          id="output-language"
          value={outputLanguage}
          onChange={handleOutputLanguageChange}
        >
          {LANGUAGES.map((lang) => (
            <option key={`output-${lang}`} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LanguageSelector;
