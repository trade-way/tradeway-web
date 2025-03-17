import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './page/signIn.jsx'
import { Dashboard } from './page/dashboard.jsx'
import PrivateRoute from './lib/privtaeRoute.jsx'

export default function App() {
  const currentUser = useSelector((state) => state.user)

  return (
    <div className=''>
        <BrowserRouter>
          <OpenProvider>
            <Routes>
              <Route path='/Sign-In' element={<Login/>}/>
              <Route element={<PrivateRoute/>}>
                <Route element={<Layout/>}>
                  <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
                  <Route path='/dashboard' element={<Dashboard/>}/></Route>
              </Route>
            </Routes>
          </OpenProvider>
        </BrowserRouter>
    </div>
  )
}