import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Calendar from './pages/Calendar';
import Home from './pages/Home';
import Landing from './pages/Landing';
import PrivateRoutes
 from './lib/PrivateRoute';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/home' element={<Home />} />
          <Route path='/calendar' element={<Calendar />} />  
        </Route>
        <Route path='/' element={<Landing />} />
      </Routes>
    </>
  );
}
