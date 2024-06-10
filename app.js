import express from 'express'
import cors from 'cors'
const app = express()
app.use(cors(({
    origin:"*",
    credentials: true
}) ))
app.use(express.static('dist'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// app.use((err, req, res, next) => {
//     if (err instanceof ApiError) {
//         return res.status(err.statusCode).json({
//             success: err.success,
//             message: err.message,
//             errors: err.errors
//         });
//     }

//     return res.status(500).json({
//         success: false,
//         message: "Internal Server Error",
//         errors: []
//     });
// });

import { router } from './routes/rooms.routes.js'
app.use("/api/v1", router)




export {app}