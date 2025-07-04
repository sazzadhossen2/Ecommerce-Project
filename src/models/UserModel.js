


import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
   email:{type:String, require:true, unique:true, trim:true},
   otp:{type:String, require:true},

  },
  {
timeseries:true,
versionKey:false,  
}
);
const UserModel =mongoose.model("usermodel",userSchema);

export default UserModel;