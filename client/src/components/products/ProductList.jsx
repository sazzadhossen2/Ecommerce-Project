
import ProductStore from '../../store/ProductStore';

function ProductList() {
  const { ListByBrand } = ProductStore();
console.log(ListByBrand);
  return (

    <div className="container mt-4">

      {
        ListByBrand && ListByBrand.length>0?(
          <div className="row">
        {
          ListByBrand?.map((product, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <img 
                  src={product.image || 'https://via.placeholder.com/400x400'} 
                  className="card-img-top" 
                  alt={product.name} 
                  style={{ height: '200px', objectFit: 'cover' }} 
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.shortDes}</p>
                  <p className="card-text"><strong>${product.price}</strong></p>
                  <a href={`/product/${product.id}`} className="btn btn-primary">See Details</a>
                </div>
              </div>
            </div>
          ))
        }
      </div>
        ):(
          <div className="text-center">
            <h2>No Products Found</h2>
            <p>Please check back later or explore other categories.</p>
          </div>
        )
      }
    </div>
  );
}

export default ProductList;
