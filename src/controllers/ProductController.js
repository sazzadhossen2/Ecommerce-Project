import { BrandListService, CategoryListService, LisByRemarkService, ListByKeyWordService, ListBySimilarSerice, ProductDetailsService, ProductListByCategoryService, ProductListByIdService, SliderListService } from "../services/ProductService.js";

export const ProductBrandList=async(req, res)=>{
  let result = await BrandListService();
  return res.status(200).json(result)

};


export const ProductCategoryList= async (req,res)=>{
  let result = await CategoryListService();
  return res.status(200).json(result);
}


export const ProductSliderList = async (req,res)=>{
let result = await SliderListService();
return res.status(200).json(result);
}

export const ProductBrandListById =async(req,res)=>{
  const result =await ProductListByIdService(req);
  return res.status(200).json(result);
}



export const ProductByCategoryList = async (req, res) => {
  const result = await ProductListByCategoryService(req); 
  return res.status(200).json(result);
}


export const ProductListBySmiler = async (req, res) =>{
  const result = await ListBySimilarSerice(req);
  return res.status(200).json(result);
} ;

export const ProductListByKeyWord = async (req, res) =>{
   const result = await ListByKeyWordService(req);
  return res.status(200).json(result);
} ;

export const ProductListByRemark = async (req, res) =>{
  const result = await LisByRemarkService(req);
  return res.status(200).json(result);
} ;
export const ProductDetails = async (req, res) =>{
  const result = await ProductDetailsService(req);
  return res.status(200).json(result);
} ;