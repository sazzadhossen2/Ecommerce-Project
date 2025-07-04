

import mongoose from "mongoose";


const paymentSettingSchema = new mongoose.Schema(
  {


    store_id:{type:String,require:true},
    store_password:{type:String,require:true},
    currency:{type:String,require:true},
    success_url:{type:String,require:true},
    fail_urls:{type:String,require:true},
    cancel_urls:{type:String,require:true},
    ipn_url:{type:String,require:true},
    init_utl:{type:String,require:true},
    description:{type:String,require:true},
   
  
  
  },
  {
timeseries:true,
versionKey:false,  
}
);
const PaymentSettingModel =mongoose.model("paymentSetting",paymentSettingSchema);

export default PaymentSettingModel;