import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/usersRoute.js";
import { globalErrorHandler } from "../middlewares/globalErrorHandler.js";


dbConnect();
const app = express();
// pass incoming data
app.use(express.json());

//routes
app.use("/", userRoutes);

// error middleware
app.use(globalErrorHandler);
export default app;
