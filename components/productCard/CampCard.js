import React,{useState,useEffect} from "react";
import Link from "next/link";

function CampCard({ product ,_id}) {
    const [discount, setDiscount] = useState(null)
    

    useEffect(() => {
        
       if(product && _id){
           let camps = [...product.campaigns]
           let camp = camps.filter(cam=>cam.campaign === _id)[0]
           //console.log(camp);
           setDiscount(camp.discount)
       }
    }, [product,_id])
    return (
        <div className="product_card">
            <div className="product_image">
                {
                    discount?.value > 0 &&
                    <span class="discount-tag-in-percent">
                        - {discount.discountType === 'percent' ? discount.value :
                            Math.floor((discount.value / product.price) * 100)
                        }%
              </span>
                }

                <Link href={`/product/${product?.slug ? product.slug : "sample"}?campaign=${_id}`}>
                    <a>
                        <img
                            src={
                                product?.thumbnail
                                    ? product.thumbnail
                                    : "https://via.placeholder.com/250"
                            }
                            alt=""
                        />
                    </a>
                </Link>
            </div>
            <Link href={`/product/${product?.slug ? product.slug : "sample"}`}>
                <a>
                    <div className="product_info">
                        <div className="rating">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </div>
                        <h5>{product?.name ? product.name : "Product name"}</h5>

                        <div className="product-price">
                            {
                                discount?.value > 0 ?
                                    <>
                                        <span className="old-price">${product.price}</span>
                                        {
                                            discount.discountType === 'flat' ?
                                            <span className="new-price">${product.price-discount.value}</span>:
                                            <span className="new-price">${product.price-Math.floor((product.price*(discount.value/100)))}</span>
                                        }
                                        
                                    </>:
                                    <span className="new-price">${product.price}</span>
                            }


                        </div>


                        {/* <span>$ {product?.price ? product.price : "1200"}</span> */}
                    </div>
                </a>
            </Link>
            {/* <div className="card_footer">
           <span><i className="fas fa-eye"></i></span>
           <span><i className="fas fa-cart-plus"></i></span>
           <span><i className="fas fa-heart"></i></span>
        </div> */}
        </div>
    );
}

export default CampCard;
