import mongoose from "mongoose";
import BrandModel from "../models/BrnadModel.js";

export const BrandListService = async()=>{
  try{
    const data = await BrandModel.find();
    return ({
    
      message: "Success Brand List",
      data: data,
    });
    console.log(data);
    console.log("Success Brand List");
  }catch(e){
    return {
      message: "Error in fetching brand list",
      data: e
    }.toString();
     console.log("Failed Brand List");
  } 
}