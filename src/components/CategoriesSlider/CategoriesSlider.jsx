import React from 'react'
import Style from "./CategoriesSlider.module.css";
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from 'react-slick';

export default function CategoriesSlider() {
   
  var settings = {
    dots: false,
    autoplay : true ,
    autoplaySpeed : 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows:false
  };
  function  getCategories() {
     return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  let {data} = useQuery('Categories' , getCategories);
  

  return <>

    <div className="row py-3">
    <h2>Shop Popular Categories</h2>
    <Slider {...settings}>
             {data?.data.data.map((category , index)=>
               <div key={index} className='col-md-2'>
                  <div className="img">
                    <img src={category.image} alt={category.name} 
                    className='w-100'
                    height={150}
                    />
                    <p>{category.name}</p>
                  </div>
               </div>

             ) }    
              
                </Slider> 
    </div>
    
       </>
}
