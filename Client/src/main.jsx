import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Homescreen from './components/Homescreen.jsx'
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom'
import BookingScreen from './components/BookingScreen.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import Profile from './components/Profile';
import UserBookings from './components/UserBookings.jsx'
import AdminPanel from './components/AdminPanel.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path='' element={<Homescreen />}/>
      <Route path='/book/:roomid/:fromdate/:todate' element={<BookingScreen />}/>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/admin' element={<AdminPanel />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
