import mongoose from "mongoose";
import WishesModel from "../models/WishModel.js";

export const SaveWishListController =async(req)=>{
  try{
  
     const user_id = req.headers["user_id"]; 
    const reqBody = req.body;
    reqBody.userId = user_id; 

    await WishesModel.updateOne(
    reqBody,
      { $set: reqBody },
      { upsert: true }
    );

    return {status:"Success",message:"WishList Save Successfully"}

  }catch(e){
return {status:"false", data:e.toString()}
  }
}

export const RemoveWishListController =async(req)=>{
 try{

     const user_id = req.headers["user_id"]; 
    const reqBody = req.body;
    reqBody.userId = user_id; 

    await WishesModel.deleteOne(
    reqBody
    );

    return {status:"Success",message:"WishList Delete Successfully"}
  }catch(e){
return {status:"false", data:e.toString()}
  }
}



// export const WishListController = async (req) => {
//   try {
//     const user_id = new mongoose.Types.ObjectId(req.headers["user_id"]);

//     const matchStage = { $match: { userId: user_id } };
//  console.log(user_id);
//     const JoinStageProduct = {
//       $lookup: {
//         from: "products",
//         localField: "productId", 
//         foreignField: "_id",
//         as: "Product"
//       }
//     };

//     const unWindProductStage = { $unwind: "$Product" };

//     const JoinStageBrand = {
//       $lookup: {
//         from: "brands",
//         localField: "Product.brandId",
//         foreignField: "_id",
//         as: "brand"
//       }
//     };

//     const unWindBrandStage = { $unwind: "$brand" };

//     const JoinStageCategory = {
//       $lookup: {
//         from: "categories",
//         localField: "Product.categoryId", 
//         foreignField: "_id",
//         as: "category"
//       }
//     };

//     const unWindCategoryStage = { $unwind: "$category" };

//     const projectionStage = {
//       $project: {
//         _id: 0,
//         userId: 0,
//         createdAt: 0,
//         updatedAt: 0,
//         "Product.__v": 0,
//         "Product.brandId": 0,
//         "Product.categoryId": 0,
//         "brand.__v": 0,
//         "category.__v": 0
//       }
//     };

//     const data = await WishesModel.aggregate([
//       matchStage,
//       JoinStageProduct,
//       unWindProductStage,
//       JoinStageBrand,
//       unWindBrandStage,
//       JoinStageCategory,
//       unWindCategoryStage,
//       projectionStage
//     ]);

//     console.log("Aggregated Data:", data);
//     return { status: "success", data: data };
//   } catch (e) {
//     console.error("Wishlist Error:", e);
//     return { status: "false", data: e.toString() };
//   }
// };


export const WishListController = async (req) => {
  try {
    const user_id = new mongoose.Types.ObjectId(req.headers["user_id"]);

    const matchStage = { $match: { userId: user_id } };

    const JoinStageProduct = {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "Product"
      }
    };
    const unWindProductStage = {
      $unwind: { path: "$Product", preserveNullAndEmptyArrays: false }
    };

    // const unWindProductStage = { $unwind: "$Product" };

    const JoinStageBrand = {
      $lookup: {
        from: "brands",
        localField: "Product.brandId",
        foreignField: "_id",
        as: "brand"
      }
    };
    const unWindBrandStage = {
      $unwind: { path: "$brand", preserveNullAndEmptyArrays: true }
    };

      // const unWindBrandStage = { $unwind: "$brand" };
    const JoinStageCategory = {
      $lookup: {
        from: "categories",
        localField: "Product.categoryId",
        foreignField: "_id",
        as: "category"
      }
    };
    const unWindCategoryStage = {
      $unwind: { path: "$category", preserveNullAndEmptyArrays: true }
    };

    //  const unWindCategoryStage = { $unwind: "$category" };

    const projectionStage = {
      $project: {
        _id: 0,
        userId: 0,
        createdAt: 0,
        updatedAt: 0,
        "Product.__v": 0,
        "Product.brandId": 0,
        "Product.categoryId": 0,
        "brand.__v": 0,
        "category.__v": 0
      }
    };

    const data = await WishesModel.aggregate([
      matchStage,
      JoinStageProduct,
      unWindProductStage,
      JoinStageBrand,
      unWindBrandStage,
      JoinStageCategory,
      unWindCategoryStage,
      projectionStage
    ]);

    console.log("Aggregated Wishlist Data:", data);

    return { status: "success", data };
  } catch (e) {
    console.error("Wishlist Error:", e);
    return { status: "false", data: e.toString() };
  }
};
