// import React, {  useEffect } from 'react'
// import Layout from '../components/layout/Layout'


// import { useParams } from 'react-router-dom';
// import CartStore from '../store/CartStore';
// import CartesDetails from '../components/cart/cartes';

// function CartePage() {
//   const {CartUpdateCartListRequest}= CartStore();
//   const {id} = useParams();

//   useEffect(()=>{
//     (async()=>{
//       await CartUpdateCartListRequest(id);
//     })();
//   },[CartUpdateCartListRequest, id]);

//   return <Layout>
//     <CartesDetails/>
//   </Layout>
// }

// export default CartePage


// src/pages/CartePage.jsx
import { useEffect } from "react";
import Layout from "../components/layout/Layout";
import CartStore from "../store/CartStore";
import CartesDetails from "../components/cart/cartes";


export default function CartePage() {
  const { CartListRequest } = CartStore();

  useEffect(() => {
    (async () => { await CartListRequest(); })();
  }, [CartListRequest]);

  return (
    <Layout>
      <CartesDetails />
    </Layout>
  );
}
