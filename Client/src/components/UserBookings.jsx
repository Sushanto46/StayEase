import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PacmanLoader } from 'react-spinners'
import moment from 'moment'
import Swal from 'sweetalert2'


function UserBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"))
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function call() {
      // console.log(user.user._id);
      try {
        const response = (await axios.post('/api/v1/getUserBookings', { userid: user.user._id })).data
        setLoading(false)
        setBookings(response.data.bookings)
        console.log(response);
      } catch (error) {
        setLoading(false)
        console.log(error.response.data.message);
      }

    }
    call()
  }, [])

  useEffect(() => {
    if (!loading && bookings.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You have no bookings! Book Now',
      });
    }
  }, [loading, bookings]);

  async function cancelBooking(bookingid, roomid) {
    try {
      setLoading(true)
      const result = (await axios.post('/api/v1/cancelBooking', { bookingid, roomid })).data
      setLoading(false)
      Swal.fire({
        title: "Booking Cancelled!",
        icon: "success"
      }).then(result => {
        window.location.reload()
      })
      console.log(data);
    } catch (error) {
      setLoading(false)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
      console.log(error.response.data.message);
    }
  }

  return (
    <div>
      <div className='flex flex-col gap-3 mb-5 m-auto'>
        {loading && <PacmanLoader className='m-auto' color='#4CAF50' />}
        {(bookings.map((book) =>
        (
          <div key={book._id} className='shadow-lg border p-3  md:w-1/2' >
            <h1 className='text-xl font-bold text-gray-700'>{book.room}</h1> <br />
            <table>
              <tr><td className='font-semibold'>BookingID:</td> <td>{book._id}</td></tr>
              <tr><td className='font-semibold'>TransactionID:</td> <td>{book.transactionid}</td></tr>
              <tr><td className='font-semibold'>Check IN:</td> <td>{moment(book.formdate).format('DD-MM-YYYY')}</td></tr>
              <tr><td className='font-semibold'>Check OUT:</td> <td>{moment(book.todate).format('DD-MM-YYYY')}</td></tr>
              <tr><td className='font-semibold'>Amount:</td> <td>{book.totalamount}</td> </tr>
              <tr><td className='font-semibold'>Status:</td> <td className={`border inline-block w-[19vw] md:w-[5vw] text-center ${book.status == 'cancelled' ? 'border-red-700 text-red-700' : 'border-green-500 text-green-500'} `}>{book.status == "Booked" ? "Confirmed" : "Cancelled"}</td> </tr>
            </table>
            <button disabled={book.status == "cancelled"} className={`md:float-right border rounded-md md:mt-0 mt-4 border-white px-4 py-2 ${book.status == "cancelled" ? 'hidden' : 'bg-red-700 text-white'} font-semibold md:w-[9vw] `} onClick={() => cancelBooking(book._id, book.roomid)}> Cancel Booking </button>
          </div>
        )))
        }
      </div>
    </div>
  )
}

export default UserBookings
