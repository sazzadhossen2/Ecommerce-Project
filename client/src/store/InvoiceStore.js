import axios from 'axios';
import { create } from "zustand";
import Cookies from 'js-cookie';
const BasUrl="https://ecommerce-project-efq3.onrender.com";
const InvoiceStore =create((set,get)=>(
  {
 
   authCfg: () => ({
     withCredentials: true,
     headers: { Authorization: `${BasUrl}Bearer ${Cookies.get("token") || ""}` },
   }),

   CreateInvoice:null,
    CreateInvoiceRequest:async()=>{
      let res =await axios.get(`${BasUrl}/api/v1/CreateInvoice`, get().authCfg());
      if(res.data['status'] === 'success'){
        set({CreateInvoice:res.data['data']});  
    }
  },
  

}
))

export default InvoiceStore;


