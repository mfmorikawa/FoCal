import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Calendars from './components/Calendars'
import Example from './components/Pagination'
import './App.css'
import { Pagination } from 'react-bootstrap'

function App() {
  return (
    <>
      <Calendars/>
      {/* <div className='sticky bottom-0'>
        <Example />
      </div> */}
    </>
  )
}

export default App;