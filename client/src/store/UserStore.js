import axios from 'axios';
import { create } from 'zustand';
import { setEmail } from "../utility/utility.js";
 const UserStore = create((set)=>({
isFormSubmit:false,
LoginFormData:{email:""},
LoginFormOnChange:(name,value)=>{
  set((state)=>({
LoginFormData:{
      ...state.LoginFormData,
    [name]:value
}
  }))
},

UserOTPRequest:async(email)=>{
  set({isFormSubmit:true});
  let res =await axios.get(`/api/v1/UserOTP/${email}`);
  setEmail(email);
  set({isFormSubmit:false});
  return res.data["status"]=== "Success";
}
 }));

 export default UserStore;