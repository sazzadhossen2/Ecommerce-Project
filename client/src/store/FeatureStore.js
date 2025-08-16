import axios from 'axios';
import { create } from "zustand";
const BasUrl="https://ecommerce-project-efq3.onrender.com";
const FeatureStore =create((set)=>(
  {
    FeatureList:null,
    FeatureListRequest:async()=>{
      let res =await axios.get('/api/v1/features');
      console.log(`${BasUrl}FeatureListResponse:`, res.data);
      if(res.data['status'] === 'Success'){
        set({FeatureList:res.data['data']});  
    }
  },




}
))

export default FeatureStore;


