import { Route, Routes } from 'react-router-dom';
import './App.css';
import UserForm from './components/Form';
import UserDetails from './components/UserDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<UserForm/>}/>
        <Route path='/userdetails' element={<UserDetails/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
