

import mongoose from "mongoose";


const invoiceProductSchema = new mongoose.Schema(
  {
    userId:{type:mongoose.Schema.Types.ObjectId, required:true},
    productId:{type:mongoose.Schema.Types.ObjectId, required:true},
    invoiceId:{type:mongoose.Schema.Types.ObjectId, required:true}, 

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