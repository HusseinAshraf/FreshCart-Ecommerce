import React from 'react'
import Style from "./MainSlider.module.css";
import slide1 from '../../Assets/images/num1.jpg';
import slide2 from '../../Assets/images/beautiful-young-family-with-child.jpg';
import slide3 from '../../Assets/images/close-up-woman-carrying-shopping-bags.jpg';
import img1 from '../../Assets/images/slider-image-3.jpeg';
import img2 from '../../Assets/images/slider-image-1.jpeg';
import Slider from 'react-slick';



export default function MainSlider() {

  var settings = {
    dots: false,
    autoplay : true ,
    autoplaySpeed : 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
  return <>
      <div className="row my-3 gx-0" >
        <div className="col-md-8 ">
            <Slider {...settings}>
              <img src={slide1} alt="Slide1" className='w-100' height={400} />
              <img src={slide2} alt="Slide2" className='w-100' height={400}/>
              <img src={slide3} alt="Slide3" className='w-100' height={400}/>
              
            </Slider>     
        </div>
        <div className="col-md-4">
          <div className="images">
            <img src={img1} alt="img1" className='w-100' height={200} />
            <img src={img2} alt="img2" className='w-100'  height={200}/>
          </div>
        </div>
      </div>
      


      </>
}
