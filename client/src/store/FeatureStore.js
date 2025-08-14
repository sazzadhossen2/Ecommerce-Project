import axios from 'axios';
import { create } from "zustand";

const FeatureStore =create((set)=>(
  {
    FeatureList:null,
    FeatureListRequest:async()=>{
      let res =await axios.get('/api/v1/features');
      console.log('FeatureListResponse:', res.data);
      if(res.data['status'] === 'Success'){
        set({FeatureList:res.data['data']});  
    }
  },




}
))

export default FeatureStore;


