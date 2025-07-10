

import mongoose from "mongoose";


const invoiceProductSchema = new mongoose.Schema(
  {
    userID:{type:mongoose.Schema.Types.ObjectId, required:true},
    productID:{type:mongoose.Schema.Types.ObjectId, required:true},
    invoiceID:{type:mongoose.Schema.Types.ObjectId, required:true}, 
    price:{type:String,required:true},
    qty:{type:String,require:true},
    size:{type:String,require:true}, 
    color:{type:String,require:true},
  
  },
  {
timeseries:true,
versionKey:false,  
}
);
const InvoiceProductModel =mongoose.model("invoiceproducts",invoiceProductSchema);

export default InvoiceProductModel;