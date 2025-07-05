
import express from "express";
import { ProductBrandList, ProductBrandListById, ProductByCategoryList, ProductCategoryList, ProductDetails, ProductListByKeyWord, ProductListByRemark, ProductListBySmiler, ProductSliderList } from "../controllers/ProductController.js";

const router = express.Router();



router.get('/productBrandList',ProductBrandList)
router.get('/productCategoryList',ProductCategoryList)
router.get('/productSliderList',ProductSliderList)
router.get('/productBrandListById/:brandID',ProductBrandListById)
router.get('/productByCategoryList/:categoryID',ProductByCategoryList) ;
router.get('/productListBySmiler/:categoryID',ProductListBySmiler)
router.get('/productListByKeyWord/:keyWord',ProductListByKeyWord) ;
router.get('/productListByRemark/:Remaek',ProductListByRemark) ;
router.get('/productDetails/:productID',ProductDetails) ;

export default router;

