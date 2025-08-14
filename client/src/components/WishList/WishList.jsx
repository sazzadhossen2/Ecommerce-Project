// src/components/wish/WishList.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import WishListStore from "../../store/WishStore";

export default function WishList() {
  const {
    isFormSubmit,
    wishListData,
    WishListRequest,
    WishFormChange,
    RemoveWishListRequest,
  } = WishListStore();

  // Load wishlist on mount
  useEffect(() => {
    (async () => {
      await WishListRequest();
    })();
  }, [WishListRequest]);

  const removeItem = async (productID) => {
    // your API expects { productID } in body
    WishFormChange("productID", productID);
    const ok = await RemoveWishListRequest();
    console.log("Remove item response:", ok);
    if (ok) {
      toast.success("Removed from wishlist");
      await WishListRequest();
    } else {
      toast.error("Failed to remove item");
    }
  };


  if (!wishListData) {
    return (
      <div className="container mt-3">
        <div className="card p-4 text-center">Loading wishlist…</div>
      </div>
    );
  }

  if (!wishListData.length) {
    return (
      <div className="container mt-3">
        <div className="card p-5 text-center">
          <h6 className="mb-0">Your wishlist is empty</h6>
          <Link to="/" className="btn btn-success mt-3">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-12">
          <div className="card p-4">
            <h5 className="mb-3">My Wishlist</h5>
            <ul className="list-group list-group-flush">
              {wishListData.map((item) => {
                const p = item?.Product || {};
                const unit = Number(p?.discount ? p?.discountPrice : p?.price) || 0;

                return (
                  <li
                    key={`${item.userID}-${item.productID}`}
                    className="list-group-item d-flex justify-content-between align-items-start"
                  >
                    <div className="d-flex align-items-start">
                      <img
                        className="rounded-1 me-3"
                        width="90"
                        height="90"
                        src={p?.image}
                        alt={p?.title}
                        style={{ objectFit: "cover" }}
                      />
                      <div className="me-auto">
                        <Link
                          to={`/product-details/${p?._id}`}
                          className="text-decoration-none text-dark"
                        >
                          <p className="fw-semibold m-0">{p?.title || "-"}</p>
                        </Link>
                        <p className="text-muted my-1">
                          Brand: {item?.brand?.brandName || "-"} &nbsp;|&nbsp; Category:{" "}
                          {item?.category?.categoryName || "-"}
                        </p>

                        <div className="d-flex align-items-center gap-2">
                          {p?.discount ? (
                            <>
                              <span className="text-secondary">
                                <s>${Number(p?.price || 0).toFixed(2)}</s>
                              </span>
                              <span className="fw-bold">${unit.toFixed(2)}</span>
                            </>
                          ) : (
                            <span className="fw-bold">${unit.toFixed(2)}</span>
                          )}
                        </div>

                        <div className="mt-2">
                          <Link to={`/product-details/${p?._id}`} className="btn btn-sm btn-success">
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.productID)}
                      className="btn btn-sm btn-outline-danger"
                      disabled={isFormSubmit}
                      title="Remove"
                    >
                      <i className="bi bi-trash" />
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 d-flex justify-content-end">
              <Link to="/" className="btn btn-outline-secondary">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
