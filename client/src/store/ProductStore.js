import axios from 'axios';
import { create } from "zustand";
const BasUrl="https://ecommerce-project-efq3.onrender.com";
const ProductStore =create((set)=>(
  {
    BrandList:null,
    BrandListRequest:async()=>{
      let res =await axios.get(`${BasUrl}/api/v1/productBrandList`);
      if(res.data['message'] === 'success'){
        set({BrandList:res.data['data']});  
    }
  },


    CategoryList:null,
    CategoryListRequest:async()=>{
      let res =await axios.get(`${BasUrl}/api/v1/productCategoryList`);
      console.log('CategoryListResponse:', res.data);
      if(res.data['message'] === 'success'){
        console.log('CategoryListDataCategoryList:', res.data['data']);
        set({CategoryList:res.data['data']});  
    }
  },

   SliderList:null,
    SliderListRequest:async()=>{
      let res =await axios.get(`${BasUrl}/api/v1/productSliderLis`);
      if(res.data['message'] === 'success'){
        set({SliderList:res.data['data']});  
    }
  },

   ListByRemark:null,
    ListByRemarkRequest:async(remark)=>{
      let res =await axios.get(`${BasUrl}/api/v1/productListByRemark/${remark}`);
      if(res.data['message'] === 'success'){
        set({ListByRemark:res.data['data']});  
    }
  },

  ListByBrand: null,
  ListByBrandRequest: async (BrandId) => {
    let res = await axios.get(`${BasUrl}/api/v1/productBrandListById/${BrandId}`);
    if (res.data['message'] === 'success') {
      set({ ListByBrand: res.data['data'] });
    }
  },


   ProductDetails: null,
    ProductDetailsRequest: async (productID) => {
    let res =await axios.get(`${BasUrl}/api/v1/productDetails/${productID}`);
    console.log('ProductDetailsResponse:', res.data);
    if (res.data['message'] === 'success') {
      set({ ProductDetails: res.data['data'] });
    }
   
  },

}
))

export default ProductStore;


