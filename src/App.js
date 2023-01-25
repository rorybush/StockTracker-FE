import './App.css';
import {Routes, Route} from 'react-router-dom'
import {CssBaseline} from '@mui/material'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'

function App() {
  return (
    <div className="App">
      <CssBaseline/>
      <NavBar/>
      <Home/>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
