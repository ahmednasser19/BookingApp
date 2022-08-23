import express from "express"
import dotenv from 'dotenv'
import mongoose from "mongoose";
import authRoute from './routes/auth.js'
const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB")
    } catch (error) {
        throw error;
    }
}


//check the connection with mongodb
mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected")
})
mongoose.connection.on("disconnected", () => {
    console.log("MongoDB Disconnected")
})


//middleware
app.use("/auth", authRoute)

app.listen(8800, () => {
    connect()
    console.log("Server is running on port 8800");
})