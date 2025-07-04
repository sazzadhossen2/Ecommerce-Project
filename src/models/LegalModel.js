

import mongoose from "mongoose";


const legalsSchema = new mongoose.Schema(
  {


    type:{type:String,require:true},
    description:{type:String,require:true}, 
  
  
  },
  {
timeseries:true,
versionKey:false,  
}
);
const LegalsModel =mongoose.model("legals",legalsSchema);

export default LegalsModel;