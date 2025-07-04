

import mongoose from "mongoose";


const categorySchema = new mongoose.Schema(
  {
    categoryName:{type:String, require:true, unique:true, trim:true},
    categoryImage:{type:String,require:true},

  },
  {
timeseries:true,
versionKey:false,  
}
);
const CategoryModel =mongoose.model("categories",categorySchema);

export default CategoryModel;