import './App.css';
import {Routes, Route} from 'react-router-dom'
import {CssBaseline} from '@mui/material'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import StockNews from './components/StockNews';
// import Logout from './components/Logout'

function App() {
  return (
    <div className="App">
      <CssBaseline/>
      <NavBar/>
      <StockNews/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        {/* <Route path='/logout' element={<Logout/>}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
