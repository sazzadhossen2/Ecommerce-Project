import axios from 'axios';
import { create } from 'zustand';
import Cookies from 'js-cookie';
const UserProfile = create((set, get)=>({
isFormSubmit: false,

// ProfileCookies:()=>{
//     return !! Cookies.get("token");
//   },

 authCfg: () => ({
    withCredentials: true,                             
    // headers: { token: Cookies.get('token') || '' }  
     headers: { Authorization: `Bearer ${Cookies.get('token') || ''}` }    
  }),

ProfileFormData: {
    cus_add: "",
    cus_city: "",
    cus_state: "",
    cus_country: "",
    cus_fax: "",
    cus_phone: "",
    cus_postcode: "",
    cus_name: "",

    ship_add: "",
    ship_city: "",
    ship_state: "",
    ship_country: "",
    ship_phone: "",
    ship_postcode: "",
    ship_name: "",
  },





  ProfileFormOnChange: (name, value) => {  
    set((state) => ({
      ProfileFormData: {
        ...state.ProfileFormData,
        [name]: value
      }
    }));
  },


ProfileData:null,
// ReadProfileRequest:async()=>{
//   let res =await axios.get('/api/v1/ReadProfile',get().authCfg());
//   if(res.data['status']==='success'){
//     set({ProfileData: res.data['data'] })
//   }
// },

// src/store/UserProfile.js
ReadProfileRequest: async () => {
  const res = await axios.get('/api/v1/ReadProfile', get().authCfg());

  // accept both {status:"success"} and {status:"Success"}
  const ok = (res?.data?.status || '').toString().toLowerCase() === 'success';
  if (!ok) return false;

  // unwrap array payload to a single object
  const raw = res?.data?.data;
  const item = Array.isArray(raw) ? (raw[0] || null) : raw;

  set({ ProfileData: item });
  return true;
},



CreateProfileRequest:async()=>{
  set({isFormSubmit:true});
  let res =await axios.post('/api/v1/CreateProfile', get().ProfileFormData,get().authCfg());
  set({isFormSubmit:false});
  return res.data['status'] === 'success' ;
},


UpdateProfileRequest:async()=>{
  set({isFormSubmit:true});
  let res =await axios.put('/api/v1/UpdateProfile', get().ProfileFormData,get().authCfg());
  set({isFormSubmit:false});
  return res.data['status'] === 'success' ;
}

}))


export default UserProfile;


