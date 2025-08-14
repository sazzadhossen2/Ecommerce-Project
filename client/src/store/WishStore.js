import axios from "axios";
import { create } from "zustand";
import Cookies from 'js-cookie';
const WishListStore = create((set, get) => ({
  isFormSubmit: false,

  authCfg: () => ({
    withCredentials: true,
    headers: { Authorization: `Bearer ${Cookies.get('token') || ''}` }
  }),

  WishListFormData: {
    productID: "",
  },


  WishFormChange: (name, value) => {
    set((state) => ({
      WishListFormData: {
        ...state.WishListFormData,
        [name]: value
      }
    }));
  },


  wishListData: null,
  WishListRequest: async () => {
    const res = await axios.get('/api/v1/WishList', get().authCfg());
    if (res.data['status'] === 'success') {
      set({ wishListData: res.data['data'] });
    }
  },


SaveWishListRequest:async()=>{
  set({isFormSubmit:true});
  let res =await axios.post('/api/v1/SaveWishList', get().WishListFormData,get().authCfg());
  set({isFormSubmit:false});
  return res.data['status'] === 'Success' ;
},


// RemoveWishListRequest:async()=>{
//   set({isFormSubmit:true});
//   let res =await axios.delete('/api/v1/RemoveWishList', get().WishListFormData,get().authCfg());
//   console.log("Remove item response:", res);
//   set({isFormSubmit:false});
//   return res.data['status'] === 'Success' ;
// },


RemoveWishListRequest: async () => {
  set({ isFormSubmit: true });
  let res = await axios.delete('/api/v1/RemoveWishList', {
    ...get().authCfg(),
    data: get().WishListFormData
  });
  set({ isFormSubmit: false });
  return res.data['status'] === 'Success';
},


}));

export default WishListStore;