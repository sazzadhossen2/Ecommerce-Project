import mongoose from "mongoose";
const featuresSchema = new mongoose.Schema(
  {


    name:{type:String,require:true},
    description:{type:String,require:true}, 
    image:{type:String,require:true},
  },
  {
timeseries:true,
versionKey:false,  
}
);
const FeaturesModel =mongoose.model("features",featuresSchema);

export default FeaturesModel;