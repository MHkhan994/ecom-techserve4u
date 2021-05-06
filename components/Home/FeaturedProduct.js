import React from 'react'
import Slider from "react-slick";
import ProductCard from '../productCard'
const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    responsive: [
        {
          breakpoint: 1370,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2,
            infinite: true,
          }
        },
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            infinite: true,
          }
        },
        {
          breakpoint: 840,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            arrows:false,
          }
        },
        {
          breakpoint: 560,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            arrows:false,
          }
        },
      ]
    // nextArrow: <div className="next">next</div>,
    // prevArrow: <div className="prev">dgdsfgh</div>

};

function FeaturedProduct({title,products}) {
    return (
        <div className="featured_product">
            <div className="section_heading">
                <h5>{title}</h5>
            </div>
            <div className="section_content">
                <Slider {...settings}>
                    {
                        products.map((product, index) => {
                            return (
                               <ProductCard product={product} key={index} />
                            )
                        })
                    }
                </Slider>
            </div>
        </div>
    )
}

export default FeaturedProduct
