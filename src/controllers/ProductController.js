import { BrandListService } from "../services/ProductService.js";

export const ProductBrandList=async(req, res)=>{
  let result = await BrandListService();
  return res.status(200).json(result)
  console.log(result);
  console.log("Success Brand List");
};