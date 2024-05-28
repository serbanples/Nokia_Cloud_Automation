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