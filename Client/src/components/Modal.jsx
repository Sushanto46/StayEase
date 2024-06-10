import React from 'react'
import { X } from 'lucide-react';
"use client";

import { Carousel } from "flowbite-react";

function Modal({onClose, room}) {
    
    function handleClick(){

    }
  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center '>
      <div className='p-5 h-[50%] md:h-[80%] pb-10 flex flex-col gap-5 w-[80%] md:w-[35%] text-white bg-gray-800 rounded-xl'>
        <div className='flex justify-between'>

        <h1 className='text-2xl font-bold'> {room.hotelName}</h1>
      <button onClick={onClose}><X size={30} /></button>
        </div>
        <Carousel>
          {room.roomImages.map((image) => (<img src={image} />))}
      </Carousel>
      <div>
        <p>Room type: {room.roomType}</p>
        <p>Max count: {room.maxCount}</p>
        <p>Per night: ₹{room.rentPerDay}</p>
        <p>Room Description: {room.description}</p>
      </div>
      </div>
    </div>
  )
}

export default Modal
