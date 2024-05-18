import React, { useEffect, useState } from 'react'
import Style from "./Categories.module.css";
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Loading from '../Loading/Loading';

export default function Categories() {
  
  const [categories , setCategories] = useState([]);
  const [loading , setLoading] = useState(true);

  async function getCategories() {

    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    setCategories(data.data);
    setLoading(false)
    
  }

  useEffect(()=>{
    getCategories()
  })


 


  return <>
  
    <Helmet>
                <meta charSet="utf-8" />
                <title>Categories</title>
      </Helmet>
 {loading ? 
           <Loading/>
  :
     
    <div className=' category gy-5 mt-5'>
      {categories.map((category , index)=>
      <div className="row"  key={index}>
        <Link to={`/subCategory/${category._id}`}>
        <div className='category-son position-relative'>
          <img src={category.image} className='w-100' alt={category.slug} />
          <div className='category-son-style position-absolute'>{category.name}</div>
        </div>
        </Link>
        </div>

      )}

    </div>

  
  
  }

    
     </>
}
