import { RemoveWishListController, SaveWishListController, WishListController } from "../services/wishListService.js";

export const SaveWishList = async (req, res) =>{
  const result = await SaveWishListController(req);
  return res.status(200).json(result);
} ;



export const RemoveWishList = async (req, res) =>{
  const result = await RemoveWishListController(req);
  return res.status(200).json(result);
} ;


export const WishList = async (req, res) =>{
  const result = await WishListController(req);
  return res.status(200).json(result);
} ;