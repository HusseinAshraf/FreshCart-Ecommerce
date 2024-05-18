import React, { useContext, useState } from 'react'
import Style from "./ForgetPassword.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
 let navigate =  useNavigate();


  async function sendCode(values) {
    setLoading(true);

    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords `, values).catch((err) => {
        setApiError(err.response.data.message);

        setLoading(false);
      });
      if (data.statusMsg === 'success') {
        
        setLoading(false);
        navigate('/verifyCode')
  
      }
        
      console.log(data.statusMsg);
    
    
  }

  let validationSchema = Yup.object({

    email: Yup.string().required("Email is Required").email("Invalid email"),

  });

  let formik = useFormik({
    initialValues: {
      email: "",
  
    },
    validationSchema,
    onSubmit: sendCode,
  });
  return (
    <>
      <div className="my-5 w-75 mx-auto bg-body-tertiary shadow-lg bg-asset p-5">
        <h2 className='text-center'>Forget Password</h2>
        <form onSubmit={formik.handleSubmit}>
          {apiError ? (
            <div className="alert alert-danger">{apiError}</div>
          ) : ''}

          <label htmlFor="email">Email :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            id="email"
            name="email"
            className="form-control mb-3"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger py-2">{formik.errors.email}</div>
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
              Send Code
            </button>
          )}
          </div>
            
            

          
        </form>
      </div>
    </>
  );
}