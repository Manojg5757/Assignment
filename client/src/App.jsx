import React from 'react'
import {BrowserRouter ,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import AdminPanel from './pages/AdminPanel'
const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
    <Route element={<PrivateRoute/>}>
           <Route path='/admin-panel' element={<AdminPanel />}/>
      </Route>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      
    </Routes>
    </BrowserRouter>
  )
}

export default App