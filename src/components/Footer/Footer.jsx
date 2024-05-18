import React from "react";
import Style from "./Footer.module.css";
import amazon from "../../Assets/images/Amazon_Pay-Logo.wine.svg";
import express from "../../Assets/images/675747.webp";
import master from "../../Assets/images/MasterCard-Logo-1990.png";
import paypal from "../../Assets/images/pa4344888-paypal-logo-40-free-paypal-amp-please-donate-images.png";
import appStore from "../../Assets/images/Download_on_the_App_Store_Badge.svg.png";
import googlePlay from "../../Assets/images/google-play-badge-logo.svg";

export default function Footer() {
  return (
    <>
      <div className="bg-secondary-subtle w-100 mt-4 py-5 px-5">
        <h4>Get the FreshCart app</h4>
        <p className="text-secondary">
          We will send you a link, open it on your phone to download the app
        </p>
        <div className="d-flex">
          <input
            type="email"
            placeholder="Email"
            className="form-control me-3"
          />
          <button
            className="btn bg-main text-white"
            style={{ width: " 170px" }}
          >
            Share App Link
          </button>
        </div>
        <div className="d-flex justify-content-between align-items-center mx-4">
          <div className="d-flex align-items-center py-3 px-1">
            <span className="fw-bold">Payment Partners</span>
            <img
              src={amazon}
              alt="Amazon logo"
              width={60}
              className="ms-2 mt-0"
            />
            <img
              src={express}
              alt="American Express logo"
              width={60}
              className="ms-2 mt-0"
            />
            <img
              src={master}
              alt="Master card logo"
              width={60}
              className="ms-2 mt-0"
            />
            <img
              src={paypal}
              alt="PayPal logo"
              width={60}
              className="ms-2 mt-0"
            />
          </div>
          <div className="d-flex align-items-center ms-2 flex-wrap ">
            <span className="fw-bold">Get deliveries with FreshCart</span>
            <img
              src={appStore}
              alt="App store logo"
              width={80}
              className="ms-2"
            />
            <img
              src={googlePlay}
              alt="Google play logo"
              width={80}
              className="ms-2"
            />
          </div>
        </div>

        <div >
          <ul className="text-center fw-bold ">
            <li className="nav-item d-flex align-items-center justify-content-center">
               <i className="fab fa-facebook mx-2"></i>
                <i className="fab fa-instagram mx-2"></i>
                <i className="fab fa-twitter mx-2"></i>
                <i className="fab fa-tiktok mx-2"></i>
                <i className="fab fa-youtube mx-2"></i>
            </li>
          </ul>
        </div>

        <div className="text=center">
          <p className="text-center mt-3 mb-0">
            <span className="fw-bold me-2">Created by</span>
          Hussein Ashraf Hussein © 2024
          </p>
        </div>
      </div>
    </>
  );
}
