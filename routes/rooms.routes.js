import { Router } from "express";
import { getRoomById, getRoomInfo } from "../controllers/rooms.controller.js";
import { getAllUsers, getUserBookings, loginUser, logoutUser, registerUser } from "../controllers/users.controller.js";
import { verifyJWT } from './../middleware/auth.middleware.js';
import { addRoom, bookingRoom, cancelUserBooking, getAllBookings } from "../controllers/booking.controller.js";

const router = Router()
router.route('/getRooms').get(getRoomInfo)
router.route('/getRoomById').post(getRoomById)
router.route('/users/register').post(registerUser)
router.route('/users/login').post(loginUser)
router.route('/users/logout').post(verifyJWT,logoutUser)
router.route('/bookroom').post(bookingRoom)
router.route('/getUserBookings').post(getUserBookings)
router.route('/cancelBooking').post(cancelUserBooking)
router.route('/getAllBookings').get(getAllBookings)
router.route('/getAllUsers').get(getAllUsers)
router.route('/addRoom').post(addRoom)


export {router}