import React, { useEffect, useState } from "react";
import Style from "./Profile.module.css";
import { jwtDecode } from "jwt-decode";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";

export default function Profile() {



    const decode = jwtDecode(localStorage.getItem("userToken"));
  

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Profile</title>
      </Helmet>
      <div className="container">
        <div className="row mt-5">
          <div className="shadow p-5">
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-circle-user mt-2 fs-3 me-3 mb-3"></i>
              <h2>Your Info</h2>
            </div>
            <ul className="list-unstyled px-5">
              <li>
                Name: <span className="fw-bold">{localStorage.getItem("name")}</span>
              </li>
              <li>
                Email:{" "}
                <span className="fw-bold">{localStorage.getItem("email")}</span>
              </li>
              <li>
                Role: <span className="fw-bold">{decode?.role}</span>
              </li>
            </ul>

            <div className="mb-5">
              <NavLink
                to="/updateData"
                className="linkItem d-flex align-items-center"
              >
                <i className="fa-solid fa-pen-to-square mt-2 fs-3 me-3"></i>
                <h4 className="m-0">Update Your Data</h4>
              </NavLink>
            </div>
            <div className="mb-5">
              <NavLink
                to="/updateYourPassword"
                className="linkItem d-flex align-items-center"
              >
                <i className="fa-solid fa-wrench mt-2 fs-3 me-3"></i>
              <h4 className="m-0">Update Your PassWord</h4>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
