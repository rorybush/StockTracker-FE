import './App.css';
import {Routes, Route} from 'react-router-dom'
import {CssBaseline} from '@mui/material'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import AboutSection from './components/AboutSection';

function App() {
  return (
    <div className="App">
      <CssBaseline/>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/stock' element={<AboutSection/>}> </Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        {/* <Route path='/logout' element={<Logout/>}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
