
import cookieParser from "cookie-parser";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import cors from "cors";
// import xss from "xss-clean";
import hpp from "hpp";
import rateLimit from "express-rate-limit"; 
import router from "./src/routes/api.js";
// import path from 'path';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

var img = "bjdbsjdbjsbndbndjksnbdkjsbnk dnskjksdn kndkjsdn"



// Security Middleware
app.use(cookieParser());
app.use(helmet(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'", "'unsafe-inline'"],
  }})
));
app.use(mongoSanitize());
app.use(cors());
// app.use(xss());
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

// app.use(express.static('client/dist'));

// // Add React Front End Routing
// app.get("*", function(req, res) {
//     res.sendFile(path.resolve(__dirname, 'client/dist', 'index.html'));
// });

app.use(express.static(path.resolve(__dirname, "client", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});


export default app;


// 1.31?

