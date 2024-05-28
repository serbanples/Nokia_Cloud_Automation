import React from 'react'
import { Route, Routes } from 'react-router'
import LogIn from './pages/auth/login/LogIn'
import SignUp from './pages/auth/signup/SignUp'
import Page from './pages/root/Page'
import { AuthRoutes, RootRoutes } from './components/Routes'
import Profile from './pages/Profile'

const App = () => {
  return (
    <Routes>
      <Route path='/root' element={ <RootRoutes /> }>
        <Route path='profile' element={ <Profile /> } />
      </Route>
      <Route path='auth' element={ <AuthRoutes /> }>
        <Route path='login' element={ <LogIn /> } />
        <Route path='signup' element={ <SignUp /> } />
      </Route>
    </Routes>
  )
}

export default App