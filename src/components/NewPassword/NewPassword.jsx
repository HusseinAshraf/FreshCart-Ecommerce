import React, { useContext, useState } from 'react'
import Style from "./NewPassword.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../Context/UserContext';

export default function NewPassword() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
 let navigate =  useNavigate();
let {setUserToken} = useContext(UserContext);

  async function resetPassword(values) {
    setLoading(true);

    let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values).catch((err) => {
        setApiError(err.response.data.message);

        setLoading(false);
      });

    
      if (data.token) {
        
        setLoading(false);
        localStorage.setItem('userToken' , data.token);
        setUserToken(data.token)
        navigate('/')
      
    
      }
  }

  let validationSchema = Yup.object({

    email: Yup.string().required("Email is Required").email("Invalid email"),
    newPassword: Yup.string()
      .required("New Password is required")
      .matches(/^[A-Z][\w @]{5,10}$/, "Invalid ex (Ahmed@123)"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
  
    },
    validationSchema,
    onSubmit: resetPassword,
  });
  return (
    <>
      <div className="my-5 w-75 mx-auto bg-body-tertiary shadow-lg bg-asset p-5">
        <h2 className='text-center'>Reset your account password</h2>
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

          <label htmlFor="newPassword">New Password :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            id="newPassword"
            name="newPassword"
            className="form-control mb-3"
          />
          {formik.errors.newPassword && formik.touched.newPassword ? (
            <div className="alert alert-danger py-2">
              {formik.errors.newPassword}
            </div>
          ) : null}

         <div className="text-center">
         {loading ? (
            <button type="button" className="btn bg-main text-light  ">
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
              className="btn bg-main text-light "
            >
              Reset Password
            </button>
          )}
         </div>
            
            
            

          
        </form>
      </div>
    </>
  );
}