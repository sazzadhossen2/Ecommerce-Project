import FeaturesModel from "../models/FeaturesModel.js"
import LegalsModel from "../models/LegalModel.js";

export const FeatureListService =async()=>{
  try{
    const data =await FeaturesModel.find();
    return {status:"Success", data:data}

  }catch(error){
   return {status:"Success", data:error}.toString();
  }
}

export const LegalDetailsService=async(req)=>{
 try{
    const type = req.params.type;
    const data = await LegalsModel.find({type:type});
    return {status:"Success", data:data}

  }catch(error){
   return {status:"Success", data:error}.toString();
  }
}