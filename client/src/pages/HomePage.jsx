import { useEffect } from "react";
import Layout from "../components/layout/Layout";
import Brands from "../components/products/Brands";
import Categories from "../components/products/Categories";
import Features from "../components/products/Features";
import Products from "../components/products/Products";
import Slider from "../components/products/Slider";
import ProductStore from "../store/ProductStore";
import FeatureStore from "../store/FeatureStore";

function HomePage() {

  const {
BrandListRequest,
CategoryListRequest,
SliderListRequest,
ListByRemarkRequest,



  } =ProductStore();

const {FeatureListRequest}=FeatureStore();
  useEffect(()=>{
    (async()=>{
      await BrandListRequest();
      await CategoryListRequest();
      await SliderListRequest();
      await ListByRemarkRequest('new');
      await FeatureListRequest();
    })();
  },[BrandListRequest, CategoryListRequest, ListByRemarkRequest, SliderListRequest, FeatureListRequest]);


  return <Layout>

 <Slider/>
  <Products/>
 <Categories/>
 <Brands/>
  <Features/>
  </Layout>
}

export default HomePage

