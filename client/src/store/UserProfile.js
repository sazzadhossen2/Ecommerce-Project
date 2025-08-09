import axios from 'axios';
import { create } from 'zustand';
const UserProfile = create((set, get)=>({
isFormSubmit: false,



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
ReadProfileRequest:async()=>{
  let res =await axios.get('/api/v1/ReadProfile');
  if(res.data['status']==='success'){
    set({ProfileData: res.data['data'] })
  }
},


CreateProfileRequest:async()=>{
  set({isFormSubmit:true});
  let res =await axios.post('/api/v1/CreateProfile', get().ProfileFormData);
  set({isFormSubmit:false});
  return res.data['status'] === 'success' ;
},


UpdateProfileRequest:async()=>{
  set({isFormSubmit:true});
  let res =await axios.put('/api/v1/UpdateProfile', get().ProfileFormData);
  set({isFormSubmit:false});
  return res.data['status'] === 'success' ;
}

}))


export default UserProfile;