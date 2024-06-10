import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { PacmanLoader } from 'react-spinners'
import moment from 'moment'
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2'

function BookingScreen() {
    const { roomid } = useParams()
    const { fromdate } = useParams()
    const { todate } = useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [room, setRoom] = useState()

    const [from, setFrom] = useState(moment(fromdate, 'DD-MM-YYYY'))
    const [to, setTo] = useState(moment(todate, 'DD-MM-YYYY'))
    const totalDays = moment.duration(to.diff(from)).asDays() + 1

    async function bookRoom(token) {
        console.log(token);
        const bookingDetails = {
            room,
            roomid,
            userid: JSON.parse(localStorage.getItem("currentUser")).user._id,
            fromdate: from,
            todate: to,
            totalamount: room.rentPerDay * totalDays,
            totaldays: totalDays,
            token
        }
        try {
            const result = await axios.post('/api/v1/bookroom', bookingDetails)
            setLoading(false)
            setError(false)
            Swal.fire({
                title: "Payment Successful!",
                text: "Room booked successfully!",
                icon: "success"
            }).then(result => (window.location.href='/'));
        } catch (error) {
            setLoading(false)
            setError(true)
        }

    }

    useEffect(() => {
        async function call() {
            if(!localStorage.getItem("currentUser"))
                window.location.href = '/login'
            try {
                const data = (await axios.post('/api/v1/getRoomById', { roomid: roomid })).data
                console.log(data);
                setRoom(data.data.room)
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
                setError(true)
            }
        }
        call()
    }, [])


    return (
        <div>
            {loading ? (
                <div className='w-full flex mt-[10vw] justify-center'>
                    <PacmanLoader color="#4CAF50" />
                </div>
            ) : room ?
                (
                    <div className='flex flex-col md:flex-row shadow-2xl  md:h-[30vw] md:w-[70%] m-auto mt-[4vw] p-7'>
                        <div className=' md:w-[50%] h-[80%]  md:ml-10'>
                            <h1 className='text-xl font-medium text-gray-700 mb-5'>{room.hotelName}</h1>
                            <img className=' h-[300px] object-cover ' src={room.roomImages[0]} alt="" />
                        </div>
                        <div className='md:w-[40%] shadow-inner p-3'>
                            <h3 className='text-lg text-gray-700 mb-4'>Booking Details: </h3>
                            <p className='font-medium'>Name: {JSON.parse(localStorage.getItem("currentUser")).user.name.toUpperCase()}</p>
                            <p className='font-medium'>From: {fromdate}</p>
                            <p className='font-medium'>To: {todate}</p>
                            <p className='mb-3 font-medium'>Max Count: {room.maxCount}</p>
                            <hr />
                            <h3 className='text-lg font-gray-700 my-3'>Amount: </h3>
                            <p className='font-medium'>Total Nights: {totalDays}</p>
                            <p className='font-medium'>Rent per night per room: {room.rentPerDay} </p>
                            <p className='font-medium'>Total amount: {room.rentPerDay * totalDays}</p>
                            <StripeCheckout
                                token={bookRoom}
                                amount={room.rentPerDay * totalDays * 100}
                                currency='INR'
                                stripeKey="pk_test_51PPJAQFeKE9XigulM2iKu2FD79UOU9wb0igJStxTtvVWx1DHQVhcfBuxsqa45AO7gs6Q3mIhDmdmP9fH0R01nzNd00PQcuduhT"
                            >
                                <button onClick={bookRoom} className=' float-right mt-7 bg-green-500 text-white py-1 px-2 rounded-md'>Pay Now</button>
                            </StripeCheckout>
                        </div>
                    </div>

                ) : Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                })
            }
        </div>
    )
}

export default BookingScreen
