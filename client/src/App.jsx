import React from 'react'
import {BrowserRouter ,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import AdminPanel from './pages/AdminPanel'
import CreateEmployee from './pages/CreateEmployee'
import Edit from './pages/Edit'
const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
    <Route element={<PrivateRoute/>}>
           <Route path='/admin-panel' element={<AdminPanel />}/>
           <Route path='/create-employee' element={<CreateEmployee />} />
           <Route path='/edit/:id' element={<Edit />} />
      </Route>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      
    </Routes>
    </BrowserRouter>
  )
}

export default App