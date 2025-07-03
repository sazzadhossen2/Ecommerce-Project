
import cookieParser from "cookie-parser";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import hpp from "hpp";


const app = express();



// Security Middleware
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());
app.use(cors());
app.use(xss());
app.use(hpp())






export default app;

// 1.16 hr