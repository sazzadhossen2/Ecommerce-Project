
import mongoose from "mongoose";


const brandSchema = new mongoose.Schema(
  {

    brandName:{type:String, require:true, unique:true, trim:true},
    brandImage:{type:String,require:true}
  },
  {
  timestamps:true,
  versionKey:false,
  }
);
const BrandModel =mongoose.model("brands",brandSchema);

export default BrandModel;