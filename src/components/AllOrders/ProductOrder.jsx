import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../Loading/Loading";

export default function ProductOrder() {
  let [orders, setOrders] = useState(null);
  let { getUserOrder } = useContext(CartContext);
  let [loading, setLoading] = useState(false);
  let { index } = useParams();

  let { id } = jwtDecode(localStorage.getItem("userToken"));

  async function orderDetails() {
    setLoading(true);
    let { data } = await getUserOrder(id);
    setOrders(data[index]);
    setLoading(false);
    console.log(data[index]);
  }

  useEffect(() => {
    orderDetails();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : orders ? (
        <>
          <div className="container-fluid py-5">
            <h2>Order Details:</h2>
            <h2>
              Total Price :{" "}
              <span className="text-main">{orders.totalOrderPrice}EGP</span>
            </h2>
            <div className="row mt-4 mb-4 border-bottom border-2">
              <div className="order-des col-md-4">
                <p>ID: #{orders.id}</p>
                <p>
                  Payment Method:{" "}
                  <span className="bg-main text-center text-white py-2 btn">
                    {orders.paymentMethodType}
                  </span>
                  <div className="d-flex mt-2">
                    <p>
                      Is Paid:{" "}
                      {orders.isPaid ? (
                        <span className="text-main">True</span>
                      ) : (
                        <span className="text-danger">False</span>
                      )}
                    </p>
                    <p className="ms-4">
                      Is Delivered:{" "}
                      {orders.isDelivered ? (
                        <span className="text-main">True</span>
                      ) : (
                        <span className="text-danger">False</span>
                      )}
                    </p>
                  </div>
                </p>
              </div>

              <div className="customer-info text-start col-md-4">
                <h3>
                  <i className="fa-solid fa-user "></i> Customer Info
                </h3>
                <p className="mb-1">Name: {orders.user.name}</p>
                <p className="mb-1">Email: {orders.user.email}</p>
                <p className="mb-1">Phone:{orders.user.phone}</p>
              </div>

              <div className="order-info text-start col-md-4">
                <h3>
                  <i className="fa-solid fa-cart-shopping  "></i> Order Info
                </h3>
                <p className="mb-1">Name: {orders.shippingAddress.details}</p>
                <p className="mb-1">Phone: {orders.shippingAddress.phone}</p>
                <p className="mb-1">City:{orders.shippingAddress.city}</p>
              </div>
            </div>

            {orders.cartItems.map((orderProduct, index) => (
              <div
                key={index}
                className="row justify-content-around cart-item align-items-center bg-main-light py-4 mt-4 rounded-3 shadow"
              >
                <div className="col-lg-10 col-md-8 col-6 d-flex align-items-center ">
                  <img
                    src={orderProduct.product.imageCover}
                    alt={orderProduct.product.title}
                    className="cart-img mx-2"
                  />
                  <div className="mx-4">
                    <h3>
                      {orderProduct.product.title
                        .split(" ")
                        .slice(0, 2)
                        .join(" ")}
                    </h3>
                    <p className="text-main">
                      {orderProduct.product.category.name}
                    </p>
                    <h6 className="mt-2">
                      Price:{" "}
                      <span className="text-main">{orderProduct.price}EGP</span>
                    </h6>
                  </div>
                </div>
                <div className="col-lg-2 col-md-4 col-6">
                  <h6 className="fw-bold">
                    Count :{" "}
                    <span className="text-main">{orderProduct.count}</span>
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
