import React from 'react'
import Style from "./BtnLoading.module.css";
import { ColorRing } from 'react-loader-spinner';

export default function BtnLoading() {
  return <>
    <button type="button" className="btn bg-main text-light">
              <ColorRing
                visible={true}
                height="30"
                width="30"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            </button>
    
       </>
}
