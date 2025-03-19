import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PrivateRoute from './lib/privateRoute.jsx'
import Login from './pages/Login.jsx'
import { Container } from './components/ui/container.jsx'

function App() {
  return (
    <Container>
        <BrowserRouter>
            <Routes>
              {/* SignIn, SignUp and landing page routes will be here */}
              <Route path='/login' element={Login}/>
              <Route element={<PrivateRoute/>}>
              {/* The layout route */}
              {/* The routing that will be protected will be here */}
              </Route>
            </Routes>
        </BrowserRouter>
    </Container>
  )
}
export default App;