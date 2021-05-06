import React from 'react'
import Link from 'next/link'


function ShopByBrand({ title, data }) {
    return (
        <div className="shop_by">
            <div className="section_heading">
                <h5>{title}</h5>
                <Link href="/brands">
                <a className="primary_btn m-1" >View all</a>
                </Link>
                
            </div>
            <div className="shop_by_content">
                {
                    data && data.slice(0, 14).map((item, index) => {
                        return (
                            <div key={index} className="brand_cat_card">
                                <Link href={`/search?brand=${item.slug}`}>
                                    <a>
                                        <img src={item.image ? item.image : "https://via.placeholder.com/200"} alt="" />
                                        <span>{item.name}</span>
                                    </a>
                                </Link>

                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default ShopByBrand
