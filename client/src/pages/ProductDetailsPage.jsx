import React, {  useEffect } from 'react'
import Layout from '../components/layout/Layout'
import ProductDetails from '../components/products/ProductDetails'
import ProductStore from '../store/ProductStore';
import { useParams } from 'react-router-dom';

function ProductDetailsPage() {
  const {ProductDetailsRequest}= ProductStore();
  const {id} = useParams();

  useEffect(()=>{
    (async()=>{
      await ProductDetailsRequest(id);
    })();
  },[ProductDetailsRequest, id]);

  return <Layout>
    <ProductDetails/>
  </Layout>
}

export default ProductDetailsPage