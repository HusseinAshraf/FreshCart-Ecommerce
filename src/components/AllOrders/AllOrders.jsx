import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Loading from "../Loading/Loading";
import cartEmpty from "../../Assets/images/Shopping_cart_icon.svg.png";

export default function AllOrders() {
  let { getUserOrder } = useContext(CartContext);
  let [orders, setOrders] = useState(null);
  let [loading, setLoading] = useState(false);


  let { id } = jwtDecode(localStorage.getItem("userToken"));

  async function getAllOrders() {
    setLoading(true);
    let { data } = await getUserOrder(id);
    setLoading(false);
    setOrders(data);
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : orders && orders?.length > 0 ? (
        <>
          <div className="container py-5">
              <h2 className="text-center fw-bold ">All <span className="text-main">Orders</span></h2>
            <div className="row mt-5 justify-content-center">
              {orders.map((order, index) => (
                <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-12">
                  <Link to={`/productOrder/${index}`}>
                    <div className="order text-center position-relative p-3 ">
                      <span className="position-absolute top-0 start-50 bg-white px-2 text-main translate-middle-x fw-bolder">
                        {index + 1}
                      </span>
                      <i className="fa-solid fa-box">
                      </i>
                      <h2 className="position-absolute  top-50 start-50 bg-white text-main translate-middle">
                          Order
                        </h2>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        
        <div className="row">
        <div className="d-flex flex-column justify-content-center align-items-center mt-5 mb-5">
        
        <img src={cartEmpty} alt="empty cart"  className="w-25 "/>
        
        <h4 className="text-main fw-bold pb-2">You didn't buy anythings </h4>
        <p className="text-secondary text-center pb-2">
        It looks like you didn't buy anything. <br />
          Go ahead & explore top products
        </p>
        <Link to={"/products"} className="btn bg-main text-light fw-bold ">
          Explore Our Products
        </Link>
      </div>
      </div>
      )}
    </>
  );
}
