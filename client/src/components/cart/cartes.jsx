// src/components/cart/CartesDetails.jsx
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CartStore from "../../store/CartStore";

export default function CartesDetails() {
  const navigate = useNavigate();

  const {
    isFormSubmit,
    cartListData,
    CartListRequest,
    CartRemoveCartListRequest,
    CartUpdateCartListRequest,
    // this should update CartFormDataUpdate.qty inside the store
    setCartQty,
  } = CartStore();

  // 1) Load cart on mount
  useEffect(() => {
    (async () => {
      await CartListRequest();
    })();
  }, [CartListRequest]);

  // 2) Money math (unit price respects discount)
  const { total, vat, payable } = useMemo(() => {
    if (!Array.isArray(cartListData)) return { total: 0, vat: 0, payable: 0 };

    const t = cartListData.reduce((sum, item) => {
      const unit = Number(
        item?.product?.discount ? item?.product?.discountPrice : item?.product?.price
      ) || 0;
      const q = Number(item?.qty) || 0;
      return sum + unit * q;
    }, 0);

    const v = +(t * 0.05).toFixed(2);
    return { total: +t.toFixed(2), vat: v, payable: +(t + v).toFixed(2) };
  }, [cartListData]);

  // 3) Remove line
  const remove = async (cartId) => {
    const ok = await CartRemoveCartListRequest(cartId); // pass id only
    if (ok) {
      toast.success("Removed from cart");
      await CartListRequest();
    } else {
      toast.error("Failed to remove item");
    }
  };

  // 4) Change qty (+/-)
  const changeQty = async (item, delta) => {
    const next = Math.max(1, (Number(item.qty) || 1) + delta);
    setCartQty(next); // primes CartFormDataUpdate.qty in store
    const ok = await CartUpdateCartListRequest(item._id);
    if (ok) {
      await CartListRequest();
    } else {
      toast.error("Failed to update quantity");
    }
  };

  // 5) Go to payment
  const onCheckout = () => {
    if (!payable) return toast.error("Your cart is empty");
    navigate("/payment");
  };

  // Loading / empty states
  if (!cartListData) {
    return (
      <div className="container mt-3">
        <div className="card p-4 text-center">Loading cart…</div>
      </div>
    );
  }
  if (!cartListData.length) {
    return (
      <div className="container mt-3">
        <div className="card p-5 text-center">
          <h6 className="mb-0">Your cart is empty</h6>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-12">
          <div className="card p-4">

            {/* Lines */}
            <ul className="list-group list-group-flush">
              {cartListData.map((item) => {
                const unit = Number(
                  item?.product?.discount ? item?.product?.discountPrice : item?.product?.price
                ) || 0;
                const qty = Number(item?.qty) || 0;
                const lineTotal = +(unit * qty).toFixed(2);

                return (
                  <li
                    key={item._id}
                    className="list-group-item d-flex justify-content-between align-items-start"
                  >
                    <div className="d-flex align-items-start">
                      <img
                        className="rounded-1 me-3"
                        width="90"
                        height="90"
                        src={item?.product?.image}
                        alt={item?.product?.title}
                        style={{ objectFit: "cover" }}
                      />
                      <div className="me-auto">
                        <p className="fw-semibold m-0">{item?.product?.title || "-"}</p>
                        <p className="text-muted my-1">
                          Unit Price: ${unit}, Qty: {qty}, Size: {item?.size || "-"}, Color:{" "}
                          {item?.color || "-"}
                        </p>
                        <p className="h6 fw-bold m-0 text-dark">Total ${lineTotal}</p>

                        {/* Qty stepper */}
                        <div className="input-group input-group-sm mt-2" style={{ maxWidth: 160 }}>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => changeQty(item, -1)}
                            disabled={isFormSubmit}
                          >
                            –
                          </button>
                          <input
                            type="text"
                            className="form-control bg-light text-center"
                            readOnly
                            value={qty}
                          />
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => changeQty(item, +1)}
                            disabled={isFormSubmit}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => remove(item._id)}
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

            {/* Totals */}
            <div className="my-4">
              <ul className="list-group bg-transparent list-group-flush">
                <li className="list-group-item bg-transparent h6 m-0 text-dark">
                  <span className="float-end">Total: ${total}</span>
                </li>
                <li className="list-group-item bg-transparent h6 m-0 text-dark">
                  <span className="float-end">Vat(5%): ${vat}</span>
                </li>
                <li className="list-group-item bg-transparent h6 m-0 text-dark">
                  <span className="float-end">Payable: ${payable}</span>
                </li>
                <li className="list-group-item bg-transparent">
                  <span className="float-end">
                    <button
                      className="btn px-5 mt-2 btn-success"
                      onClick={onCheckout}
                      disabled={isFormSubmit || payable === 0}
                    >
                      Check Out
                    </button>
                  </span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
