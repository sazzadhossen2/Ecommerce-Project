
import mongoose from "mongoose";


const wishesSchema = new mongoose.Schema(
  {
    userId:{type:mongoose.Schema.Types.ObjectId, required:true},
    productId:{type:mongoose.Schema.Types.ObjectId, required:true},
  
  },
 {
  timestamps: true,
  versionKey: false
}
);
const WishesModel =mongoose.model("wishes",wishesSchema);

export default WishesModel;