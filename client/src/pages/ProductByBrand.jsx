import React, { useEffect } from 'react'
import Layout from '../components/layout/Layout'
import ProductList from '../components/products/ProductList'
import ProductStore from '../store/ProductStore';
import { useParams } from 'react-router-dom';

function ProductByBrand() {

   const{ListByBrandRequest} =ProductStore();
   const {id} =useParams();
console.log(id);
   useEffect(()=>{
    (async()=>{
await ListByBrandRequest(id); 
    })();
   },[ListByBrandRequest, id])
  return <Layout>

    <ProductList/>
  </Layout>
}

export default ProductByBrand