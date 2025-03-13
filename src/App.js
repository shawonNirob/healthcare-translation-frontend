// src/App.js
import React from 'react';
import './App.css';
import TranslationPanel from './components/TranslationPanel';

const App = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Healthcare Translation App</h1>
      </header>
      <main className="app-main">
        <TranslationPanel />
      </main>
      <footer className="app-footer">
        <p>&copy; 2023 Healthcare Translation. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;