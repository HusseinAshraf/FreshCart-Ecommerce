import React, { useContext, useEffect, useState } from "react";
import Style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
import {  toast } from 'react-toastify';
import Loading from "../Loading/Loading";

export default function ProductDetails() {

 let {setCounter} = useContext(CartContext);
  var settings = {
    dots: false,
    autoplay : true ,
    autoplaySpeed : 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };

  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  let[btnLoading , setBtnLoading] = useState(false)
  async function getProductDetails() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );

    setDetails(data.data);
    setLoading(false);
  }

  useEffect(() => {
    getProductDetails(id);
  });
  
  let  {addToCart} = useContext(CartContext);

  async function postToCart(id) {
    setBtnLoading(true)
     let {data} = await addToCart(id);
        if (data.status == 'success') {
          setBtnLoading(false)
       toast.success(data.message 
    )
    setCounter(data.numOfCartItems);
   }
}

  return (
    <>
        
      {loading ? (
       <Loading/>
      ) : ( <>
      <Helmet>
                <meta charSet="utf-8" />
                <title>{details.title}</title>
      </Helmet>
        <div className="row align-items-center py-3">
          <div className="col-md-4">
            <Slider {...settings}>
              {details.images.map((image , index) => <img key={index}
              src={image} className="w-100" alt={details.title}
              />)}
            </Slider>
          </div>
          <div className="col-md-8">
            <div className="details">
              <h3 className="h5">{details.title}</h3>
              <p className="py-3 text-main">{details.description}</p>
              <span className="font-sm ">{details.category.name}</span>
              <div className="d-flex py-3 align-items-center justify-content-between">
                <span className="font-sm">{details.price} EGP</span>
                <span className="font-sm">
                  <i className="fas fa-star rating-color me-1"></i>
                  {details.ratingsAverage}
                </span>
              </div>
              <button onClick={() => postToCart(details._id)} className="btn bg-main text-main-light w-100 btn-sm">
              {!btnLoading? 'Add To Cart' : 'Loading.......'}
              </button>
            </div>
          </div>
        </div>
      
      </>

        
        
      )}
    </>
  );
}
