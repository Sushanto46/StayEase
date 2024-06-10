import { User } from "../models/users.model.js";
import { ApiResponse } from "../utils/ApiRespone.js";
// import {ApiError} from '../utils/ApiError.js';
import { Booking } from './../models/booking.model.js';


const generateAccessAndRefreshTokens =async (userId) => {
    try {
        const user = await User.findById(userId)
        // console.log(user);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong while generating tokens" });
        // throw new ApiError(500, "Something went wrong while generating tokens")
    }
}

const registerUser = async (req,res) => {
    const { name, email, password, 'repeat-password':repeatPassword } = req.body
    // console.log("Details:::....",req.body);
    if (
        [name, email, password, repeatPassword].some((field) => field?.trim() === "")
    ) {
        return res.status(400).json({ message: "All fields are required" });
        // throw new ApiError(400, "All fields are required");
    }
    // console.log(repeatPassword);
    // if(password !== repeatPassword ){
    //     throw new ApiError(400, "Repeat Password is different from password")
    // }

    const existedUser = await User.findOne({
        $or: [ {email}]
    })
    if(existedUser)
        return res.status(409).json({ message: "User with email or username already exists" });
        // throw new ApiError(409, "User with email or username already exists");

    const user = await User.create({
        name,
        email,
        password
    })
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        return res.status(500).json({ message: "Something went wrong while registering user" });
        // throw new ApiError(500, "Something went wrong while registering user");
    }

    return res
        .status(201)
        .json(new ApiResponse(200, createdUser, "User registered successfully"));
}

const loginUser = async (req,res) => {

    const {email, password} = req.body

    console.log("Before checking",req.body);
    if(!(email || password))
        return res.status(400).json({ message: "All fields are required" });
        // throw new ApiError(400, "All fields are required")

    const user = await User.findOne({
        $or: [{email}]
    })

    console.log("AFter ",user);
    if(!user)
        return res.status(400).json({ message: "Email not found" });
        // throw new ApiError(400, "Email not found")

    const isPasswordValid = user.isPasswordCorrect(password)

    if(!isPasswordValid)
        return res.status(400).json({ message: "Password is incorrect" });
        // throw new ApiError(400, "Password is incorrect")
    
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refresHToken")

    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged in successfully"
        )
    )
}

const logoutUser = async (req,res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset : {
                // this removes the field from document
                refreshToken: 1
            }
        },
        {
            // response me updated value milegi
            new: true
        }
    )
    const options = {
        httpOnly : true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"))
}

const getUserBookings = async (req,res) => {
    const {userid} = req.body
    console.log(req.body);
    try {
        const bookings = await Booking.find({userid: userid})
    
        // if(!bookings)
        //     return res.status(400).json({message: "No current bookings"})
    
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {bookings},
                "User bookings fetched"
            )
        )
    } catch (error) {
        return res.status(400).json({message: "Error while fetching user bookings or no bookings"})
    }
}

const getAllUsers = async(req,res) => {
    try {
        const users = await User.find({})
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                users,
                "All users fetched successfully"
            )
        )
    } catch (error) {
        return res.status(400).json({message: "Error while fetching users"})
    }
}

export{
    registerUser,
    loginUser,
    logoutUser,
    getUserBookings,
    getAllUsers
}