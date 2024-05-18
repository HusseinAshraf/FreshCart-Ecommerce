import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import Loading from "../Loading/Loading";
import cartEmpty from "../../Assets/images/Shopping_cart_icon.svg.png";

export default function Cart() {
  let {
    getCartItem,
    deleteCartItem,
    updateCartItems,
    deleteAllCart,
    setCounter,
  } = useContext(CartContext);

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartPrice, setCartPrice] = useState([])

  async function getItems() {
    let { data } = await getCartItem();
    setCart(data);
    setCartPrice(data?.data?.totalCartPrice)
    setLoading(false)
   
  }

  async function deleteItem(id) {
    setLoading(true);
    let { data } = await deleteCartItem(id);
    if (data.status == "success") {
      setCart(data);
      setCounter(data.numOfCartItems);
      setCartPrice(data.data.totalCartPrice)
      setLoading(false);
      toast.error('Product removed successfully from cart');
    }
  }
  async function deleteAll() {
    setLoading(true);
    let { data } = await deleteAllCart();
    setCart(data);
    setCounter(data.numOfCartItems);
    setLoading(false);
    toast.error('delete all cart success');
  }
  async function updateCart(id, count) {
    if (count < 1) {
      setLoading(true);
      let { data } = await deleteCartItem(id);
      setCartPrice(data.data.totalCartPrice)
      setCart(data);
      setLoading(false);
      setCounter(data.numOfCartItems);
    } else {
      setLoading(true);
      let { data } = await updateCartItems(id, count);
      setCartPrice(data.data.totalCartPrice)
      setCart(data);
      setLoading(false);
      toast.success("update product success");
      setCounter(data.numOfCartItems);
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
      </Helmet>
      {loading ? (
         <Loading/>
      ) : cart && cart.numOfCartItems ? (
        <>
          <div className="bg-main-light p-5 mt-5 ">
            <h2>Shop Cart : </h2>
            <p className="text-main"> Num Of Cart: {cart.numOfCartItems}</p>
            <p className="text-main">
              {" "}
              Total Cart Price : {cart.data.totalCartPrice} EGP
            </p>
            {cart.data.products.map((product, index) => (
              <div
                className="row p-2 m-0 border-1 border-bottom align-items-center"
                key={index}
              >
                <div className="col-md-1">
                  <div className="image">
                    <img
                      src={product.product.imageCover}
                      alt={product.product.title}
                      className="w-100"
                    />
                  </div>
                </div>
                <div className="col-md-11">
                  <div className="cart-item d-flex justify-content-between">
                    <div>
                      <h3 className="h5">
                        {product.product.title.split(" ").slice(0, 3).join(" ")}
                      </h3>
                      <p className="text-main">Price: {product.price}EGB</p>
                      <button
                        onClick={() => deleteItem(product.product.id)}
                        className="btn bg-main text-white"
                      >
                        <i className="fas fa-trash text-white"></i> Remove
                      </button>
                    </div>
                    <div className="count d-flex align-items-center">
                      <button
                        onClick={() =>
                          updateCart(product.product.id, product.count + 1)
                        }
                        className="btn fs-2 border-main py-0"
                      >
                        +
                      </button>
                      <span className="mx-3">{product.count}</span>
                      <button
                        onClick={() =>
                          updateCart(product.product.id, product.count - 1)
                        }
                        className="btn fs-2 border-main py-0"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="d-flex align-items-center justify-content-between">
               <div>
               <Link
                to={`/shippingAddress/${cart.data._id}`}
                className="btn bg-main text-light m-3"
              >
                Payment <i className="fa-solid fa-arrow-right mx-2"></i> {cartPrice}EGP
              </Link>
               </div>
              <button
                onClick={() => deleteAll()}
                className="btn bg-main text-white"
              >
                <i className="fas fa-trash text-white"></i> Remove All
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="row">
          <div className="d-flex flex-column justify-content-center align-items-center mt-5 mb-5">
          
          <img src={cartEmpty} alt="empty cart"  className="w-25 "/>
          
          <h4 className="text-main fw-bold pb-2">Your cart is empty</h4>
          <p className="text-secondary text-center pb-2">
            Looks like you haven't added anything to your cart. <br />
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
