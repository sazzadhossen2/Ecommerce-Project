
import cookieParser from "cookie-parser";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import hpp from "hpp";
import rateLimit from "express-rate-limit"; 
import router from "./src/routes/api.js";

const app = express();



// Security Middleware
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());
app.use(cors());
app.use(xss());
app.use(hpp())


// Parsing
app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Rate Limiting
const limit = rateLimit({
  
  windowMs: 15 *60*1000,
  max: 100, // Limit each IP to 100 requests per windowMs
})
app.use(limit);


app.set('etag', false); 

app.get('/ProductBrandList', (req, res) => {
  res.status(200).json({ message: "Product Brand List Endpoint" });
});


app.use('/api/v1',router)

app.use(express.static('client-side/dist'));
app.get('*', (req, res) => {
  res.sendFile(Path.resolve(__dirname,'client-side', 'dist', 'index.html'));
});

export default app;


// 1.31?

