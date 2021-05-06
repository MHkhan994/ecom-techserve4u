import React, { useState, useEffect } from 'react'
import Slider from "react-slick";
import axios from 'axios'

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 3000,
  autoplaySpeed: 2000,
  arrows:false,
  adaptiveHeight:true,
  

};


function SliderComp() {
  const [sliders, setSliders] = useState([])

  useEffect(() => {
    axios.get("/settings/getsliders")
      .then(res => {
        setSliders(res.data.sliders)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  return (
    <div className="home_slider">
 <Slider {...settings}>
      {
        sliders.length>0 ?
        sliders.map(slide=>(
          <div>

          <img className="slider_img" src={slide.image} alt="" />
        </div>
        )):
        <div>

        <img className="slider_img img-fluid" src="https://via.placeholder.com/908x320" alt="" />
      </div>
      }
     

    </Slider>
    </div>
   
  )
}

export default SliderComp
