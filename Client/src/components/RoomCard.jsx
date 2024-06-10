import React, { useState } from 'react'
import Modal from './Modal'
import { Link } from 'react-router-dom'

function RoomCard({ room, fromDate, toDate }) {

    const [showModal, setShowModal] = useState(false)
    function handleClick(e){   
        setShowModal(!showModal)
}

    return (
        <div className='flex flex-col md:flex-row w-full p-3 md:h-[230px] border shadow-xl'>
            <div className='w-full md:w-[35%]'>
                <img src={room.roomImages[0]} alt="Image 1" className='w-[80vw] md:w-full h-[50vw] md:h-full object-cover' />
            </div>
            <div className='flex flex-col mt-2 md:mt-0 md:ml-20'>
                <h1 className='text-lg md:text-2xl font-bold'>{room.hotelName}</h1>
                <p className='text-[12px] md:text-[16px] text-gray-600'>Max count: {room.maxCount}</p>
                <p className='text-[12px] md:text-[16px] text-gray-600'>Phone Number: {room.phoneNumber}</p>
                <p className='text-[12px] md:text-[16px] text-gray-600'>Type: {room.roomType}</p>
                <br /><h3 className='text-sm md:text-lg font-bold'>₹{room.rentPerDay} per night</h3>
                <div className='flex flex-col mx-auto md:flex-row'>
                    
                    <button
                    className='text-sm md:text-[16px] mt-3 w-[130px] mr-6 py-1 px-[10px] border border-black outline-none'
                    onClick={(e) => handleClick(e)}>
                        View Details
                    </button>
                    
                    <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
                    <button disabled={!fromDate && !toDate} className='text-sm md:text-[16px] mt-3 w-[130px]  py-1 px-[10px] bg-green-600 text-white'>{(!fromDate && !toDate) ? "Select dates":"Book Now" }</button>
                    </Link>
                </div>
                {showModal && <Modal onClose={() => setShowModal(false)} room={room}/>}
            </div>

            
        </div>
    )
}

export default RoomCard
