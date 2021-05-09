import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'

function Search() {
    const Router = useRouter()
    const [query, setQuery] = useState("")
    const [searchedProducts, setSearchedProducts] = useState([])

    useEffect(() => {
        if (query === '') {
            return setSearchedProducts([])
        }
        const delayed = setTimeout(() => {
            axios.get(`/product/getsearchproducts?search=${query}`)
                .then(res => {
                    setSearchedProducts(res.data.products);
                    console.log(res.data.products);
                })
        }, 100)
        return () => clearTimeout(delayed)
    }, [query])

    let handleKey = (e) => {

        if (e.keyCode === 13) {
            e.preventDefault()
            Router.push(`/search?query=${query}`)
        }
    }

    return (
        <div className="search_wrapper">
            <input onKeyDown={(e) => handleKey(e)} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="search for..."></input>
            <i onClick={() => Router.push(`/search?query=${query}`)} className="fas fa-search"></i>
            <div className={`search_overlay ${searchedProducts.length == 0 && "d-none"}`}>
                <div className="search_products">
                    {

                        searchedProducts.length > 0 && searchedProducts.map((product, index) => {
                            return (
                                <Link key={index} href={`/product/${product.slug}`}>
                                    <a>
                                        <div className="items">
                                            <img src={product.thumbnail}></img>
                                            <h5>{product.name}</h5>
                                            <div className="product-price">
                                                {
                                                    product?.discount?.value > 0 ?
                                                        <>
                                                            <span className="old-price">${product.price}</span>
                                                            {
                                                                product.discount.discountType === 'flat' ?
                                                                    <span className="new-price">${product.price - product.discount.value}</span> :
                                                                    <span className="new-price">${product.price - Math.floor((product.price * (product.discount.value / 100)))}</span>
                                                            }

                                                        </> :
                                                        <span className="new-price">$119</span>
                                                }


                                            </div>
                                        </div>
                                    </a>
                                </Link>



                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Search
