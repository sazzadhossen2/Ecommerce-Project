
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductStore from "../../store/ProductStore";
import CartStore from "../../store/CartStore.js";
import UserStore from "../../store/UserStore.js";
import toast from "react-hot-toast";
import WishListStore from "../../store/WishStore.js";
export default function ProductDetails() {
  const navigate = useNavigate();
  const { ProductDetails } = ProductStore();
  const {isLogin}=UserStore();
  const {
    CartFormChange,
    CreateCartRequest,
  } = CartStore();

  const {
    WishFormChange,
    SaveWishListRequest
  }=WishListStore();

  const p = useMemo(() => {
    if (!ProductDetails) return null;
    if (Array.isArray(ProductDetails)) return ProductDetails[0] || null;
    if (Array.isArray(ProductDetails?.data)) return ProductDetails.data[0] || null;
    return ProductDetails;
  }, [ProductDetails]);

  const images = useMemo(() => {
    if (!p) return [];
    const arr = [
      p.details?.img1, p.details?.img2, p.details?.img3, p.details?.img4,
      p.details?.img5, p.details?.img6, p.details?.img7, p.details?.img8,
    ].filter(Boolean);
    return arr.length ? arr : [p.image].filter(Boolean);
  }, [p]);

  const sizes  = p?.details?.size  ? p.details.size.split(",").map(s => s.trim())   : [];
  const colors = p?.details?.color ? p.details.color.split(",").map(c => c.trim())  : [];

  const price       = Number(p?.price || 0);
  const discountOn  = !!p?.discount;
  const discountVal = Number(p?.discountPrice || price);

  const [active, setActive] = useState(0);
  const [qty, setQty]       = useState(1);
  const [size, setSize]     = useState("");
  const [color, setColor]   = useState("");

  if (!p) return <div className="container mt-4">No product data.</div>;
 const requireLogin = () => {
    if (!isLogin()) {
      toast.error("Please login first");
      navigate("/login", { replace: true });
      return true;
    }
    return false;
  };





   const onAddToCart = async () => {
    if (requireLogin()) return;

    if (sizes.length && !size)  return toast.error("Please select a size");
    if (colors.length && !color) return toast.error("Please select a color");

    // prepare request body in CartStore
    CartFormChange("productID", p._id);
    CartFormChange("qty", String(qty));
    CartFormChange("size", size);
    CartFormChange("color", color);

    const ok = await CreateCartRequest(); 
    if (!ok) {
      toast.success("Added to cart");
      navigate("/cart");
    } else {
      toast.error("Failed to add to cart");
    }
  };



    const onAddToWish = async () => {
    if (requireLogin()) return;
 WishFormChange("productID", p._id);
    

  const ok = await SaveWishListRequest(); 
    if (ok) {
      toast.success("Added to cart");
      navigate("/wishList");
    } else {
      toast.error("Failed to add to cart");
    }
  };
console.log(images);

  return (
    <div className="container mt-2">
      <div className="row">
        {/* left images */}
        <div className="col-md-7 p-3">
          <div className="card p-2">
            <div className="position-relative">
              <img
                src={images[active]}
                alt={p.title}
                className="img-fluid w-100 rounded"
                style={{ aspectRatio: "16/9", objectFit: "cover" }}
              />
              
              {images.length > 1 && (
                <>
                  <button
                    className="btn btn-light position-absolute"
                    style={{ top: "45%", left: 10 }}
                    onClick={() => setActive((i) => (i - 1 + images.length) % images.length)}
                  >
                    ‹
                  </button>
                  <button
                    className="btn btn-light position-absolute"
                    style={{ top: "45%", right: 10 }}
                    onClick={() => setActive((i) => (i + 1) % images.length)}
                  >
                    ›
                  </button>
                </>
              )}
            </div>
            <div className="d-flex gap-2 mt-2 overflow-auto">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="p-0 border-0 bg-transparent"
                  style={{ outline: i === active ? "2px solid #198754" : "none", borderRadius: 6 }}
                >
                  <img
                    src={src}
                    alt={`thumb-${i}`}
                    style={{ width: 140, height: 100, objectFit: "cover", borderRadius: 6 }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* right info */}
        <div className="col-md-5 p-3">
          <h4>{p.title}</h4>
          <p className="text-muted bodySmal my-1">Category: {p.category?.categoryName || "-"}</p>
          <p className="text-muted bodySmal my-1">Brand: {p.brand?.brandName || "-"}</p>
          <p className="bodySmal mb-2 mt-1">{p.shortDes}</p>

          <div className="fs-5 mb-3">
            {discountOn && <span className="text-secondary me-2"><s>${price.toFixed(2)}</s></span>}
            <span className="fw-semibold">${(discountOn ? discountVal : price).toFixed(2)}</span>
          </div>

          <div className="row">
            <div className="col-4 p-2">
              <label className="bodySmal">Size</label>
              <select className="form-select my-2" value={size} onChange={(e)=>setSize(e.target.value)} disabled={!sizes.length}>
                <option value="">{sizes.length ? "Size" : "N/A"}</option>
                {sizes.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="col-4 p-2">
              <label className="bodySmal">Color</label>
              <select className="form-select my-2" value={color} onChange={(e)=>setColor(e.target.value)} disabled={!colors.length}>
                <option value="">{colors.length ? "Color" : "N/A"}</option>
                {colors.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-4 p-2">
              <label className="bodySmal">Quantity</label>
              <div className="input-group my-2">
                <button className="btn btn-outline-secondary" onClick={() => setQty((q)=>Math.max(1,q-1))}>-</button>
                <input readOnly value={qty} className="form-control bg-light text-center" />
                <button className="btn btn-outline-secondary" onClick={() => setQty((q)=>Math.min(99,q+1))}>+</button>
              </div>
            </div>

            <div className="col-6 p-2">
              <button className="btn w-100 btn-success" onClick={onAddToCart}>
                Add to Cart
              </button>
            </div>
            <div className="col-6 p-2">
              <button className="btn w-100 btn-outline-success" onClick={onAddToWish}>Add to Wish</button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="row mt-3">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#spec">
              Specifications
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#review">
              Review
            </button>
          </li>
        </ul>
        <div className="tab-content">
          <div id="spec" className="tab-pane fade show active p-3" dangerouslySetInnerHTML={{ __html: p.details?.des || "" }} />
          <div id="review" className="tab-pane fade p-3">No reviews yet.</div>
        </div>
      </div>
    </div>
  );
}
