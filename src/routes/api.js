
import express from "express";
import { CreateReview, ProductBrandList, ProductBrandListById, ProductByCategoryList, ProductCategoryList, ProductDetails, ProductListByFilter, ProductListByKeyWord, ProductListByRemark, ProductListBySmiler, ProductReviewList, ProductSliderList } from "../controllers/ProductController.js";
import { AuthVerification } from "../middlewares/AuthVerification.js";
import { CreateProfile, ReadProfile, UpdateProfile, UserLgout, UserOTP, VerifyOTP } from "../controllers/UserController.js";
import { RemoveWishList, SaveWishList, WishList } from "../controllers/WishListController.js";

import { CartList, RemoveCartList, SaveCartList, UpdateCartList } from "../controllers/CartController.js";
// import { CreateInvoice, InvoiceList } from "../controllers/InvoiceController.js";
import { FeatureListController, LegalDetailsController } from "../controllers/FeatureController.js";

import { CreateInvoice, InvoiceList, InvoiceProductList, PaymentCancel, PaymentFail, PaymentIPN, PaymentSuccess } from "../controllers/InvoiceController.js";
// import { CreateInvoice } from "../controllers/InvoiceController.js";

const router = express.Router();



router.get('/productBrandList',ProductBrandList)
router.get('/productCategoryList',ProductCategoryList)
router.get('/productSliderList',ProductSliderList)
router.get('/productBrandListById/:brandID',ProductBrandListById)
router.get('/productByCategoryList/:categoryID',ProductByCategoryList) ;
router.get('/productListBySmiler/:categoryID',ProductListBySmiler)
router.get('/productListByKeyWord/:keyWord',ProductListByKeyWord) ;
router.get('/productListByRemark/:Remark',ProductListByRemark) ;
router.get('/productDetails/:productID',ProductDetails) ;
router.post('/ProductListByFilter',ProductListByFilter)

router.post("/CreateReview", AuthVerification, CreateReview);
router.get("/ProductReviewList/:ProductID", ProductReviewList);


// User
router.get('/UserOTP/:email',UserOTP);
router.get('/VerifyLogin/:email/:otp',VerifyOTP);
router.get('/UserLogout',AuthVerification,UserLgout);

//Profile

router.post('/CreateProfile',AuthVerification,CreateProfile);
router.get('/ReadProfile',AuthVerification,ReadProfile);
router.put('/UpdateProfile',AuthVerification,UpdateProfile);



//Wish List
router.post('/SaveWishList',AuthVerification,SaveWishList);
router.delete('/RemoveWishList',AuthVerification,RemoveWishList);
router.get('/WishList',AuthVerification,WishList);


//Cart 

router.post("/SaveCartList", AuthVerification, SaveCartList);
router.post("/UpdateCartList/:cartID", AuthVerification, UpdateCartList);
router.post("/RemoveCartList", AuthVerification, RemoveCartList);
router.get("/CartList", AuthVerification, CartList);

//features
router.get("/features", FeatureListController);
router.get("/legal/:type", LegalDetailsController);


// Invoice & Payment
router.get("/CreateInvoice", AuthVerification, CreateInvoice);
router.get("/InvoiceList", AuthVerification, InvoiceList);
router.get("/InvoiceProductList/:invoice_id",AuthVerification,InvoiceProductList)


router.post('/PaymentSuccess/:trxID',PaymentSuccess)
router.post('/PaymentCancel/:trxID',PaymentCancel)
router.post('/PaymentFail/:trxID',PaymentFail)
router.post('/PaymentIPN/:trxID',PaymentIPN)


export default router;

