import mongoose from "mongoose";

const connectDB = async () => {
    // const DB_NAME = "HOTEL"
    try {
        // const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        const connectionInstance = await mongoose.connect("mongodb+srv://sushanto46sd:sushanto46sd@cluster0.h0mjbw0.mongodb.net/hotel")
        console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("DB connection error", error);
        process.exit(1)
    }
}

export default connectDB