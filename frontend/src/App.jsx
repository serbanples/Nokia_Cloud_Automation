import React from 'react'
import { Route, Routes } from 'react-router'
import LogIn from './pages/auth/LogIn'
import SignUp from './pages/auth/SignUp'
import Page from './pages/root/Page'
import { AuthRoutes, RootRoutes } from './components/Routes'
import Profile from './pages/root/Profile'
import Home from './pages/root/Home'
import AuthLayout from './pages/auth/AuthLayout'

const App = () => {
  return (
    <Routes>
      <Route element={ <RootRoutes /> }>
        <Route path='/profile' element={ <Profile /> } />
        <Route index element={ <Home />} />
      </Route>
      <Route path='/auth' element={ <AuthLayout /> }>
        <Route path='login' element={ <LogIn /> } />
        <Route path='signup' element={ <SignUp /> } />
      </Route>
    </Routes>
  )
}

export default App