import { useEffect } from "react";
import Layout from "../components/layout/Layout";
import Brands from "../components/products/Brands";
import Categories from "../components/products/Categories";
import Features from "../components/products/Features";
import Products from "../components/products/Products";
import Slider from "../components/products/Slider";
import ProductStore from "../store/ProductStore";

function HomePage() {

  const {
BrandListRequest,
CategoryListRequest,
SliderListRequest,
ListByRemarkRequest,

  } =ProductStore();

  useEffect(()=>{
    (async()=>{
      await BrandListRequest();
      await CategoryListRequest();
      await SliderListRequest();
      await ListByRemarkRequest('new');
    })();
  },[]);


  return <Layout>

 <Slider/>
  <Products/>
 <Features/>
 <Categories/>
 <Brands/>
 
  </Layout>
}

export default HomePage

// 0.55