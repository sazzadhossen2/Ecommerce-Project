



import mongoose from "mongoose";


const CartSchema = new mongoose.Schema(
  {
    userId:{type:mongoose.Schema.Types.ObjectId, required:true},
    productId:{type:mongoose.Schema.Types.ObjectId, required:true},
    qty:{type:String,require:true},
    size:{type:String,require:true},
    color:{type:Boolean,require:true},

    

  },
  {
timeseries:true,
versionKey:false,  
}
);
const cartModel =mongoose.model("cart",CartSchema);

export default cartModel;