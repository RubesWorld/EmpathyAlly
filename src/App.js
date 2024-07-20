import React from 'react';
import EmotionLogger from './components/EmotionLogger';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Emotion Action App</h1>
      </header>
      <main>
        <EmotionLogger />
      </main>
    </div>
  );
}

export default App;