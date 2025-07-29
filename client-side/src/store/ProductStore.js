import axios from 'axios';
import { create } from "zustand";

const ProductStore =create((set)=>(
  {
    BrandList:null,
    BrandListRequest:async()=>{
      let res =await axios.get('/api/v1/productBrandList');
      if(res.data['status'] === 'success'){
        set({BrandList:res.data['data']});  
    }
  },


    CategoryList:null,
    CategoryListRequest:async()=>{
      let res =await axios.get('/api/v1/productCategoryList');
      if(res.data['status'] === 'success'){
        set({CategoryList:res.data['data']});  
    }
  },

   SliderList:null,
    SliderListRequest:async()=>{
      let res =await axios.get('/api/v1/productSliderList');
      if(res.data['status'] === 'success'){
        set({SliderList:res.data['data']});  
    }
  },

   ListByRemark:null,
    ListByRemarkRequest:async(remark)=>{
      let res =await axios.get(`/api/v1/productListByRemark/${remark}`);
      if(res.data['status'] === 'success'){
        set({ListByRemark:res.data['data']});  
    }
  },

}
))

export default ProductStore;


