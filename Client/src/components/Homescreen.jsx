import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import RoomCard from './RoomCard'
import { PacmanLoader } from 'react-spinners'
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
import moment from 'moment';
import { set } from 'mongoose'

function Homescreen() {
  const [fromDate, setFromDate] = useState()
  const [toDate, setToDate] = useState()
  const [duplicateRooms, setDuplicateRooms] = useState([])
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [searchKey, setSearchKey] = useState('')
  const [type, setType] = useState('')

  function filterByDate(dates) {
    setFromDate(moment(dates[0].$d).format("DD-MM-YYYY"))
    setToDate(moment(dates[1].$d).format("DD-MM-YYYY"))

    const from = moment(dates[0].$d);
    const to = moment(dates[1].$d);
    var tempRooms = []
    for (const room of duplicateRooms) {
      let availability = true;
      for (const booking of room.currentBookings) {
        const bookingFrom = moment(booking.fromdate, "DD-MM-YYYY");
        const bookingTo = moment(booking.todate, "DD-MM-YYYY");

        if (
          from.isBetween(bookingFrom, bookingTo, undefined, '[]') || 
          to.isBetween(bookingFrom, bookingTo, undefined, '[]') || 
          from.isSame(bookingFrom) || 
          from.isSame(bookingTo) || 
          to.isSame(bookingFrom) || 
          to.isSame(bookingTo)
        ) {
          availability = false;
          break;
        }
      }
      if (availability || room.currentBookings.length === 0) {
        tempRooms.push(room);
      }
    }
    setRooms(tempRooms)
  }
  function filterBySearch(){
    const temprooms = duplicateRooms.filter(room => room.hotelName.toLowerCase().includes(searchKey.toLowerCase()))
    // console.log("By name", temprooms);
    setRooms(temprooms)
  }

  function filterByType(val){
    setType(val)
    if(val != 'all'){
      const temprooms = duplicateRooms.filter(room=>room.roomType.toLowerCase() == val.toLowerCase())
      setRooms(temprooms)
    }
    else
    setRooms(duplicateRooms)
  }

  useEffect(() => {
    // if(!localStorage.getItem("curretUser"))
    //   window.location.href = '/register'
    async function call() {
      try {
        const data = (await axios.get('/api/v1/getRooms')).data
        console.log(data);
        setRooms(data.data.rooms)
        setDuplicateRooms(data.data.rooms)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
        console.log("Error", error);
        setError(false)
      }
    }
    call()
  }, [])

  return (
    <div className='flex m-auto flex-col justify-center w-[70%] gap-5 h-[100%] my-10 '>
      <div className='border px-1 py-3 shadow-xl flex flex-col md:gap-0 gap-3 md:flex-row md:justify-around'>
        <RangePicker className='border border-black ' format="DD-MM-YYYY" onChange={filterByDate} />
        <input value={searchKey} onChange={(e) =>setSearchKey(e.target.value)} onKeyUp={filterBySearch} type='text' className='w-full md:w-1/2 border border-black rounded-lg'  placeholder='Search rooms'/>
        <select className='border w-[50%] md:w-[110px] text-sm border-black rounded-lg' name="roomType" id="roomType" value={type} onChange={(e)=>filterByType(e.target.value)}>
          <option className='text-sm' value="all">All</option>
          <option className='text-sm' value="suite">Suite</option>
          <option className='text-sm' value="single">Single</option>
          <option className='text-sm' value="standard">Standard</option>
          <option className='text-sm' value="deluxe">Deluxe</option>
        </select>
      </div>
      {loading ? (
        <div className='w-full flex mt-[10vw] justify-center'>
          <PacmanLoader color="#4CAF50" />
        </div>
      ) :  (
          rooms.map((room) => (
            <div key={room._id}>
              <RoomCard room={room} fromDate={fromDate} toDate={toDate} />
            </div>
          ))
        )}
    </div>
  )
}

export default Homescreen


