import React, { useState } from 'react';
import '../assets/css/App.css';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <h1>
        { "Created with Vite + React!" }
      </h1>
      <div className="card">
        <button onClick = { () => setCount( (count) => count + 1 )}>
          { `count is ${count}` }
        </button>
      </div>
    </div>
  );
}
