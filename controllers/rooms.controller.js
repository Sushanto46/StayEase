import {Rooms} from '../models/room.model.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiRespone.js'


const getRoomInfo = async (req,res) => {
    try {
        const rooms = await Rooms.find({})
        // console.log(rooms);
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {rooms},
                "Info fetched successfully"
            )
        )
    } catch (error) {
        throw new ApiError(400, "Error while fetching")
    }
}
const getRoomById = async (req,res) => {
    const roomid = req.body.roomid
    try {
        // console.log(rooms);
        const room = await Rooms.findOne({_id: roomid})
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {room},
                "Room info fetched successfully"
            )
        )
    } catch (error) {
        throw new ApiError(400, "Error while fetching")
    }
}

export {
    getRoomInfo,
    getRoomById,
}