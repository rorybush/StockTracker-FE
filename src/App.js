import {Routes, Route} from 'react-router-dom'
import {CssBaseline} from '@mui/material'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import AboutSection from './components/AboutSection';
import Navv from './components/Navv'
import StockNews from './components/StockNews'


function App() {
  return (
    <div className="App">
      <CssBaseline/>
      <Navv/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/stock' element={<AboutSection/>}> </Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/news' element={<StockNews/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
