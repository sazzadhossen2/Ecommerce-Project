

import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    productID: { type: mongoose.Schema.Types.ObjectId, required: true },
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

