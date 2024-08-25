import { json, urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { defaultConfig } from "../config/default.js"

const corsOptions = defaultConfig.corsOptions;

const middlewars = [
    json(),
    urlencoded({ extended: true }),
    cors(corsOptions),
    cookieParser()
];

export default middlewars;