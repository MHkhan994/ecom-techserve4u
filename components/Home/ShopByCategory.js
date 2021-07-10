import React from 'react'
import Link from 'next/link'


function ShopByCategory({ title, data }) {
    return (
        <div className="shop_by_cat">
            <div className="section_heading">
                <h5>{title}</h5>
                <Link href="/categories">
                <a className="primary_btn m-1" >View all</a>
                </Link>
                
            </div>
            <div className="shop_by_content">
                {
                    data && data.slice(0, 11).map((item, index) => {
                        return (
                            <div key={index} className="brand_cat_card">
                                <Link href={`/search?category=${item.slug}`}>
                                    <a>
                                        <img src={item.categoryImage ? item.categoryImage : "https://via.placeholder.com/200"} alt="" />
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

export default ShopByCategory
