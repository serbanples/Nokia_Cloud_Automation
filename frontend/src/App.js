import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LogIn from './pages/auth/login/LogIn'
import SignUp from './pages/auth/signup/SignUp'
import Page from './pages/page'

const App = () => {
  return (
    <Routes >
        <Route path='/login' element= { <LogIn/> } />
        <Route path='/sign-up' element= { <SignUp/> } />
        <Route path='/page' element={ <Page />} />
    </Routes>
  )
}

export default App