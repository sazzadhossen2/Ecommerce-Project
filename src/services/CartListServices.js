import mongoose from "mongoose";
import CartModel from "../models/CartModel.js";
// import cartModel from "../models/CartModel.js";


export const SaveCartListService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userId = user_id;

    await CartModel.create(reqBody);
    return { status: "success", message: "Cart List Create Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong!" };
  }
};


export const UpdateCartListService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let cartID = req.params.cartID;
    let reqBody = req.body;

    console.log(reqBody);

    await CartModel.updateOne(
      { _id: cartID, userId: user_id },
      { $set: reqBody }
    );
    
    return { status: "success", message: "Cart List Update Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong !" };
  }
};





export const RemoveCartListService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userId = user_id;
    await CartModel.deleteOne(reqBody);
    return { status: "success", message: "Cart List Remove Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong !" };
  }
};


export const CartListService = async (req) => {
  try {
    const user_id = new mongoose.Types.ObjectId(req.headers.user_id);

    const matchStage = { $match: { userId: user_id } };

    const JoinStageProduct = {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "product",
      },
    };
    const unwindProductStage = {
      $unwind: { path: "$product", preserveNullAndEmptyArrays: true },
    };

    const JoinStageBrand = {
      $lookup: {
        from: "brands",
        localField: "product.brandId",
        foreignField: "_id",
        as: "brand",
      },
    };
    const unwindBrandStage = {
      $unwind: { path: "$brand", preserveNullAndEmptyArrays: true },
    };

    const JoinStageCategory = {
      $lookup: {
        from: "categories",
        localField: "product.categoryId",
        foreignField: "_id",
        as: "category",
      },
    };
    const unwindCategoryStage = {
      $unwind: { path: "$category", preserveNullAndEmptyArrays: true },
    };

    const projectionStage = {
      $project: {
        userId: 0, // ✅ fixed
        createdAt: 0,
        updatedAt: 0,
        "product._id": 0,
        "product.categoryId": 0,
        "product.brandId": 0,
        "brand._id": 0,
        "category._id": 0,
      },
    };

    const data = await CartModel.aggregate([
      matchStage,
      JoinStageProduct,
      unwindProductStage,
      JoinStageBrand,
      unwindBrandStage,
      JoinStageCategory,
      unwindCategoryStage,
      projectionStage,
    ]);

    return { status: "success", data };
  } catch (e) {
    return { status: "fail", message: e.message || "Something Went Wrong!" };
  }
};
