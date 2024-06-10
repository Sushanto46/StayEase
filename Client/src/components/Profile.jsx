import React, { useEffect } from 'react'
import { Tabs } from "antd";
import { Link } from 'react-router-dom';
import UserBookings from './UserBookings';
const {TabPane} = Tabs 

function Profile() {
  const user = JSON.parse(localStorage.getItem("currentUser"))

  useEffect(()=>{
    if(!user)
      window.location.href = '/login'
  }, [])
  return (
    <div className='px-10 py-1'>
      <Tabs defaultActiveKey='1'>
       <TabPane tab="Profile" key="1">
       <div className='p-4 shadow-lg md:h-[10vw] md:w-[30%] mx-auto mt-[3vw]'>
        <h1 className='mb-4 text-xl text-gray-600 text-center'>Your Profile</h1>
        <p className='md:text-lg' > <span className='font-semibold'> Name: </span> {user.user.name.toUpperCase()}</p>
        <p className='md:text-lg'><span className='font-semibold' >Email: </span> {user.user.email}</p> 
        <p className='md:text-lg'><span className='font-semibold' >Admin Access: </span> {user.user.isAdmin? "Yes":"No"}</p> 
        </div>
       </TabPane>
       <TabPane tab="My Bookings" key="2">
        <UserBookings />
       </TabPane>
      </Tabs>
      
    </div>
  )
}

export default Profile
