import React, { useEffect, useState } from "react";
import Style from "./SubCategory.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import Loading from '../Loading/Loading';




export default function SubCategory() {
  const [SubCategories, setSubCategories] = useState();
  const [loading, setLoading] = useState(true);

  let { id } = useParams();

  async function subCategory(id) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );

    setSubCategories(data.data);
    setLoading(false);
  }
  useEffect(() => {
    subCategory(id);
    getSpecificCategory(id);
  });

  let [specificCategory, setSpecificCategory] = useState([]);

  async function getSpecificCategory(id) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`
    );
    setSpecificCategory(data.data);
  }

  return (
    <>
      {loading ? (
        <Loading/>
      ) : (
        <div className="mx-auto bg-main-light p-4 rounded shadow m-5 ">
          <div className="row align-items-center g-4">
            <div className="col-md-4">
              <div>
                <img
                  src={specificCategory?.image}
                  alt={specificCategory.title}
                  className="w-100 rounded"
                />
              </div>
            </div>
            <div className="col-md-8">
              <div>
                <h2 className="text-main fw-bold ">
                  {specificCategory?.name}
                </h2>
                <h2 className="pt-3 pb-3">Sub Categories :</h2>
                {SubCategories.map((category, index) => (
                  
                     <span className="  badge bg-secondary m-2" key={index}>
                    {category.name} 
                  </span>
                   
                ))}
              </div> 
            </div>
          </div>
        </div>
      )}
    </>
  );
}
