import { useState } from 'react';
import '../Assets/css/App.css';

function App() {
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

export default App
