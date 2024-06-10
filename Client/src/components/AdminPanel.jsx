import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import axios from 'axios'
const { TabPane } = Tabs
import moment from 'moment';
import { PacmanLoader } from 'react-spinners';
import Swal from 'sweetalert2'

function AdminPanel() {

    useEffect(() => {
        // console.log(JSON.parse(localStorage.getItem('currentUser')));
        if (!JSON.parse(localStorage.getItem('currentUser')).user.isAdmin)
            window.location.href = '/'
    }, [])

    return (
        <div className='px-10 py-4 shadow-lg border mt-5 w-[90%] mx-auto'>
            <h1 className='text-xl font-bold text-center'>Admin Panel</h1>
            <Tabs defaultActiveKey='1'>
                <TabPane tab="Bookings" key="1">
                    <BookingsAdmin />
                </TabPane>
                <TabPane tab="Rooms" key="2">
                    <RoomsAdmin />
                </TabPane>
                <TabPane tab="Add Room" key="3">
                    <AddRoomAdmin />
                </TabPane>
                <TabPane tab="Users" key="4">
                    <UsersAdmin />
                </TabPane>
            </Tabs>
        </div>
    )
}

export function BookingsAdmin() {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function fetch() {

            try {
                const result = (await axios.get('/api/v1/getAllBookings')).data
                console.log(result);
                setBookings(result.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error.response.data.message);
            }
        }
        fetch()
    }, [])

    return (
        <>
            {loading && <PacmanLoader />}
            <table className='bg-slate-900 table-auto border-separate border-spacing-4 border border-slate-500 m-auto'>
                <tr>
                    <th className='border bg-slate-500 text-white p-2 border-slate-500'>BookingID</th>
                    <th className='border bg-slate-500 text-white p-2 border-slate-500'>UserID</th>
                    <th className='border bg-slate-500 text-white p-2 border-slate-500'>Hotel name</th>
                    <th className='border bg-slate-500 text-white p-2 border-slate-500'>From</th>
                    <th className='border bg-slate-500 text-white p-2 border-slate-500'>To</th>
                    <th className='border bg-slate-500 text-white p-2 border-slate-500'>Status</th>
                </tr>
                {bookings.map((book) =>
                (
                    <tr>
                        <td className='bg-slate-600 text-white p-2 border border-slate-600'>{book._id}</td>
                        <td className='bg-slate-600 text-white p-2 border border-slate-600' > {book.userid}</td>
                        <td className='bg-slate-600 text-white p-2 border border-slate-600'>{book.room}</td>
                        <td className='bg-slate-600 text-white p-2 border border-slate-600'>{moment(book.fromdate).format('DD-MM-YYYY')}</td>
                        <td className='bg-slate-600 text-white p-2 border border-slate-600'>{moment(book.todate).format('DD-MM-YYYY')}</td>
                        <td className={`${book.status == 'cancelled' ? 'bg-red-600 ' : 'bg-green-500'} p-2 text-white border border-slate-600 font-bold`}>{book.status.toUpperCase()}</td>
                    </tr>
                )
                )}
            </table>
        </>
    )
}

export function AddRoomAdmin() {
    const [formData, setFormData] = useState(
        {
            hoteName: '',
            rentPerDay: 0,
            maxCount: 0,
            description: '',
            phoneNumber: 0,
            roomType: '',
            url1: '',
            url2: '',
        }
    )
    const [error, setError] = useState('')

    function handleChange(e) {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try {
           const response =  await axios.post('/api/v1/addRoom', formData)
           console.log(response);
           Swal.fire({
            title: "Success!",
            text: "Room added successfully!",
            icon: "success"
        }).then(result=>{
            window.location.href='/'
        })
        } catch (err) {
            console.log(err.response.data.message);
            setError(err.response.data.message)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: {error},
            })
        }

    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <table className='bg-slate-900 table-auto border-separate text-white border-spacing-4 border border-slate-500 m-auto'>
                    <tr>
                        <td>
                            <label htmlFor="hotelName">Hotel name:</label>
                        </td>
                        <td>
                            <input className='p-1 bg-slate-500 text-white' type="text" id='hotelName' name='hotelName' onChange={(e) => handleChange(e)} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="count">Max Count: </label>
                        </td>
                        <td>
                            <input className='p-1 bg-slate-500 text-white' type="number" id='count' name='maxCount' onChange={(e) => handleChange(e)} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="rent">Rent per night: </label>
                        </td>
                        <td>
                            <input className='p-1 bg-slate-500 text-white' type="number" id='rent' name='rentPerDay' onChange={(e) => handleChange(e)} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="desc">Description: </label>
                        </td>
                        <td>
                            <input className='p-1 bg-slate-500 text-white' type="text" id='desc' name='description' onChange={(e) => handleChange(e)} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="phone">Contact: </label>
                        </td>
                        <td>
                            <input className='p-1 bg-slate-500 text-white' type="number" id='phone' name='phoneNumber' onChange={(e) => handleChange(e)} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="roomType">Room type: </label>
                        </td>
                        <td>
                            <select name="roomType" className='p-1 bg-slate-500 text-white text-sm' onChange={(e) => handleChange(e)} id="roomType">
                                <option value="suite">Suite</option>
                                <option value="single">Single</option>
                                <option value="delux">Delux</option>
                                <option value="standard">Standard</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="img1">Image URL 1: </label>
                        </td>
                        <td>
                            <input className='p-1 bg-slate-500 text-white' type="text" onChange={(e) => handleChange(e)} id='img1' name='url1' />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="img2">Image URL 1: </label>
                        </td>
                        <td>
                            <input className='p-1 bg-slate-500 text-white' onChange={(e) => handleChange(e)} type="text" id='img2' name='url2' />
                        </td>
                    </tr>
                    <tr>
                        <td ><button type='submit' className='mt-2 bg-slate-700 text-white font-semibold py-1 px-2 rounded-md'>ADD ROOM</button></td>
                    </tr>
                </table>
            </form>
        </div>
    )
}



export function UsersAdmin() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetch() {
            try {
                const result = (await axios.get('/api/v1/getAllUsers')).data
                console.log(result);
                setUsers(result.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error.response.data.message);
            }
        }
        fetch()
    }, [])
    return (
        <>

            {loading && <PacmanLoader />}
            <table className='bg-slate-900 table-auto border-separate border-spacing-4 border border-slate-500 m-auto'>
                <tr>
                    <th className='border bg-slate-500 text-white p-2 border-slate-500'>User ID</th>
                    <th className='border bg-slate-500 text-white p-2 border-slate-500'>Name</th>
                    <th className='border bg-slate-500 text-white p-2 border-slate-500'>Email</th>
                    <th className='border bg-slate-500 text-white p-2 border-slate-500'>Registered in</th>
                    <th className='border bg-slate-500 text-white p-2 border-slate-500'>Admin</th>
                </tr>
                {users.map((book) =>
                (
                    <tr>
                        <td className='bg-slate-600 text-white p-2 border border-slate-600'>{book._id}</td>
                        <td className='bg-slate-600 text-white p-2 border border-slate-600'>{book.name}</td>
                        <td className='bg-slate-600 text-white p-2 border border-slate-600' > {book.email}</td>
                        <td className='bg-slate-600 text-white p-2 border border-slate-600'>{moment(book.createdAt).format('DD-MM-YYYY')}</td>
                        <td className='bg-slate-600 text-white p-2 border border-slate-600' > {book.isAdmin ? "Yes" : "No"}</td>
                    </tr>
                )
                )}
            </table>
        </>
    )
}



export function RoomsAdmin() {
    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetch() {
            try {
                const result = (await axios.get('/api/v1/getRooms')).data
                console.log(result);
                setRooms(result.data.rooms)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error.response.data.message);
            }
        }
        fetch()
    }, [])

    return (
        <>

            {loading && <PacmanLoader />}
            <table className='bg-slate-900 table-auto border-separate border-spacing-4 border m-auto border-slate-500'>
                <tr>
                    <th className='border bg-slate-500 text-white p-2 border-slate-500'>Room ID</th>
                    <th className='border bg-slate-500 text-white p-2 border-slate-500'>Hotel Name</th>
                    <th className='border bg-slate-500 text-white p-2 border-slate-500'>Type</th>
                    <th className='border bg-slate-500 text-white p-2 border-slate-500'>Rent per night</th>
                    <th className='border bg-slate-500 text-white p-2 border-slate-500'>Max Count</th>
                    <th className='border bg-slate-500 text-white p-2 border-slate-500'>Phone Number</th>
                </tr>
                {rooms.map((book) =>
                (
                    <tr>
                        <td className='bg-slate-600 text-white p-2 border border-slate-600'>{book._id}</td>
                        <td className='bg-slate-600 text-white p-2 border border-slate-600' > {book.hotelName}</td>
                        <td className='bg-slate-600 text-white p-2 border border-slate-600'>{book.roomType}</td>
                        <td className='bg-slate-600 text-white p-2 border border-slate-600'>{book.rentPerDay}</td>
                        <td className='bg-slate-600 text-white p-2 border border-slate-600'>{book.maxCount}</td>
                        <td className='bg-slate-600 text-white p-2 border border-slate-600'>{book.phoneNumber}</td>
                    </tr>
                )
                )}
            </table>
        </>
    )

}

export default AdminPanel
