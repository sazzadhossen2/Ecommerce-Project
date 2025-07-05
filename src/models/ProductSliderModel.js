


import mongoose from "mongoose";


const productSliderSchema = new mongoose.Schema(
  {
  
    title:{type:String,require:true},
    desc:{type:String,require:true},
    price:{type:String,require:true},
    image:{type:String,require:true},


   

    ProductId:{type:mongoose.Schema.Types.ObjectId, required:true},
   
  },
  {
timeseries:true,
versionKey:false,  
}
);
const ProductSliderModel =mongoose.model("productsliders",productSliderSchema);

export default ProductSliderModel;

