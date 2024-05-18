import React from 'react'
import Style from "./Loading.module.css";
import { ColorRing } from 'react-loader-spinner';

export default function Loading() {
  return <>
     <div className="row justify-content-center align-items-center vh-100 ">
          <ColorRing
            visible={true}
            height="100"
            width="100"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
    
       </>
}
