import mongoose, { connect } from "mongoose";
import config from "../config/index.js";
import chalk from "chalk";

export const mongoURI = config.dbUri;

export const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI)
        console.log(chalk.cyan(chalk.bold(`Connected to MongoDB on ${mongoURI}`)));
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1); // Exit the process if the connection fails
    }
};

mongoose.set("strictPopulate", false);
export default { mongoose };
