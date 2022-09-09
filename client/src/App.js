import React from 'react';
import Modal from 'react-modal';
import Calendar from './Components/Calendar.jsx';

Modal.setAppElement('#root');

function App() {
  return (
    <Calendar />
  );
}

export default App;
