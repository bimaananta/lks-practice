import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './Auth';
import Home from './Home';
import Rent from './Rent';
import RegisterList from './RegisterList';
import CreateRent from './CreateRent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth/:action' element={<Auth/>}/>
        <Route path='/rent' element={<Rent/>}/>
        <Route path='/create-rent' element={<CreateRent/>}/>
        <Route path='/register-list' element={<RegisterList/>}/>
      </Routes>
    </Router>
  );
}

export default App;
