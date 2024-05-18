import React from 'react'
import Style from "./NotFound.module.css";
import error from '../../Assets/images/error.svg'

export default function NotFound() {
  return <>
       
       <div className="text-center my-5" style={{ paddingTop: "74.49px" }}>
        <img src={error} alt="error" />
      </div>
    
       </>
}
