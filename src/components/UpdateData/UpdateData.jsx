import React, { useContext, useState } from "react";
import Style from "./UpdateData.module.css";
import { UserContext } from "../../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ColorRing } from "react-loader-spinner";
import axios from "axios";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

export default function UpdateData() {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  function changeLoggedData(values) {
    setLoading(true);
    axios
      .put(`https://ecommerce.routemisr.com/api/v1/users/updateMe/`, values, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then(({ data }) => {
        if (data.message === "success") {
          setLoading(false);
          localStorage.setItem("name", data.user.name);
          localStorage.setItem("email", data.user.email);
          toast.success("Update Information successfully");
          navigate("/profile");
        }
      })
      .catch((err) => {
        setErrorMsg(err.response.data.message);
        setLoading(false);
        toast.error("email already exist");
      });
  }

  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is Required")
      .min(3, "min length is 3")
      .max(20, "max length is 20"),
    email: Yup.string().required("Email is Required").email("Invalid email"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "We need Egyptian number"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      changeLoggedData(values);
    },
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Update Data</title>
      </Helmet>

      <div className="my-5 w-75 mx-auto bg-body-tertiary shadow-lg bg-asset p-5">
        <h2>Update Data</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            id="name"
            name="name"
            className="form-control mb-3"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger py-2">{formik.errors.name}</div>
          ) : null}
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

          <label htmlFor="phone">Phone :</label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="tel"
            id="phone"
            name="phone"
            className="form-control mb-3"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger py-2">{formik.errors.phone}</div>
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
              Update Data
            </button>
          )}
        </form>
      </div>
    </>
  );
}
