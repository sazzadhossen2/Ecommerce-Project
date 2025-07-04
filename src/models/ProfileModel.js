
import mongoose from "mongoose";


const ProfileSchema = new mongoose.Schema(
  {

    userId:{type:mongoose.Schema.Types.ObjectId, required:true},
    cus_add:{type:String},
    cus_city:{type:String},
    cus_state:{type:String},
    cus_country:{type:String},  
    cus_fax:{type:String},
    cus_phone:{type:String},
    cus_postcode:{type:String},
    cus_name:{type:String},

    ship_add:{type:String},
    ship_city:{type:String},
    ship_state:{type:String},
    ship_country:{type:String},
    ship_phone:{type:String},
    ship_postcode:{type:String},
    ship_name:{type:String},


  },
  {
timeseries:true,
versionKey:false,  
}
);
const ProfileModel =mongoose.model("profile",ProfileSchema);

export default ProfileModel;

