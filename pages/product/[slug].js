import React, { useState, useEffect } from 'react'
import Header from '../../components/header/Header'

import axios from 'axios'
import { Empty } from 'antd';

import LatestProducts from '../../components/Home/LatestProducts';
import { NextSeo } from 'next-seo';
import ProductInfo from '../../components/product-details/producrDetails';
import SideInfo from '../../components/product-details/SideInfo';



function ProductDeatils({ product, campDiscount }) {

    const [relatedProducts, setRelatedProducts] = useState([])

    useEffect(() => {
        if (!product?.categories) return
        let data = { _id: product._id }
        // if (product.tags?.length > 0) {
        //     data["tags"] = product.tags
        // }

        let cat2 = product.categories.filter(cat => cat.level === 2)[0]
        let cat1 = product.categories.filter(cat => cat.level === 1)[0]

        if (cat2) {
            data["category"] = cat2?.category
        } else {
            data["category"] = cat1?.category
        }


        //console.log(data);

        if (data.category) {
            axios.post('/product/getrealated', data)
                .then(res => {
                    setRelatedProducts(res.data.products);
                })
        }
    }, [product])




    return (
        <>
            <Header />
            <div id="product_details">
                {
                    product && <NextSeo
                        title={product.name}
                        description="This is react js ecommerce website"
                        canonical="https://dcel.xyz/"
                        openGraph={{
                            url: 'https://dcel.xyz/',
                            title: product.name,
                            description: 'This is react js ecommerce website',
                            images: [
                                {
                                    url: product.thumbnail,
                                    width: 800,
                                    height: 600,
                                    alt: 'Og Image Alt',
                                },
                            ],
                            site_name: 'Dcel',
                        }}
                        twitter={{
                            handle: '@handle',
                            site: '@site',
                            cardType: 'summary_large_image',
                        }}
                    />
                }

                <div className="main_container">
                    <div className="row mt-3">

                        {
                            product ? <ProductInfo product={product} campDiscount={campDiscount} /> :
                                <div className="col-md-9 col-sm-12 mt-5">
                                    <Empty description={"No product found"} />
                                </div>
                        }

                        <div className="col-md-3 col-sm-12 right_side">
                            <SideInfo />
                        </div>
                        <div className="row  p-0">
                            <div className="col-12 my-5">
                                <LatestProducts title="Related products" array={relatedProducts} hidetitle={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

ProductDeatils.getInitialProps = async (ctx) => {
    //console.log(ctx.query);
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/details/${ctx.query.slug}?campaign=${ctx.query.campaign}`)
        //console.log(res.data.campDiscount);
        //console.log( res.data.product);
        return {
            product: res.data.product,
            campDiscount: res.data.campDiscount && res.data.campDiscount != null ? res.data.campDiscount : null// will be passed to the page component as props
        }
    } catch (error) {
        //console.log(error);
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
}

export default ProductDeatils
