import dotenv from 'dotenv'
import connectDB from './db.js';
import { app } from './app.js';

connectDB()
.then(() => {
    const port = process.env.PORT || 8000
    app.listen(port, () => {
        console.log(`Server running at port: ${port}`);
    })
})
.catch((err) => {
    console.log("MONGODB connection failed", err);
})

dotenv.config({
    path: './.env'
})
