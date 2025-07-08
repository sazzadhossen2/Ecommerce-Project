



// import mongoose from "mongoose";


// const CartSchema = new mongoose.Schema(
//   {
//     userId:{type:mongoose.Schema.Types.ObjectId, required:true},
//     productId:{type:mongoose.Schema.Types.ObjectId, required:true},
//     qty:{type:String,require:true},
//     size:{type:String,require:true},
//     color:{type:String,require:true},

    

//   },
//   {
// timeseries:true,
// versionKey:false,  
// }
// );
// const cartModel =mongoose.model("cart",CartSchema);

// export default cartModel;


import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    qty: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true }, 
  },
  {
    timestamps: true, // replaces timeseries, adds createdAt & updatedAt
    versionKey: false,
  }
);

const CartModel = mongoose.model("cart", CartSchema);

export default CartModel;

