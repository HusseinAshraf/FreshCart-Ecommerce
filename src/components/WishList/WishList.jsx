import React, { useContext, useEffect, useState } from "react";
import Style from "./WishList.module.css";

import { ColorRing } from "react-loader-spinner";
import { WishlistContext } from "../../Context/WishListContext";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import wishListError from "../../Assets/images/wish-list.png";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function WishList() {
  let {
    getWishListItems,
    deleteWishListItems,
    setWishListCount,
    setLikedProducts,
    likedProducts,
  } = useContext(WishlistContext);
  let { addToCart , setCounter } = useContext(CartContext);

  const [wishList, setWishList] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getWishList() {
    let { data } = await getWishListItems();
    setWishList(data);
    setLoading(false);
    setWishListCount(data?.data?.length);
  }
  async function deleteWishList(id) {
    setLoading(true);
    let { data } = await deleteWishListItems(id);
    if (data.status == "success") {
      getWishList(data);
      setLoading(false);
      toast.error('Product removed successfully from wishlist');
      updateWishlistState(data.data);
    }
  }

  async function postToCart(id) {
    let { data } = await addToCart(id);
    if (data.status == "success") {
      toast.success(data.message);
      setCounter(data.numOfCartItems);
      deleteWishList(id)
    }
  }
  function updateWishlistState(wishlistData) {
    setWishListCount(wishlistData.length);
    setLikedProducts(wishlistData);
    localStorage.setItem("wishlist", JSON.stringify(wishlistData));
  }

  useEffect(() => {
    getWishList();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Wish List</title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : wishList && wishList.data.length > 0 ? (
        <>
          <div className="bg-main-light p-5 mt-5">
            <h2>My wish List :</h2>
            {wishList?.data.map((product, index) => (
              <div
                className=" row p-2 m-0 border-1 border-bottom align-items-center"
                key={index}
              >
                <div className="col-md-2">
                  <div className="image">
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="w-100"
                    />
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="count">
                      <h3 className="h5 fw-bold">
                        {product.title.split(" ").splice(0, 3).join(" ")}
                      </h3>
                      <p className="text-main">{product.price}EGP</p>
                      <button
                        className="btn bg-main text-white"
                        onClick={() => deleteWishList(product.id)}
                      >
                        <i className="fas fa-trash text-white"></i> Remove
                      </button>
                    </div>
                    <div className="add">
                      <button
                        onClick={() => postToCart(product.id)}
                        className="btn bg-main text-white"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="row">
          <div className="d-flex flex-column justify-content-center align-items-center mt-5 mb-5">
            <img src={wishListError} alt="empty cart" className="w-25 " />

            <h4 className="text-main fw-bold pb-2">Your Wishlist Await</h4>
            <p className="text-secondary text-center pb-2">
              Explore more and shortlist some items
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
