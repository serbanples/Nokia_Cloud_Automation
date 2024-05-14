import React from 'react'
import { Route, Routes } from 'react-router'
import LogIn from './pages/auth/login/LogIn'
import SignUp from './pages/auth/signup/SignUp'
import Page from './pages/root/Page'

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={ <LogIn /> } />
      <Route path='/signup' element={ <SignUp /> } />
      <Route path='/page' element={ <Page /> } />
    </Routes>
  )
}

export default App