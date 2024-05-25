import React from 'react'
import { Route, Routes } from 'react-router'
import LogIn from './pages/auth/LogIn'
import SignUp from './pages/auth/SignUp'
import Page from './pages/root/Page'
import Home from './pages/root/Home'

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={ <LogIn /> } />
      <Route path='/signup' element={ <SignUp /> } />
      <Route path='/page' element={ <Page /> } />
      <Route path='/home' element={ <Home /> } />
    </Routes>
  )
}

export default App