import express from "express";
import { connectToMongo } from "../src/database/database.js"; 
import defaultMiddlewares from "./middleware/defaultMiddlewars.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(defaultMiddlewares);
app.use("/users", userRouter);

connectToMongo();

export default app;
