import mongoose, {Schema} from "mongoose";


const roomSchema = new Schema(
    {
        roomImages: [],
        hotelName: {
            type: String,
            required: true
        },
        maxCount: {
            type: Number,
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true
        },
        rentPerDay: {
            type: Number,
            required: true
        },
        currentBookings: [],
        roomType: {
            type: String,
            required : true
        },
        description : {
            type: String,
            required: true
        }
    }, {timestamps: true}
)
export const Rooms = mongoose.model("Rooms", roomSchema)
