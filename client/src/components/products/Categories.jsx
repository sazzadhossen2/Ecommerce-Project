
import { Link } from 'react-router-dom'
import ProductStore from '../../store/ProductStore'

function Categories() {
  const {CategoryList} =ProductStore();
  
  console.log("CategoryList", CategoryList);
  return (
     <div className="section">
 <div className="container">
 <div className="row">
 <h1 className="headline-4 text-center my-2 p-0">Top Categories</h1>
<span className="bodySmal mb-5 text-center">Explore a World of Choices Across Our Most Popular <br 
/>Shopping Categories </span>

{
  CategoryList?.map((category)=>(
     <div key={category?._id} className="col-6 col-lg-8r text-center col-md-8r p-2">
 <Link to="" className="card h-100 rounded-3 bg-light">
 <div className="card-body">
 <img alt="" className="w-75" src={category.categoryImg} />
 <p className="bodySmal mt-3">{category.categoryName}</p>
 </div>
 </Link>
 </div>
  ))
}
 </div>
 </div>
 </div>
  )
}

export default Categories