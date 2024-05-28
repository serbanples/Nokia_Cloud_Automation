import React from 'react'
import { Route, Routes } from 'react-router'
import LogIn from './pages/auth/LogIn'
import SignUp from './pages/auth/SignUp'
import Page from './pages/root/Page'
import { AuthRoutes, RootRoutes } from './components/Routes'
import Profile from './pages/root/Profile'
import Home from './pages/root/Home'

const App = () => {
  return (
    <Routes>
      <Route path='/root' element={ <RootRoutes /> }>
        <Route path='profile' element={ <Profile /> } />
        <Route index path='home' element={ <Home />} />
      </Route>
      <Route path='auth' element={ <AuthRoutes /> }>
        <Route path='login' element={ <LogIn /> } />
        <Route path='signup' element={ <SignUp /> } />
      </Route>
    </Routes>
  )
}

export default App