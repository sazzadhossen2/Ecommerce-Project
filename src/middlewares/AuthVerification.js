import { DecodeToken } from "../utils/TokenHelper.js";



//   const token =req.headers.token || req.cookies.token;

//   const decoded =DecodeToken(token);
// console.log(" Token2:", token);
//   if(!decoded){
//     return res.status(401).json({status:"failed",message:"Unauthorised"});

//   }
//   const {email,user_id}=decoded;
//   req.headers.email=email;
//   req.headers.user_id=user_id;

//   next();
// }
// console.log(" Token:", token);
// console.log("Decoded Token:", decoded);
// console.log("Auth")
// console.log(AuthVerification);

export const AuthVerification = (req, res, next) => {
  const authHeader = req.headers.authorization;
const token = authHeader?.startsWith("Bearer ")
  ? authHeader.split(" ")[1]
  : null;

  // const token = req.headers.token || req.cookies.token;
  // console.log("🛡️ Token received:", token);

  const decoded = DecodeToken(token);
  // console.log("🔐 Decoded Token:", decoded);

  if (!decoded) {
    return res.status(401).json({ status: "failed", message: "Unauthorised" });
  }

  req.headers.email = decoded.email;
  req.headers.user_id = decoded.user_id;

  next();
};
