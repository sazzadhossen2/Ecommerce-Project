



import mongoose from "mongoose";


const ReviewSchema = new mongoose.Schema(
  {




    ProductId:{type:mongoose.Schema.Types.ObjectId, required:true},
    userId:{type:mongoose.Schema.Types.ObjectId, required:true},
    description:{type:String},
    rating:{type:String, required:true},
   
  },
  {
timeseries:true,
versionKey:false,  
}
);
const ReviewModel =mongoose.model("review",ReviewSchema);

export default ReviewModel;

