import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { WishlistContext } from "../../Context/WishListContext";
import Loading from "../Loading/Loading";

export default function FeaturedProducts() {
  let [btnLoading, setBtnLoading] = useState(false);
  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { data, isLoading } = useQuery("featuredProducts", getProducts);

  let { addToCart, setCounter } = useContext(CartContext);
  let {
    addToWishlist,
    setWishListCount,
    deleteWishListItems,
    likedProducts,
    setLikedProducts,
  } = useContext(WishlistContext);

  async function postToCart(id) {
    setBtnLoading(true);
    let { data } = await addToCart(id);
    if (data.status == "success") {
      toast.success(data.message);
      setCounter(data.numOfCartItems);
      setBtnLoading(false);
    }
  }

  async function postToWishlist(id) {
    let { data } = await addToWishlist(id);

    if (data?.status == "success") {
      toast.success(data.message);
      updateWishlistState(data.data);
      setWishListCount(data?.data?.length);
      setLikedProducts(data.data);
    }
  }

  async function deleteToWishlist(id) {
    let { data } = await deleteWishListItems(id);

    if (data?.status == "success") {
      toast.error('Product removed successfully from wishlist');
      updateWishlistState(data.data);
      setWishListCount(data?.data?.length);
      setLikedProducts(data.data);
    }
  }
  // A function to update wishlist state and local storage
  function updateWishlistState(wishlistData) {
    setWishListCount(wishlistData.length);
    setLikedProducts(wishlistData);
    localStorage.setItem("wishlist", JSON.stringify(wishlistData));
  }
  // UseEffect to initialize wishlist state from local storage
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist"));
    if (storedWishlist) {
      setWishListCount(storedWishlist.length);
      setLikedProducts(storedWishlist);
    }
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="row gy-4 mt-3">
          {data?.data.data.map((product, index) => (
            <div className="col-lg-2 p-2 " key={index}>
              <div className="product p-2">
                {likedProducts.includes(product?.id) ? (
                  <i
                    className=" fa-solid fa-heart text-danger  "
                    onClick={() => deleteToWishlist(product.id)}
                    role="button"
                  ></i>
                ) : (
                  <i
                    className=" fa-regular fa-heart "
                    onClick={() => postToWishlist(product.id)}
                    role="button"
                  ></i>
                )}

                <Link to={`/productDetails/${product.id}`}>
                  <img
                    src={product.imageCover}
                    className="w-100"
                    alt={product.title}
                  />
                  <span className="font-sm text-main">
                    {product.category.name}
                  </span>
                  <h3 className="h5 mt-3">
                    {product.title.split(" ").splice(0, 2).join(" ")}
                  </h3>
                  <div className="d-flex py-3 align-items-center justify-content-between">
                    <span className="font-sm">{product.price} EGP</span>
                    <span className="font-sm">
                      <i className="fas fa-star rating-color me-1"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => postToCart(product?.id)}
                  className="btn bg-main text-main-light w-100 btn-sm"
                >
                  {!btnLoading ? "Add To Cart" : "Loading......."}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
