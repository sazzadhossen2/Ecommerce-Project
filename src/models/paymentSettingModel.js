

import mongoose from "mongoose";


// const paymentSettingSchema = new mongoose.Schema(
//   {


//     store_id:{type:String,require:true},
//     store_password:{type:String,require:true},
//     currency:{type:String,require:true},
//     success_url:{type:String,require:true},
//     fail_urls:{type:String,require:true},
//     cancel_urls:{type:String,require:true},
//     ipn_url:{type:String,require:true},
//     init_utl:{type:String,require:true},
//     description:{type:String,require:true},
   
  
  
//   },
//   {
// timeseries:true,
// versionKey:false,  
// }
// );

const paymentSettingSchema = new mongoose.Schema({
  store_id:       { type: String, required: true },
  store_passwd:   { type: String, required: true }, // ✅ Fixed
  currency:       { type: String, required: true },
  success_url:    { type: String, required: true },
  fail_url:       { type: String, required: true }, // ✅ Fixed
  cancel_url:     { type: String, required: true }, // ✅ Fixed
  ipn_url:        { type: String, required: true },
  init_url:       { type: String, required: true }, // ✅ Fixed
  description:    { type: String, required: true }
}, {
  timestamps: true, // ✅ Use `timestamps` not `timeseries`
  versionKey: false
});

const PaymentSettingModel =mongoose.model("paymentsettings",paymentSettingSchema);

export default PaymentSettingModel;