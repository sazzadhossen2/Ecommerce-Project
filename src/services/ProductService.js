import mongoose from "mongoose";
import BrandModel from "../models/BrnadModel.js";
import CategoryModel from "../models/CategoryModel.js";
import ProductSliderModel from "../models/ProductSliderModel.js";
import ProductModel from "../models/productModel.js";
import ReviewModel from "../models/ReviewModel.js";
const ObjectId = mongoose.Types.ObjectId;

export const BrandListService = async()=>{
  try{
    const data = await BrandModel.find();
    return ({
    
      message: "success",
      data: data,
    });
  
  }catch(e){
    return {
      message: "Error in fetching brand list",
      data: e
    }.toString();
  
  } 
}




export const CategoryListService = async()=>{
  try{
    const data = await CategoryModel.find();
    return ({
    
     message: "success",
      data: data,
    });
  
  }catch(e){
    return {
      message: "Error in fetching brand list",
      data: e
    }.toString();
  
  } 
}



export const SliderListService = async () => {
  try {
    const data = await ProductSliderModel.find();
    return {
      message: "success",
      data: data,
    };
  } catch (e) {
    return {
      message: "Error in fetching slider list",
      data: e,
    }.toString();
  }
} 




export const ProductListByIdService = async (req) => {
  try {
    const brandID = new ObjectId(req.params.brandID); 
    const matchStage = { $match: { brandID: brandID } }; 

    const joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID", 
        foreignField: "_id",
        as: "brand"
      }
    };

    const joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID", 
        foreignField: "_id",
        as: "category"
      }
    };


    const unwindBrandStage = { $unwind: "$brand" };
    const unwindCategoryStage = { $unwind: "$category" };

    const projectStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        "brandID": 0,
      }
    };

    const data = await ProductModel.aggregate([
      matchStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      unwindBrandStage,
      unwindCategoryStage,
      projectStage
    ]);

    return {
      message: "success",
      data: data,
    };

  } catch (e) {
    return {
      message: "Error in fetching product by brand ID",
      data: e.message // ✅ show only the error message
    };
  }
};


export const ProductListByCategoryService= async(req)=>{

  try{
    const categoryID = new ObjectId(req.params.categoryID);
    const matchStage = {$match:{categoryID:categoryID}};
    const joinWithBrandStage ={
      $lookup:{
        from:"brands",
        localField:"brandID",
        foreignField:"_id",
        as:"brand"
      }
    }
    const joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category"
      }
    };
    const unwindBrandStage = {$unwind:"$brand"};
    const unwindCategoryStage ={$unwind:"$category"};
    const projectStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        "brandID": 0,
        "categoryID": 0,
      }
    
    };
    const data = await ProductModel.aggregate([
      matchStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      unwindBrandStage,
      unwindCategoryStage,
      projectStage,
    ]);
    return {
      message: "success",
      data: data,
    };

  }catch(e){
    return {
      message: "Error in fetching product by category ID",
      data: e.message // ✅ show only the error message
    };
  }
}


export const ListBySimilarSerice= async(req)=>{

  try{
    const categoryID = new ObjectId(req.params.categoryID);
    const matchStage = {$match:{categoryID:categoryID}};
    let limitString ={$limit: 20}; // Limit to 10 products
    
    const joinWithBrandStage ={
      $lookup:{
        from:"brands",
        localField:"brandID",
        foreignField:"_id",
        as:"brand"
      }
    }
    const joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category"
      }
    };
    const unwindBrandStage = {$unwind:"$brand"};
    const unwindCategoryStage ={$unwind:"$category"};
    const projectStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        "brandID": 0,
        "categoryID": 0,
      }
    
    };
    const data = await ProductModel.aggregate([
      matchStage,
      limitString,
      joinWithBrandStage,
      joinWithCategoryStage,
      unwindBrandStage,
      unwindCategoryStage,
      projectStage,
    ]);
    return {
      message: "success",
      data: data,
    };

  }catch(e){
    return {
      message: "Error in fetching product by category ID",
      data: e.message // ✅ show only the error message
    };
  }
}


export const ListByKeyWordService= async(req)=>{

  try{
  

    let SearchRegex =  {$regex:req.params.keyWord, $options: "i"}; // Case-insensitive search
    let searchParams=[{title:SearchRegex},{shortDes:SearchRegex}];
    let SearchQuary = {$or:searchParams};
    let matchStage = {$match:SearchQuary};

    const joinWithBrandStage ={
      $lookup:{
        from:"brands",
        localField:"brandID",
        foreignField:"_id",
        as:"brand"
      }
    }
    const joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category"
      }
    };
    const unwindBrandStage = {$unwind:"$brand"};
    const unwindCategoryStage ={$unwind:"$category"};
    const projectStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        "brandID": 0,
        "categoryID": 0,
      }
    
    };
    const data = await ProductModel.aggregate([
      matchStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      unwindBrandStage,
      unwindCategoryStage,
      projectStage,
    ]);
    return {
      message: "success",
      data: data,
    };

  }catch(e){
    return {
      message: "Error in fetching product by category ID",
      data: e.message // ✅ show only the error message
    };
  }
}


export const LisByRemarkService= async(req)=>{

  try{
  
let Remark = req.params.Remark;
  let matchStage = {$match:{remark:Remark}};

    const joinWithBrandStage ={
      $lookup:{
        from:"brands",
        localField:"brandID",
        foreignField:"_id",
        as:"brand"
      }
    }
    const joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category"
      }
    };
    const unwindBrandStage = {$unwind:"$brand"};
    const unwindCategoryStage ={$unwind:"$category"};
    const projectStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        "brandID": 0,
        "categoryID": 0,
      }
    
    };
    const data = await ProductModel.aggregate([
      matchStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      unwindBrandStage,
      unwindCategoryStage,
      projectStage,
    ]);
    return {
      message: "success",
      data: data,
    };

  }catch(e){
    return {
      message: "Error in fetching product by category ID",
      data: e.message 
    };
  }
}


export const ProductDetailsService = async (req) => {
  try {
    const productID = new ObjectId(req.params.productID); 
    const matchStage = { $match: { _id: productID } }; 

    const joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID", 
        foreignField: "_id",
        as: "brand"
      }
    };

    const joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID", 
        foreignField: "_id",
        as: "category"
      }
    };

    const JoinWithDetails={
      $lookup: {
        from: "productdetails",
        localField: "_id", 
        foreignField: "productID",
        as: "details"
      }
    }


    const unwindBrandStage = { $unwind: "$brand" };
    const unwindCategoryStage = { $unwind: "$category" };
    const unwindDetailsStage = { $unwind: "$details" };

    const projectStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        "brandID": 0,
      }
    };

    const data = await ProductModel.aggregate([
      matchStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      JoinWithDetails,
      unwindBrandStage,
      unwindCategoryStage,
      unwindDetailsStage,
      projectStage
    ]);

    return {
     message: "success",
      data: data,
    };

  } catch (e) {
    return {
      message: "Error in fetching product by brand ID",
      data: e.message // ✅ show only the error message
    };
  }
};



export const ReviewListService = async (req) => {
  try {
    const ProductID = new ObjectId(req.params.ProductID);

    const data = await ReviewModel.aggregate([
      { $match: { ProductId: ProductID } }, // ✅ Match schema field exactly
    
    ]);

    return { status: "success", data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

export const CreateReviewService = async (req) => {
  try {
    const user_id = req.headers.user_id;        
    let reqBody = req.body;                     

    const data = await ReviewModel.create({
      ProductId: reqBody.productId,            
      userId: user_id,                           
      description: reqBody.des,               
      rating: reqBody.rating,                 
    });

    return { status: "success", data };          
  } catch (e) {
    return { status: "fail", data: e.toString() }; 
  }
};



export const ListByFilterService = async (req) => {
  try {
    const matchConditions = {};
    if (req.body.categoryID) {
      matchConditions.categoryID = new ObjectId(req.body.categoryID);
    }
    if (req.body.brandID) {
      matchConditions.brandID = new ObjectId(req.body.brandID);
    }

    const priceMin = parseInt(req.body.priceMin);
    const priceMax = parseInt(req.body.priceMax);

    const priceMatch = {};
    if (!isNaN(priceMin)) priceMatch.numericPrice = { $gte: priceMin };
    if (!isNaN(priceMax)) {
      priceMatch.numericPrice = {
        ...(priceMatch.numericPrice || {}),
        $lte: priceMax,
      };
    }

    const data = await ProductModel.aggregate([
      { $match: matchConditions },
      { $addFields: { numericPrice: { $toInt: "$price" } } },
      { $match: priceMatch },
      {
        $lookup: {
          from: "brands",
          localField: "brandID",
          foreignField: "_id",
          as: "brand",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryID",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: { path: "$brand", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          "brand._id": 0,
          "category._id": 0,
          categoryID: 0,
          brandID: 0,
        },
      },
    ]);

    return { status: "success", data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};
