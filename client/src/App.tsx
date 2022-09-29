import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import Calendar from './pages/Calendar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Calendar />} />
      </Routes>
    </>
  )
}

export default App;
