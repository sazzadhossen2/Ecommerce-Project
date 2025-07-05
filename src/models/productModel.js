

import mongoose from "mongoose";


const productSchema = new mongoose.Schema(
  {
  
    title:{type:String,require:true},
    description:{type:String,require:true},
    price:{type:Number,require:true}, 
    discount:{type:Boolean,require:true},
    discountPrice:{type:String,require:true},
    image:{type:String,require:true},
    stock:{type:String,require:true},
    remark:{type:String,require:true},
    categoryId:{type:mongoose.Schema.Types.ObjectId, required:true,
      // ref:"categories"
    },
    brandId:{type:mongoose.Schema.Types.ObjectId, required:true,
      // ref:"brands"
    },
  },
  {
timeseries:true,
versionKey:false,  
}
);
const ProductModel =mongoose.model("products",productSchema);

export default ProductModel;