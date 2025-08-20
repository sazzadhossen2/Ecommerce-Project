
import axios from "axios";
import { create } from "zustand";
import Cookies from "js-cookie";
import { BasUrl } from "../utility/utility";
// const BasUrl="https://ecommerce-project-efq3.onrender.com";
const CartStore = create((set, get) => ({
  isFormSubmit: false,


  
    cartAbilable:()=>{
      return !! Cookies.get("token");
    },

  authCfg: () => ({
    withCredentials: true,
    headers: { Authorization: `Bearer ${Cookies.get("token") || ""}` },
  }),

  // payload used when creating a cart row
  CartFormData: {
    productID: "", // ObjectId string
    qty: "",
    size: "",
    color: "",
  },

  // payload used when updating an existing cart row
  CartFormDataUpdate: {
    qty: "",
    size: "",
    color: "",
  },

  CartFormChange: (name, value) =>
    set((state) => ({
      CartFormData: { ...state.CartFormData, [name]: value },
    })),

  CartFormUpdateChange: (name, value) =>
    set((state) => ({
      CartFormDataUpdate: { ...state.CartFormDataUpdate, [name]: value },
    })),

  cartListData: null,

  // GET /CartList
  CartListRequest: async () => {
    const res = await axios.get(`${BasUrl}/api/v1/CartList`, get().authCfg());
      // const res = await axios.get(`/api/v1/CartList`, get().authCfg());
    if (res.data.status === "success") {
      set({ cartListData: res.data.data });
    }
  },

  // POST /SaveCartList
  CreateCartRequest: async () => {
    set({ isFormSubmit: true });
    const res = await axios.post(
      `${BasUrl}/api/v1/SaveCartList`,
      get().CartFormData,
      get().authCfg()
    );

    //  const res = await axios.post(
    //   `/api/v1/SaveCartList`,
    //   get().CartFormData,
    //   get().authCfg()
    // );

    set({ isFormSubmit: false });
 
     return res.data['status'] === 'Success' ;
  },

  // POST /UpdateCartList/:cartID
  CartUpdateCartListRequest: async (cartID) => {
    set({ isFormSubmit: true });
    const res = await axios.post(
      `${BasUrl}/api/v1/UpdateCartList/${cartID}`,
      get().CartFormDataUpdate,
      get().authCfg()
    );

    //   const res = await axios.post(
    //   `/api/v1/UpdateCartList/${cartID}`,
    //   get().CartFormDataUpdate,
    //   get().authCfg()
    // );
    set({ isFormSubmit: false });
    return res.data.status === "success";
  },

  // POST /RemoveCartList   (service deletes by body + userId)
  CartRemoveCartListRequest: async (cartID) => {
    set({ isFormSubmit: true });
    const res = await axios.post(
      `${BasUrl}/api/v1/RemoveCartList`,
      { _id: cartID },
      get().authCfg()
    );
   
    // const res = await axios.post(
    //   `/api/v1/RemoveCartList`,
    //   { _id: cartID },
    //   get().authCfg()
    // );
    console.log("Cart Remove Response:", res.data);
    set({ isFormSubmit: false });
    return res.data.status === "success";
    
  },
}));

export default CartStore;
