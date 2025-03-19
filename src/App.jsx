import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PrivateRoute from './lib/privateRoute.jsx'
import { Container } from './components/ui/container.jsx'

export default function App() {

  return (
    <Container>
        <BrowserRouter>
            <Routes>
              {/* SignIn, SignUp and landing page routes will be here */}
              <Route element={<PrivateRoute/>}>
              {/* The layout route */}
              {/* The routing that will be protected will be here */}
              </Route>
            </Routes>
        </BrowserRouter>
    </Container>
  )
}
