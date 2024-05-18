import React, { useState } from "react";
import Style from "./Brands.module.css";
import { useQuery } from "react-query";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import Loading from '../Loading/Loading';


export default function Brands() {
  let { data, isLoading } = useQuery("brands", getBrands);

  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let [detailedBrand, setDetailedBrand] = useState([]);
  async function getDetailedBrand(id) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`
    );
    setDetailedBrand(data.data);
  }

  return (

    <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Brands</title>
      </Helmet>
      {isLoading ? (
       <Loading/>
      ) : (
        <div className="row gy-4 mt-4">
          {data?.data.data.map((brand, index) => (
            <div
              key={index}
              className="col-md-3 mt-5"
              onClick={() => getDetailedBrand(brand._id)}
              role="button"
              data-bs-toggle="modal" data-bs-target="#exampleModal"
            >
              <div className="brands border rounded-2 p-2">
                <img src={brand.image} alt={brand.title} className="w-100" />
                <p className="text-center">{brand.name}</p>
              </div>
            </div>
          ))}

          <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true" >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title fw-bold">{detailedBrand.name}</h4>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <img src={detailedBrand.image}alt={detailedBrand.title}  className="w-100"/>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn text-light bg-main"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
