import React, { useContext, useState } from "react";
import Style from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import BtnLoading from "../BtnLoading/BtnLoading";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  let navigate = useNavigate();
  let { setUserToken } = useContext(UserContext);

  async function loginSubmit(values) {
    setLoading(true);

    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin `, values)
      .catch((err) => {
        setApiError(err.response.data.message);

        setLoading(false);
      });

    if (data.message == "success") {
      setLoading(false);
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("email", data.user.email);
      setUserToken(data.token);
      setUserToken(data.user);

      navigate("/");
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().required("Email is Required").email("Invalid email"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][\w @]{5,10}$/, "Invalid ex (Ahmed@123)"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: loginSubmit,
  });
  return (
    <>
      <div className=" my-5 w-75 mx-auto bg-body-tertiary shadow p-5 rounded bg-asset">
        <h2 className="text-capitalize text-center">Login Now</h2>
        <form onSubmit={formik.handleSubmit}>
          {apiError ? <div className="alert alert-danger">{apiError}</div> : ""}

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

          <label htmlFor="password">Password :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            id="password"
            name="password"
            className="form-control mb-3"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger py-2">
              {formik.errors.password}
            </div>
          ) : null}

          {loading ? (
            <BtnLoading />
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-light"
            >
              Login
            </button>
          )}

          <Link to={"/register"} className="ps-2">
            Register Now
          </Link>
          <Link
            to={"/forgetPassword"}
            className={`float-end ${Style.forgetBass}`}
          >
            <i className="fa-solid fa-unlock-keyhole pe-1"></i>
            Forget Password
          </Link>
        </form>
      </div>
    </>
  );
}
