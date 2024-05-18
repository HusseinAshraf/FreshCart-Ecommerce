import React, { useContext, useState } from "react";
import Style from "./UpdateYourPassword.module.css";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ColorRing } from "react-loader-spinner";
import { Helmet } from "react-helmet";

export default function UpdateYourPassword() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  let { UpdatePassword } = useContext(UserContext);

  async function UpdatePasswordSubmit(values) {
    setLoading(true);
    let { data } = await UpdatePassword(values);
    if (data.message == "success") {
      setLoading(false);
      toast.success(data?.message);
      navigate("/login");
    }
  }

  let validationSchema = Yup.object({
    currentPassword: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][\w @]{5,10}$/, "Invalid ex (Ahmed@123)"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][\w @]{5,10}$/, "Password Is Required"),
    rePassword: Yup.string()
      .required("Re password is required")
      .oneOf([Yup.ref("password")], `Re password and Password don't match`),
  });

  let formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: UpdatePasswordSubmit,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Update Password</title>
      </Helmet>
      <div className="my-5 w-75 mx-auto bg-body-tertiary shadow-lg bg-asset p-5">
        <h2>Register Now</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="currentPassword">Current Password :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            id="currentPassword"
            name="currentPassword"
            className="form-control mb-3"
          />

          {formik.errors.currentPassword && formik.touched.currentPassword ? (
            <div className="alert alert-danger py-2">
              {formik.errors.password}
            </div>
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

          <label htmlFor="rePassword">Re Password :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            id="rePassword"
            name="rePassword"
            className="form-control mb-3"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger py-2">
              {formik.errors.rePassword}
            </div>
          ) : null}

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
              Update Now
            </button>
          )}
        </form>
      </div>
    </>
  );
}
