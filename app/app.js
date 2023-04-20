import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/usersRoute.js";
import {
  globalErrorHandler,
  notFound,
} from "../middlewares/globalErrorHandler.js";
import productsRouter from "../routes/productsRoute.js";

dbConnect();
const app = express();
// pass incoming data
app.use(express.json());

//routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productsRouter);

// error middleware
app.use(notFound);
app.use(globalErrorHandler);
export default app;
