import { Booking } from "../models/booking.model.js"
import { ApiResponse } from "../utils/ApiRespone.js"
import { Rooms } from "../models/room.model.js"
import moment from 'moment'
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51PPJAQFeKE9Xigul0ZxIUqgXO2vmSY0W4bkNg8wDcgWR5ql7UaKOSF2OJj1ZRSGmCl1G6vtNbxVwkFJAghh1oDEd00khXs6eum')
import { v4 as uuidv4 } from 'uuid';


const bookingRoom = async(req,res) => {
    const {room,
        roomid,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays,
        token } = req.body

        try {
            const customer = await stripe.customers.create({
                email: token.email,
                source: token.id
            })
            const payment = await stripe.charges.create(
                {
                    amount: totalamount*100,
                    customer: customer.id,
                    currency: 'INR',
                    receipt_email: token.email
                },
                {
                    idempotencyKey: uuidv4()
                }
            )
            if(payment){
                try {
                    const bookingDetails = await Booking.create({
                        room: room.hotelName,
                        roomid,
                        userid,
                        fromdate: fromdate,
                        todate: todate,
                        totalamount,
                        totaldays,
                        transactionid: '1234',
                    })
            
                    const bookedRoom = await Booking.findById(bookingDetails._id)
                    // console.log(bookedRoom);
                    if(!bookedRoom)
                        return res.status(500).json({ message: "Booking unsuccessful" });

                        // throw new ApiError(500, "Booking unsuccessful")
            
                    const booking = {
                        bookingid: bookedRoom._id,
                        fromdate: moment(fromdate).format('DD-MM-YYYY'),
                        todate: moment(todate).format('DD-MM-YYYY'),
                        userid: userid,
                        status: bookedRoom.status
                    }
            
                    await Rooms.findByIdAndUpdate(
                        roomid,
                        {
                            $push: {currentBookings: booking },
                        },
                        {
                            new: true
                        }
                    )
            
                    return res
                    .status(200)
                    .json( new ApiResponse(
                            200,
                            bookedRoom,
                            "Booking done"
                    ))
            
                } catch (error) {
                    res.status(500).send("Booking cant be done")
                }
            }

            res.send("Payment success, booking confirmed")
        } catch (error) {
            res.status(400).json({error})
        }
}




const cancelUserBooking = async(req, res) => {
    const {bookingid, roomid} = req.body
    try {
        const booking = await Booking.findById(bookingid)
        booking.status = "cancelled"
        await booking.save()
        const room = await Rooms.findById(roomid)
        const currentBookings = room.currentBookings
        const tempBookings = currentBookings.filter(book => book.bookingid.toString()
            !== bookingid
        )
        room.currentBookings = tempBookings
        await room.save()
    
        return res.status(200).json({message: "Booking cancelled successfully"})
    } catch (error) {
        return res.status(400).json({message: "Error while cancelling"})
    }
}

const getAllBookings = async(req,res) => {
    try {
        const bookings = await Booking.find({})
        return res
        .status(200)
        .json(new ApiResponse
            (
                200,
                bookings,
                "All bookings fetched"
            )
        )


    } catch (error) {
        
    }
}
const addRoom = async (req, res) => {
    const {
            hotelName,
            rentPerDay,
            maxCount,
            description,
            phoneNumber,
            roomType,
            url1,
            url2,
    } = req.body

    const roomImages = [url1, url2];

    try {
        const addedRoom = await Rooms.create(
            {
                hotelName,
                rentPerDay,
                maxCount,
                description,
                phoneNumber,
                roomType,
                roomImages
            }
        )
        if(!addedRoom)
            return res.status(500).json({message: "Error while adding room"})
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                addedRoom,
                "Room added successfully"
            )
        )
    } catch (error) {
        console.error("Error while creating room doc:", error);
        return res.status(400).json({message:"Error while creating room doc"})
    }

}


export {bookingRoom,
    cancelUserBooking,
    getAllBookings,
    addRoom
}



// const bookingRoom = async (req, res) => {
//     const {room,
//         roomid,
//         userid,
//         fromdate,
//         todate,
//         totalamount,
//         totaldays } = req.body
//         console.log(req.body);

//     try {
//         const bookingDetails = await Booking.create({
//             room: room.hotelName,
//             roomid,
//             userid,
//             fromdate: fromdate,
//             todate: todate,
//             totalamount,
//             totaldays,
//             transactionid: '1234',
//         })

//         const bookedRoom = await Booking.findById(bookingDetails._id)
//         // console.log(bookedRoom);
//         if(!bookedRoom)
//             throw new ApiError(500, "Booking unsuccessful")

//         const booking = {
//             bookingid: bookedRoom._id,
//             fromdate: moment(fromdate).format('DD-MM-YYYY'),
//             todate: moment(todate).format('DD-MM-YYYY'),
//             userid: userid,
//             status: bookedRoom.status
//         }

//         await Rooms.findByIdAndUpdate(
//             roomid,
//             {
//                 $push: {currentBookings: booking },
//             },
//             {
//                 new: true
//             }
//         )

//         return res
//         .status(200)
//         .json( new ApiResponse(
//                 200,
//                 bookedRoom,
//                 "Booking done"
//         ))

//     } catch (error) {
//         res.status(500).send("Booking cant be done")
//     }
// }


