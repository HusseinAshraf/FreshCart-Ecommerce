import React, { useContext, useState } from 'react'
import Style from "./VerifyCode.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";


export default function VerifyCode() {
  const [loading, setLoading] = useState(false);
 const [apiError, setApiError] = useState(null);
    let navigate =  useNavigate();


  async function VerifyCode(values) {
    setLoading(true);

    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values).catch((err) => {
        setApiError(err.response.data.message);

        setLoading(false);
      });

    if (data.status) {
      setLoading(false);
      navigate('/newPassword');
  
    }
    console.log(data.status);
    
    
      
     
    
  }

  let validationSchema = Yup.object({

    resetCode: Yup.string().matches(/^\d{5,6}$/ , 'Invalid Code').required("Code is Required"),

  });

  let formik = useFormik({
    initialValues: {
      resetCode: "",
  
    },
    validationSchema,
    onSubmit: VerifyCode,
  });
  return (
    <>
      <div className="my-5 w-75 mx-auto bg-body-tertiary shadow-lg bg-asset p-5">
        <h2 className='text-center'>Write the code</h2>
        <form onSubmit={formik.handleSubmit}>
          {apiError ? (
            <div className="alert alert-danger">{apiError}</div>
          ) : ''}

          <label htmlFor="code">Write the code :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            id="code"
            name="resetCode"
            className="form-control mb-3"
          />
          {formik.errors.resetCode && formik.touched.resetCode ? (
            <div className="alert alert-danger py-2">{formik.errors.resetCode}</div>
          ) : null}

          <div className="text-center">
          {loading ? (
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
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-light"
            >
              VerifyCode
            </button>
          )}
          </div>
            
            

          
        </form>
      </div>
    </>
  );
}